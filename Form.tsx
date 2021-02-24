import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Link from '@material-ui/core/Link';
import Checkbox from '@material-ui/core/Checkbox';
import CurrencyInput from './CurrencyInput';
import SeveranceDescription from './SeveranceDescription';
import SeveranceWhatIf from './SeveranceWhatIf';
import { dateToString, getDateAddYear } from './dateUtils';
import { calculateSeveranceData, SeveranceFormData, SeveranceData } from './severanceUtils';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
  container: {
    minWidth: 275,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  textField: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  checkboxContainer: {
    marginBottom: 8,
  },
  submitButton: {
    marginTop: theme.spacing(3),
  },
}));

function Form() {
  const classes = useStyles();
  const [severanceFormData, setSeveranceFormData] = useState<SeveranceFormData>({
    startWorkDate: getDateAddYear(-2),
    stopWorkDate: new Date(),
    salary: 0,
    specialReason: true,
  });
  const [severanceFormDataFinal, setSeveranceFormDataFinal] = useState<SeveranceFormData>(severanceFormData);
  const [severanceData, setSeveranceData] = useState<SeveranceData>(
    calculateSeveranceData(severanceFormData)
  );
  function handleStartWorkDateChange(e) {
    setSeveranceFormData({ ...severanceFormData, startWorkDate: new Date(e.target.value) });
  }
  function handleStopWorkDateChange(e) {
    setSeveranceFormData({ ...severanceFormData, stopWorkDate: new Date(e.target.value) });
  }
  function handleSpecialReasonChange(e) {
    setSeveranceFormData({ ...severanceFormData, specialReason: e.target.checked })
  }
  function handleSalaryChange(e) {
    setSeveranceFormData({ ...severanceFormData, salary: e.target.value });
  }
  function handleFormSubmit(e) {
    e.preventDefault();
    setSeveranceData(calculateSeveranceData(severanceFormData));
    setSeveranceFormDataFinal(severanceFormData);
  }
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <Card className={classes.container}>
          <CardContent className={classes.content}>
            <TextField
              id='startWorkingDate'
              label='Tanggal Bergabung'
              type='date'
              value={dateToString(severanceFormData.startWorkDate)}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleStartWorkDateChange}
            />
            <TextField
              id='stopWorkingDate'
              label='Tanggal Diberhentikan'
              type='date'
              value={dateToString(severanceFormData.stopWorkDate)}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleStopWorkDateChange}
            />
            <FormControl className={classes.checkboxContainer}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={severanceFormData.specialReason}
                    onChange={handleSpecialReasonChange}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    color='primary'
                  />
                }
                label="Alasan khusus"
              />
              <FormHelperText><Link href='/pesangon/special-case.html' target='blank'>apa itu alasan khusus?</Link></FormHelperText>
            </FormControl>
            <TextField
              label='Upah Bulanan'
              value={severanceFormData.salary.toString()}
              onChange={handleSalaryChange}
              name='baseSalary'
              id='baseSalary'
              className={classes.textField}
              InputProps={{
                inputComponent: CurrencyInput as any,
              }}
            />
          <Button onClick={handleFormSubmit} className={classes.submitButton}>Hitung Pesangon</Button>
          </CardContent>
        </Card>
      </form>
      <SeveranceDescription
        severanceData={severanceData}
        severanceFormData={severanceFormDataFinal}
      />
      { severanceData.effectiveLaw.name === 'UU No 11 Tahun 2020' && 
      <SeveranceWhatIf
        severanceData={severanceData}
        severanceFormData={severanceFormDataFinal}
      /> 
      }
    </>
  );
}

export default Form;
