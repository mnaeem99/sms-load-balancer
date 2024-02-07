import React, { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { makeStyles } from '@material-ui/core/styles';
import Header from "./layout/Header";
const useStyles = makeStyles((theme) => ({
  root: {
    color: '#fff !important',
    backgroundColor: '#ffffff',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  notFound: {
    color: '#ffa80c',
    fontFamily: 'Roboto, Helvetica',
    fontSize: '60px',
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: '79.2px',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    top: '50%',
    left: '20%',
  }
}));
function NotFound() {
  const [showLoader, setShowLoader] = useState(true);
  const classes = useStyles();
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {showLoader ? (
        <div className="loader">
          <LoadingSpinner/>
        </div>
      ) : (
        <div className={classes.root}>
            <Header isLanding={true}/>
            <div>
              <div className={classes.notFound}>
              404 | This page could not found.
              </div>
            </div>
      </div>
      )}
    </>
  );
}

export default NotFound;
