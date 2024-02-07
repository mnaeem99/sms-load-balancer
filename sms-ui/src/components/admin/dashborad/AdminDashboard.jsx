import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { NUMBER_REQUEST_URL } from '../../../apis/apiUrls';
import ViewSmsRequest from '../smsRequest/ViewSmsRequest';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '2%',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  mainContainer: {
    width: '90%',
    height: '130vh',
    marginLeft: 'auto',
    marginTop: '2%',
    marginRight: 'auto',
    [theme.breakpoints.down('xs')]: {
      marginTop: '20%',
    },
    background: '#F5F5F5'
  },
  boxOne: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '258px',
    background: 'rgba(14, 169, 0, 0.1)',
    boxShadow: '4px 0px 10px rgba(0, 0, 0, 0.2)',
  },
  boxFour: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '258px',
    background: 'rgba(0, 118, 227, 0.1)',
    boxShadow: '4px 0px 10px rgba(0, 0, 0, 0.2)',
  },

  boxTwo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '258px',
    background: 'rgba(237, 190, 23, 0.1)',
    boxShadow: '4px 0px 10px rgba(0, 0, 0, 0.2)',
  },
  boxThree: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '258px',
    background: 'rgba(255, 0, 0, 0.1)',
    boxShadow: '4px 0px 10px rgba(0, 0, 0, 0.2)',
  },

  boxOneCircle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '120px',
    height: '120px',
    background: 'rgba(14, 169, 0, 0.3)',
    border: '3px solid #0EA900',
    borderRadius: '50%',
    boxSizing: 'border-box',
  },
  boxFourCircle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '120px',
    height: '120px',
    background: 'rgba(0, 118, 227, 0.3)',
    border: '3px solid #0076E3',
    borderRadius: '50%',
    boxSizing: 'border-box',
  },
  boxTwoCircle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '120px',
    height: '120px',
    background: 'rgba(237, 190, 23, 0.1)',
    border: '3px solid #f9a825',
    borderRadius: '50%',
    boxSizing: 'border-box',
  },
  boxThreeCircle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '120px',
    height: '120px',
    background: 'rgba(255, 0, 0, 0.1)',
    border: '3px solid red',
    borderRadius: '50%',
    boxSizing: 'border-box',
  },
}));

function AdminDashboard() {
  const classes = useStyles();
  const [service1Count, setService1Count] = useState(0);
  const [service2Count, setService2Count] = useState(0);

  const getCount = () => {
    axios.get(`${NUMBER_REQUEST_URL}?appId=sms-service-1`).then((user) => {
      setService1Count(user?.data);
    });
    axios.get(`${NUMBER_REQUEST_URL}?appId=sms-service-2`).then((user) => {
      setService2Count(user?.data);
    });
  };
  useEffect(() => {
    getCount();
  }, []);

  return (
    <>
      <Helmet htmlAttributes>
        <title>Dashboard</title>
      </Helmet>
      <div className={classes.mainContainer}>
        <div style={{marginLeft: '3%'}}>
        <h1
          style={{
            fontFamily: "Roboto",
            fontSize: '34px',
            fontWeight: '700',
            lineHeight: '39.84px'
          }}
        >
          DASHBOARD
        </h1>
        <p
          style={{
            fontFamily: "Roboto",
            fontWeight: '400',
            fontSize: '24px',
            lineHeight: '33px',
          }}
        >
          Welcome to SMSWorkPlace
        </p>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item lg={3} md={3} xs={6}>
              <Link to="/view-sms-request">
                <Paper className={classes.boxOne}>
                  <h1 style={{ marginRight: 'auto', marginLeft: 'auto' }}>
                    App1 Requests
                  </h1>
                  <br />
                  <div className={classes.boxOneCircle}>
                    <h1
                      style={{
                        marginRight: 'auto',
                        marginLeft: 'auto',
                        fontSize: '26px',
                        fontWeight: 'bold',
                      }}
                    >
                      {service1Count}
                    </h1>
                  </div>
                </Paper>
              </Link>
            </Grid>
            <Grid item lg={3} md={3} xs={6}>
              <Link to="/view-sms-request">
                <Paper className={classes.boxThree}>
                  <h1 style={{ marginRight: 'auto', marginLeft: 'auto' }}>
                  App2 Requests
                  </h1>
                  <br />
                  <div className={classes.boxThreeCircle}>
                    <h1
                      style={{
                        marginRight: 'auto',
                        marginLeft: 'auto',
                        fontSize: '26px',
                        fontWeight: 'bold',
                      }}
                    >
                      {service2Count}
                    </h1>
                  </div>
                </Paper>{' '}
              </Link>
            </Grid>
          </Grid>
        </div>
        </div>
        <div
          style={{
            width: '100%%',
            borderRadius: '0px',
          }}
        >
          <ViewSmsRequest />
          <br />
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
