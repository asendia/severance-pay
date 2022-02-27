import React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const PREFIX = 'Skeleton';

const classes = {
  root: `${PREFIX}-root`,
  title: `${PREFIX}-title`,
  text: `${PREFIX}-text`,
  footer: `${PREFIX}-footer`,
  footerCredit: `${PREFIX}-footer-credit`,
};

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`&.${classes.root}`]: {
    paddingBottom: 20,
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
      width: '420px',
    },
  },

  [`& .${classes.title}`]: {
    width: '100%',
    paddingTop: 7,
    paddingBottom: 7,
    marginTop: 9,
    marginBottom: 14,
    boxSizing: 'content-box',
  },

  [`& .${classes.text}`]: {
    marginLeft: 14,
  },

  [`& .${classes.footer}`]: {
    margin: 14,
    textAlign: 'center',
  },
  [`& .${classes.footerCredit}`]: {
    marginTop: 10,
  }
}));

function Skeleton(props) {
  return (
    <StyledGrid
      className={classes.root}
      container
      direction='column'
      justifyContent='center'
      alignItems='center'
    >
      <Paper className={classes.title}>
        <Typography variant='h5' component='h1' className={classes.text}>
          Kalkulator Pesangon
        </Typography>
      </Paper>
      {props.children}
      <Typography variant='caption' component='p' className={classes.footer}>
        Aplikasi ini mungkin tidak akurat dan tidak diperuntukan sebagai anjuran
        hukum
        <div className={classes.footerCredit}>
          2021 - warisin -{' '}
          <Link href='https://github.com/asendia/severance-pay'>
            source code
          </Link>
        </div>
      </Typography>
    </StyledGrid>
  );
}

export default Skeleton;
