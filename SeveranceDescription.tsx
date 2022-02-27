import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  SeveranceData,
  SeveranceFormData,
  WORK_WEEKS_IN_A_YEAR,
  getWorkingDurationMilis,
  WORK_MILIS_IN_A_YEAR,
} from './severanceUtils';
const PREFIX = 'SeveranceDescription';

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

export type SeveranceDescriptionProps = {
  severanceData: SeveranceData;
  severanceFormData: SeveranceFormData;
};

function SeveranceDescription(props: SeveranceDescriptionProps) {
  const { salary } = props.severanceFormData;
  const baseMultiplier =
    props.severanceData.baseMultiplier *
    (props.severanceFormData.specialReason
      ? props.severanceData.effectiveLaw.specialMultiplier
      : 1);
  const severanceMultiplier =
    baseMultiplier + props.severanceData.rewardMultiplier;
  const severance = severanceMultiplier * salary;
  const workDurationYear = (
    getWorkingDurationMilis(props.severanceFormData) / WORK_MILIS_IN_A_YEAR
  ).toLocaleString('id-ID', { maximumFractionDigits: 1 });
  return (
    <StyledCard className={classes.container}>
      <CardContent>
        <Typography
          className={classes.title}
          color='textSecondary'
          gutterBottom
        >
          Berdasarkan
        </Typography>
        <Typography variant='h5' color='textSecondary'>
          {props.severanceData.effectiveLaw.name}
        </Typography>
        <Typography
          className={classes.title}
          color='textSecondary'
          gutterBottom
        >
          Perkiraan pesangon anda sebesar
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
          Dengan asumsi 1 tahun kerja adalah {WORK_WEEKS_IN_A_YEAR} minggu, anda
          telah bekerja selama
        </Typography>
        <Typography variant='h6' color='textSecondary'>
          {workDurationYear} tahun
        </Typography>
        <Typography
          variant='body2'
          component='p'
          className={classes.workDurationDesc}
        >
          Sehingga berhak mendapatkan uang pesangon sebesar
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
          {props.severanceData.rewardMultiplier + 'x upah bulanan'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size='small'
          target='_blank'
          href='https://www.hukumonline.com/klinik/detail/ulasan/lt515b7ec90fe0c/cara-menghitung-pesangon-berdasarkan-alasan-phk/'
        >
          Pelajari
        </Button>
      </CardActions>
    </StyledCard>
  );
}

export default SeveranceDescription;
