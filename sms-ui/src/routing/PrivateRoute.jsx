import React from "react";
import { Navigate } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRoute = ({component: Component,auth: { isAuthenticated, loading},children,...rest }) => {

			const auth = isAuthenticated;
			return auth ? children : <Navigate to="/login" />;	
  }

PrivateRoute.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);