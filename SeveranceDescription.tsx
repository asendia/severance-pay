import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { SeveranceMultiplier, SeveranceFormData, WORK_WEEKS_IN_A_YEAR,
  getWorkingDurationMilis, WORK_MILIS_IN_A_YEAR } from './severanceUtils';
import { makeStyles } from '@material-ui/core/styles';

type SeveranceDescriptionProps = {
  severanceMultiplier: SeveranceMultiplier;
  severanceFormData: SeveranceFormData;
}

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 14,
    minWidth: 275,
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

function SeveranceDescription(props: SeveranceDescriptionProps) {
  const classes = useStyles();
  const { salary } = props.severanceFormData;
  const severanceMultiplier = props.severanceMultiplier.baseMultiplier + props.severanceMultiplier.rewardMultiplier;
  const severance = severanceMultiplier * salary;
  const workDurationYear = (getWorkingDurationMilis(props.severanceFormData) / WORK_MILIS_IN_A_YEAR).toLocaleString('id-ID', { maximumFractionDigits: 1 });
  return (
    <Card
      className={classes.container}
    >
      <CardContent>
        <Typography className={classes.title} color='textSecondary' gutterBottom>
          Perkiraan pesangon anda sebesar
        </Typography>
        { salary > 0 && (
          <>
            <Typography variant='h5' component='h2'>
              {salary > 0 ? 'Rp ' + severance.toLocaleString() : ''}
            </Typography>
            <Typography variant='h5'color='textSecondary'>
              atau
            </Typography>
          </>
        )}
        <Typography variant='h5'>
          {severanceMultiplier + 'x gaji pokok'}
        </Typography>
        <Typography variant='body2' component='p' className={classes.workDurationDesc}>
          Dengan asumsi 1 tahun kerja
          <br />
          adalah {WORK_WEEKS_IN_A_YEAR} minggu,
          <br />
          anda telah bekerja selama
        </Typography>
        <Typography variant='h5'>
          {workDurationYear} tahun
        </Typography>
        <Typography variant='body2' component='p' className={classes.workDurationDesc}>
          Sehingga berhak mendapatkan
          <br />
          uang pesangon sebesar
        </Typography>
        <Typography variant='h5'>
          {props.severanceMultiplier.baseMultiplier + 'x gaji pokok'}
        </Typography>
        <Typography variant='body2' component='p' className={classes.workDurationDesc}>
          Dan uang penghargaan
          <br />
          masa kerja sebesar
        </Typography>
        <Typography variant='h5'>
          {props.severanceMultiplier.rewardMultiplier + 'x gaji pokok'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small' target='_blank' href='https://www.hukumonline.com/klinik/detail/ulasan/lt515b7ec90fe0c/cara-menghitung-pesangon-berdasarkan-alasan-phk/'>Pelajari</Button>
      </CardActions>
    </Card>
  );
}

export default SeveranceDescription;
