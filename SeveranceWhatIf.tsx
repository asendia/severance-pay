import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  calculateSeveranceData,
  WORK_WEEKS_IN_A_YEAR,
  getWorkingDurationMilis,
  WORK_MILIS_IN_A_YEAR,
  SeveranceFormData,
  SeveranceData,
} from './severanceUtils';
import { SeveranceDescriptionProps } from './SeveranceDescription';
const PREFIX = 'SeveranceWhatIf';

const classes = {
  container: `${PREFIX}-container`,
  title: `${PREFIX}-title`,
  paper: `${PREFIX}-paper`,
  workDurationDesc: `${PREFIX}-workDurationDesc`,
};

const StyledCard = styled(Card)(() => ({
  [`&.${classes.container}`]: {
    marginTop: 14,
    width: '100%',
  },

  [`& .${classes.title}`]: {
    fontSize: 14,
  },

  [`& .${classes.paper}`]: {
    padding: 5,
    margin: 7,
  },

  [`& .${classes.workDurationDesc}`]: {
    marginTop: 12,
  },
}));

function SeveranceWhatIf(props: SeveranceDescriptionProps) {
  const stopWorkDate = new Date('2021-02-01');
  const severanceFormData: SeveranceFormData = {
    ...props.severanceFormData,
    stopWorkDate,
  };
  const severanceData: SeveranceData =
    calculateSeveranceData(severanceFormData);
  const { salary } = severanceFormData;
  const baseMultiplier =
    severanceData.baseMultiplier *
    (severanceFormData.specialReason
      ? severanceData.effectiveLaw.specialMultiplier
      : 1);
  const severanceMultiplier = baseMultiplier + severanceData.rewardMultiplier;
  const severance = severanceMultiplier * salary;
  const workDurationYear = (
    getWorkingDurationMilis(severanceFormData) / WORK_MILIS_IN_A_YEAR
  ).toLocaleString('id-ID', { maximumFractionDigits: 1 });
  return (
    severanceMultiplier < 0 ?
    <></> :
    <StyledCard className={classes.container}>
      <CardContent>
        <Typography variant='h3'>Kalau</Typography>
        <Typography
          className={classes.title}
          color='textSecondary'
          gutterBottom
        >
          anda diberhentikan tanggal 1 Februari 2021 (sebelum ciptaker) pesangon
          anda bisa berjumlah
        </Typography>
        {salary > 0 && (
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
        <Typography
          variant='body2'
          component='p'
          className={classes.workDurationDesc}
        >
          Dengan rincian uang pesangon sebesar
        </Typography>
        <Typography variant='h6' color='textSecondary'>
          {baseMultiplier + 'x upah bulanan'}
        </Typography>
        <Typography
          variant='body2'
          component='p'
          className={classes.workDurationDesc}
        >
          Dan uang penghargaan masa kerja sebesar
        </Typography>
        <Typography variant='h6' color='textSecondary'>
          {severanceData.rewardMultiplier + 'x upah bulanan'}
        </Typography>
      </CardContent>
    </StyledCard>
  );
}

export default SeveranceWhatIf;
