import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  title: {
    minWidth: 275,
    paddingTop: 7,
    paddingBottom: 7,
    marginTop: 9,
    marginBottom: 14,
    boxSizing: 'content-box',
  },
  text: {
    marginLeft: 14,
  },
}));

function Skeleton(props) {
  const classes = useStyles();
  return (
    <>
      <Grid
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
      </Grid>
    </>
  )
}

export default Skeleton;
