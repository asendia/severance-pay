import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Link from '@mui/material/Link';
import Checkbox from '@mui/material/Checkbox';
import CurrencyInput from './CurrencyInput';
import SeveranceDescription from './SeveranceDescription';
import SeveranceWhatIf from './SeveranceWhatIf';
import {
  dateToString,
  stringToDate,
  isValidDate,
  getDateAddYear,
} from './dateUtils';
import {
  calculateSeveranceData,
  SeveranceFormData,
  SeveranceData,
} from './severanceUtils';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const PREFIX = 'Form';

const classes = {
  form: `${PREFIX}-form`,
  content: `${PREFIX}-content`,
  textField: `${PREFIX}-textField`,
  checkboxContainer: `${PREFIX}-checkboxContainer`,
  submitButton: `${PREFIX}-submitButton`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(() => ({
  'input::-webkit-date-and-time-value': {
    textAlign: 'left',
  },
  [`& .${classes.form}`]: {
    width: '100%',
  },

  [`& .${classes.content}`]: {
    display: 'flex',
    flexDirection: 'column',
  },

  [`& .${classes.textField}`]: {
    marginTop: '8px',
    marginBottom: '8px',
  },

  [`& .${classes.checkboxContainer}`]: {
    marginBottom: 8,
  },

  [`& .${classes.submitButton}`]: {
    marginTop: '20px',
  },
}));

function Form() {
  const [severanceFormData, setSeveranceFormData] = useState<SeveranceFormData>(
    {
      startWorkDate: getDateAddYear(-2),
      stopWorkDate: new Date(),
      salary: 0,
      specialReason: true,
    }
  );
  const [startWorkDate, setStartWorkDate] = useState(
    dateToString(severanceFormData.startWorkDate)
  );
  const [stopWorkDate, setStopWorkDate] = useState(
    dateToString(severanceFormData.stopWorkDate)
  );
  const [specialReason, setSpecialReason] = useState(
    severanceFormData.specialReason
  );
  const [salary, setSalary] = useState(severanceFormData.salary);
  const [severanceData, setSeveranceData] = useState<SeveranceData>(
    calculateSeveranceData(severanceFormData)
  );
  function handleStartWorkDateChange(e) {
    setStartWorkDate(e.target.value);
  }
  function handleStopWorkDateChange(e) {
    setStopWorkDate(e.target.value);
  }
  function handleSpecialReasonChange(e) {
    setSpecialReason(e.target.checked);
  }
  function handleSalaryChange(e) {
    setSalary(e.target.value);
  }
  function handleFormSubmit(e) {
    e.preventDefault();
    const start = stringToDate(startWorkDate);
    const stop = stringToDate(stopWorkDate);
    if (isValidDate(start) && isValidDate(stop)) {
      const formData = {
        startWorkDate: start,
        stopWorkDate: stop,
        specialReason,
        salary,
      };
      setSeveranceFormData(formData);
      setSeveranceData(calculateSeveranceData(formData));
    }
  }
  const isValidStartWorkDate = isValidDate(stringToDate(startWorkDate));
  const isValidStopWorkDate = isValidDate(stringToDate(stopWorkDate));
  return (
    <Root>
      <form onSubmit={handleFormSubmit} className={classes.form}>
        <Card>
          <CardContent className={classes.content}>
            <TextField
              id='startWorkingDate'
              label='Tanggal Bergabung'
              type='date'
              variant='standard'
              value={startWorkDate}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              error={!isValidStartWorkDate}
              helperText={!isValidStartWorkDate && 'Format tanggal tidak valid'}
              onChange={handleStartWorkDateChange}
            />
            <TextField
              id='stopWorkingDate'
              label='Tanggal Diberhentikan'
              type='date'
              variant='standard'
              value={stopWorkDate}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              error={!isValidStopWorkDate}
              helperText={!isValidStopWorkDate && 'Format tanggal tidak valid'}
              onChange={handleStopWorkDateChange}
            />
            <FormControl className={classes.checkboxContainer}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={specialReason}
                    onChange={handleSpecialReasonChange}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    color='primary'
                  />
                }
                label='Alasan khusus'
              />
              <FormHelperText style={{ marginTop: '-7px', marginLeft: '0' }}>
                <Link href='/pesangon/special-case.html' target='blank'>
                  Apa itu alasan khusus?
                </Link>
              </FormHelperText>
            </FormControl>
            <TextField
              label='Upah Bulanan'
              InputLabelProps={{ shrink: true }}
              value={salary.toString()}
              onChange={handleSalaryChange}
              name='baseSalary'
              id='baseSalary'
              variant='standard'
              className={classes.textField}
              InputProps={{
                inputComponent: CurrencyInput as any,
              }}
            />
            <Button
              onClick={handleFormSubmit}
              className={classes.submitButton}
              variant={'outlined'}
              color={'primary'}
            >
              Hitung Pesangon
            </Button>
          </CardContent>
        </Card>
      </form>
      <SeveranceDescription
        severanceData={severanceData}
        severanceFormData={severanceFormData}
      />
      {severanceData.effectiveLaw.name === 'UU No 11 Tahun 2020' && (
        <SeveranceWhatIf
          severanceData={severanceData}
          severanceFormData={severanceFormData}
        />
      )}
    </Root>
  );
}

export default Form;
