import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/authAction/auth";

const Navbar = ({ auth: { isAuthenticated, loading ,user}, logout }) => {
	const authLinks = (
        <>
		<ul className="nav-links">
			<li>
				<Link to="/dashboard">
					<i className="fas fa-user"></i>{" "}
					<span className="hide-sm">Dashboard</span>
				</Link>
			</li>
			{
				user?.role == 'admin' &&
			<>	
			<li>
				<Link to="/admin">
					<i className="fas fa-user"></i>
					<span className="hide-sm">Admin</span>
				</Link>
			</li>
			<li>
				<Link to="/register">Add User</Link>
			</li>
			</>
			}
			<li>
				<Link onClick={logout} to="/" replace>
					<i className="fas fa-sign-out-alt"></i>{" "}
					<span className="hide-sm"> &nbsp;Logout</span>
				</Link>
			</li>
			
		</ul>
        </>
	);
	const guestLinks = (
        <>		<ul className="nav-links">
		
			<li>
				<Link to="/login">Login</Link>
			</li>
		</ul>
        </>

	);

	return (
        <>
		<nav className="navbar bg-dark">
			<h1>
				<Link to="/">HOME</Link>
			</h1>
			{!loading && (
				<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
			)}
		</nav>
        </>
	);
};

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);