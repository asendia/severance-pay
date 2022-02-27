import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { calculateSeveranceData, WORK_WEEKS_IN_A_YEAR, getWorkingDurationMilis, WORK_MILIS_IN_A_YEAR, SeveranceFormData, SeveranceData } from './severanceUtils';
import { SeveranceDescriptionProps } from './SeveranceDescription';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 14,
    width: '100%',
  },
  title: {
    fontSize: 14,
  },
  paper: {
    padding: 5,
    margin: 7,
  },
  workDurationDesc: {
    marginTop: 12,
  },
}));

function SeveranceWhatIf(props: SeveranceDescriptionProps) {
  const classes = useStyles();
  const stopWorkDate = new Date('2021-02-01');
  const severanceFormData: SeveranceFormData = {
    ...props.severanceFormData,
    stopWorkDate,
  };
  const severanceData: SeveranceData = calculateSeveranceData(severanceFormData);
  const { salary } = severanceFormData;
  const baseMultiplier = severanceData.baseMultiplier * (severanceFormData.specialReason ? severanceData.effectiveLaw.specialMultiplier : 1);
  const severanceMultiplier = baseMultiplier + severanceData.rewardMultiplier;
  const severance = severanceMultiplier * salary;
  const workDurationYear = (getWorkingDurationMilis(severanceFormData) / WORK_MILIS_IN_A_YEAR).toLocaleString('id-ID', { maximumFractionDigits: 1 });
  return (
    <Card
      className={classes.container}
    >
      <CardContent>
        <Typography variant='h3'>
          Kalau
        </Typography>
        <Typography className={classes.title} color='textSecondary' gutterBottom>
          anda diberhentikan tanggal
          1 Februari 2021 (sebelum ciptaker)
          pesangon anda bisa berjumlah
        </Typography>
        { salary > 0 && (
          <>
            <Typography variant='h5' component='h2'>
              {salary > 0 ? 'Rp ' + severance.toLocaleString() : ''}
            </Typography>
            <Typography variant='h5' color='textSecondary'>
              atau
            </Typography>
          </>
        )}
        <Typography variant='h5'>
          {severanceMultiplier + 'x upah bulanan'}
        </Typography>
        <Typography variant='body2' component='p' className={classes.workDurationDesc}>
          Dengan rincian
          uang pesangon sebesar
        </Typography>
        <Typography variant='h6' color='textSecondary'>
          {baseMultiplier + 'x upah bulanan'}
        </Typography>
        <Typography variant='body2' component='p' className={classes.workDurationDesc}>
          Dan uang penghargaan
          masa kerja sebesar
        </Typography>
        <Typography variant='h6' color='textSecondary'>
          {severanceData.rewardMultiplier + 'x upah bulanan'}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default SeveranceWhatIf;

  
