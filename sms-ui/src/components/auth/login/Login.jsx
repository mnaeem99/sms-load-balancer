import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadUser, login } from '../../../actions/authAction/auth';
import Alert from '../../layout/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import * as Yup from 'yup';
import './Login.css';
import { Helmet } from 'react-helmet';
import store from '../../../store';
import Header from '../../layout/Header';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import LoadingSpinner from '../../LoadingSpinner';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
    color: '#fff !important',
    alignItems: 'left',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  paper: {
    display: 'flex',
    position: 'fix',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '500px',
    height: '450px',
    [theme.breakpoints.down('md')]: {
      width: '370px',
      height: '400px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '300px',
      height: '400px',
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '50px',
    },
    /* white */

    background: '#FFFFFF',
    /* drop shadow */

    boxShadow: '4px 0px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '20px',
  },
  centerUpperGrid: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  smMain: {
    [theme.breakpoints.down('xs')]: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '50px',
    },
  },
  btn: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '60px',
    cursor: 'pointer',
    border: 'none',
    color: '#fff !important',
    background: '#FFA80C',
    '&:hover': {
      //you want this to be the same as the backgroundColor above
      backgroundColor: '#0EA900',
    },
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '10px',
  },
}));

const Login = ({ login, isAuthenticated, role, verified }) => {
  const classes = useStyles();
  const alert = useSelector((state) => state.alert);
  let navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false)
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values) => {
      setShowLoader(true)
      setTimeout(() => setShowLoader(false), 1000)
      login(values.username, values.password);
    },
  });
  useEffect(() => {
    store.dispatch(loadUser());
  }, [role]);
  // Redirect if logged in

  if (isAuthenticated) {
    navigate(`/dashboard`)
  }

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className={classes.root}>
      {showLoader === true ? <LoadingSpinner></LoadingSpinner> :
        <div className='landing-background'>
      <Header />

        <Grid container>
          <Grid item xs={12} lg={6} md={6} sm={6}>
            <Grid
            container
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '8%',
              marginRight: 'auto',
              marginTop: '30%',
            }}
            >
              <div>
                <p className="paragraph-Style" style={{
                  color: '#ffffff', 
                  fontFamily: "Roboto",
                  fontSize: '60px',
                  fontWeight: '500',
                  letterSpacing: 0,
                  lineHeight: 'normal'}}>
                    Welcome To
                </p>

                <p className="paragraph-Style" style={{ 
                  color: '#ffa80c',
                  fontFamily: "Roboto",
                  fontSize: '80px',
                  fontWeight: '700',
                  letterSpacing: 0,
                  lineHeight: 'normal'}}>
                  SMSWorkPlace
                </p>
                <br />
                <p className="paragraph-Style" style={{ 
                  color: '#ffffff', 
                  fontFamily: "Roboto",
                  fontSize: '40px',
                  fontWeight: '300',
                  letterSpacing: 0,
                  lineHeight: 'normal'}}>Login To Access Your Account</p>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={6} md={6} sm={6}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '10%',
            }}
            >
              <Grid>
                <Paper className={classes.paper}>
                  <form
                    noValidate
                    autoComplete="off"
                    onSubmit={formik.handleSubmit}
                  >
                    <div style={{
                      background: '#FFFFFF',
                      boxShadow: '-1px 0px 20px 1px rgba(0, 0, 0, 0.1)',
                      borderRadius: '20px',
                      // width: '100%'
                    }}>
                  <Grid
                    container
                    style={{ marginLeft: 'auto', marginRight: 'auto' }}
                    xs={12}
                    spacing={3}
                  >
                    <Grid item xs={12}>
                      <div className="user-circle-regular-wrapper">
                        <div style={{background: '#ffffff', borderRadius: '44px'}} >
                         <img alt="Login" src="/loginicon.png" style={{width: '100%',  height: '100%', padding: '10px'}} />
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <h3 className='title' style={{display: 'flex', justifyContent: 'center'}}>Login</h3>
                    </Grid>
                    <Grid item lg={12} xs={12} md={12}>
                      <label htmlFor="">Email</label>
                      <input
                        style={{ padding: '20px 20px' }}
                        type="text"
                        placeholder="Enter email"
                        name="username"
                        className={
                          formik.touched.username && formik.errors.username
                          ? 'inputstyleTwo'
                          : 'inputstyle'
                        }
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        required
                      />
                      {formik.touched.username && formik.errors.username ? (
                        <div style={{ color: 'red' }}>
                          {formik.errors.username}
                        </div>
                      ) : null}
                      </Grid>
                      <Grid item lg={12} xs={12} md={12}>
                      <label htmlFor="">Password</label>
                      <input
                        style={{ padding: '10px' }}
                        type="password"
                        placeholder="Enter password"
                        name="password"
                        minLength="6"
                        className={
                          formik.touched.password && formik.errors.password
                          ? 'inputstyleTwo'
                          : 'inputstyle'
    
                        }
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        required
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <div style={{ color: 'red' }}>
                          {formik.errors.password}
                        </div>
                      ) : null}
                    </Grid>
                    <Alert />
                    <Grid item lg={12} xs={12} md={12}>
                    <div
                      style={{
                        width: '100%',
                      }}
                    >
                      <FormControlLabel
                    required
                    control={<Checkbox />}
                    label="Remember me"
                  />
                    </div>
                    </Grid>
                    <Grid item lg={12} xs={12} md={12}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Button
                        className={classes.btn}
                        type="submit"
                        disabled={alert.length > 0 ? true : false}
                      >
                        Login
                      </Button>
                    </div>
                    </Grid>
                    {/* <Grid item lg={12} xs={12} md={12}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Button
                        onClick={() => navigate('/request-code')}
                        style={{ justifyContent: 'flex-start' }}
                      >
                        Forget Password?
                      </Button>
                    </div>
                    </Grid> */}
                    </Grid>
                    </div>
                  </form>{' '}
                </Paper>
              </Grid>
          </Grid>
        </Grid> 
        </div>
      }
      </div>
    </>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  role: state.auth.role,
  verified: state.auth.verified,
});

export default connect(mapStateToProps, { login })(Login);
