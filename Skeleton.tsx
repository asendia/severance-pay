import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: 20,
    width: 420,
    margin: 'auto',
    [theme.breakpoints.down(450)]: {
      width: '100%',
    },
  },
  title: {
    width: '100%',
    paddingTop: 7,
    paddingBottom: 7,
    marginTop: 9,
    marginBottom: 14,
    boxSizing: 'content-box',
  },
  text: {
    marginLeft: 14,
  },
  footer: {
    margin: 14,
    textAlign: 'center',
  },
}));

function Skeleton(props) {
  const classes = useStyles();
  return (
    <>
      <Grid
        className={classes.root}
        container
        direction='column'
        justify='center'
        alignItems='center'
      >
        <Paper className={classes.title}>
          <Typography variant='h5' component='h1' className={classes.text}>
            Kalkulator Pesangon
          </Typography>
        </Paper>
        {props.children}
        <Typography variant='caption' component='p' className={classes.footer}>
          Aplikasi ini mungkin tidak akurat dan tidak diperuntukan sebagai anjuran hukum<br />
          2021 - warisin - <Link href='https://github.com/asendia/severance-pay'>source code</Link>
        </Typography>
      </Grid>
    </>
  )
}

export default Skeleton;
