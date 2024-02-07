/* eslint-disable eqeqeq */
import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/login/Login";
import PrivateRoute from "./routing/PrivateRoute";
import NotFound from "./components/NotFound";
import setAuthToken from "./utils/setAuthToken";
import store from "./store";
import { loadUser } from "./actions/./authAction/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DrawerBar from "./components/sidebar/Drawer";
import { createTheme, ThemeProvider } from '@material-ui/core'
import AdminDashboard from "./components/admin/dashborad/AdminDashboard";
import AddSmsRequest from "./components/admin/smsRequest/AddSmsRequest";
import ViewSmsRequest from "./components/admin/smsRequest/ViewSmsRequest";
import MessageChart from "./components/admin/smsRequest/MessageChart";

const theme = createTheme({
  palette: {
    primary: {
      main: '#fefefe'
    },
  },
  typography: {
    fontFamily: 'Roboto',
    button: {
      textTransform: 'none'
    }
  }

})

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App({ auth: { user } }) {



  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <div>
          <Router>
            <>
              <Routes>
                <Route exact path="/" element={<Landing />} />
                <Route exact path="/dashboard" element={<PrivateRoute><DrawerBar><AdminDashboard /></DrawerBar></PrivateRoute>} />
                <Route exact path="/add-sms-request" element={<PrivateRoute><DrawerBar><AddSmsRequest /></DrawerBar></PrivateRoute>} />
                <Route exact path="/view-sms-request" element={<PrivateRoute><DrawerBar><ViewSmsRequest /></DrawerBar></PrivateRoute>} />
                <Route exact path="/monitor-request" element={<PrivateRoute><DrawerBar><MessageChart /></DrawerBar></PrivateRoute>} />
                <Route exact path="/login" element={<Login />} />
                <Route path='*' exact={true} element={<NotFound />} />
              </Routes>
            </>
          </Router>
        </div>
      </ThemeProvider>
    </>
  );
}
App.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(App);