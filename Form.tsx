import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CurrencyInput from './CurrencyInput';
import SeveranceDescription from './SeveranceDescription';
import { dateToString, getDateAddYear } from './dateUtils';
import { calculateSeveranceMultiplier, SeveranceFormData, SeveranceMultiplier } from './severanceUtils';
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
  });
  const [severanceMultiplier, setSeveranceMultiplier] = useState<SeveranceMultiplier>({
    baseMultiplier: 0,
    rewardMultiplier: 0,
  });
  function handleStartWorkDateChange(e) {
    setSeveranceFormData({ ...severanceFormData, startWorkDate: new Date(e.target.value) });
  }
  function handleStopWorkDateChange(e) {
    setSeveranceFormData({ ...severanceFormData, stopWorkDate: new Date(e.target.value) });
  }
  function handleSalaryChange(e) {
    setSeveranceFormData({ ...severanceFormData, salary: e.target.value });
  }
  function handleFormSubmit(e) {
    e.preventDefault();
    setSeveranceMultiplier(calculateSeveranceMultiplier(severanceFormData));
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
        severanceMultiplier={severanceMultiplier}
        severanceFormData={severanceFormData}
      />
    </>
  );
}

export default Form;
