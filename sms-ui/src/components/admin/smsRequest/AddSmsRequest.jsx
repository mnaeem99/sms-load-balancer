import React, { useState } from 'react';
import Alert from '../../layout/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import store from '../../../store';
import { remove } from '../../../actions/alert';
import { Helmet } from 'react-helmet';
import LoadingSpinner from '../../LoadingSpinner';
import { addSmsRequest } from '../../../actions/smsAction';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '90%',
    height: '100%',
    marginLeft: 'auto',
    marginTop: '2%',
    marginRight: 'auto',
    background: '#F5F5F5',
    [theme.breakpoints.down('xs')]: {
      marginTop: '20%',
    },
  },
  btn: {
    background: '#0EA900',
    '&:hover': {
      backgroundColor: '#0EA900',
    },
  },
}));

const AddSmsRequest = ({ alerts }) => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);
  const classes = useStyles();
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);
  const formik = useFormik({
    initialValues: {
      message: '',
      phone: '',
    },
    validationSchema: Yup.object({
      phone: Yup.string().required('Phone number is required'),
      message: Yup.string().required('Message is required'),
    }),
    onSubmit: (values) => {
      setShowLoader(true)
      setTimeout(() => setShowLoader(false), 1000)
      let phone = values.phone;
      let message = values.message;
      dispatch(addSmsRequest({ phone, message }));
    },
  });
  if (alert[0]?.msg === 'successfully created') {
    store.dispatch(remove(alert[0]?.msg, alert[0]?.alertType, alert[0]?.id));
    navigate('/view-sms-request');
  }

  return (
    <>
      <Helmet>
        <title>Add SMS Request</title>
      </Helmet>
      <div className={classes.mainContainer}>
        <div
          style={{
            background: '#FFFFFF',
            boxShadow: '-1px 0px 20px 1px rgba(0, 0, 0, 0.1)',
            borderRadius: '20px',
            width: '100%',
            marginTop: '0.5%',
            padding: '15px',
          }}
        >   
          <form onSubmit={formik.handleSubmit}>
          <Grid
            container
            xs={12}
            lg={6}
            spacing={3}
            style={{ marginLeft: '5%', marginTop: '2%', marginRight: 'auto' }}
          >
            <h3 className="title">Add SMS Request</h3>
          </Grid>
        
          <Grid
            container
            xs={12}
            spacing={3}
          >
            <Grid
                    container
                    spacing={3}
                    style={{ marginLeft: '5%', marginTop: '2%', marginRight: 'auto' }}
                  >
              <Grid item lg={12} xs={12} md={12} >
                <label htmlFor="">Phone number</label>
                <input
                  type="text"
                  placeholder="+912345,092345..."
                  name="phone"
                  className={
                    formik.touched.phone && formik.errors.phone
                      ? 'inputstyleTwo'
                      : 'inputstyle'
                  }
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                />
              {formik.touched.phone && formik.errors.phone ? (
                <div style={{ color: 'red' }}>{formik.errors.phone}</div>
              ) : null}               
              </Grid>
              <Grid item lg={12} xs={12} md={12} >
              <div>
                <label htmlFor="">Message Description</label>
                <textarea
                  id="standard-basic"
                  placeholder="Enter a message"
                  label="Standard"
                  name="message"
                  className={
                    formik.touched.message &&
                    formik.errors.message
                      ? 'inputstyleTwo'
                      : 'inputstyle'
                  }
                  onChange={formik.handleChange}
                  value={formik.values.message}
                  fullWidth
                  style={{height: '100px'}}
                />
              </div>
              {formik.touched.message &&
              formik.errors.message ? (
                <div style={{ color: 'red' }}>
                  {formik.errors.message}
                </div>
              ) : null}
              </Grid>
            </Grid>
              <Alert />

              <Grid
                    item
                    lg={12}
                    md={12}
                    xs={12}
                    sm={12}
                    style={{ display: 'flex', justifyContent: 'flex-end' }}
                  >
                    <Button
                      variant="contained"
                      className={classes.btn}
                      color="secondary"
                      type="submit"
                      disabled={alert.length > 0 ? true : false}
                    >
                      {showLoader === true ? <LoadingSpinner></LoadingSpinner> : 'Submit'}                      
                    </Button>
              
                  </Grid>

          </Grid>              
          </form>
          <br />
        </div>
      </div>
    </>
  );
};

AddSmsRequest.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  AddSmsRequest: state.alert,
});

export default connect(mapStateToProps)(AddSmsRequest);
