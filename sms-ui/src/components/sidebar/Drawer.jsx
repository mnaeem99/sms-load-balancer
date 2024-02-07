import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { logout } from "../../actions/authAction/auth";
import { connect } from "react-redux";
import { loadUser } from "../../actions/authAction/auth";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate, useLocation } from "react-router-dom";
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import { TimelineOutlined } from "@mui/icons-material";

import store from "../../store";
import "./Drawer.css";

const drawerWidth = 420;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    background: "#F5F5F5",
  },
  page: {
    background: "#F5F5F5",
    width: "100%",
    height: "100%",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    [theme.breakpoints.down("xs")]: {
      display: "block",
      marginBottom: "50px",
      background: "#490F4C",
      opacity: "80%",
    },
  },
  active: {
    background: "rgba(255, 231, 234, 0.2) !important",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: "52px",
    width: "80%",
    "&:hover": {
      backgroundColor: "rgba(255, 231, 234, 0.2)  !important", // Change this to the desired hover color
    },
    marginBottom: "10px",
    marginTop: "10px",
  },
  active2: {
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: "52px",
    width: "80%",
    "&:hover": {
      backgroundColor: "rgba(255, 231, 234, 0.2)  !important", // Change this to the desired hover color
    },
    // marginBottom: '10px'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "#fff",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
    background:
      "linear-gradient(115.53deg, #39103C 1.96%, #A307AB 103.09%) !important",
    color: "#fff !important",
  },
  listItemText: {
    fontFamily: "Roboto",
    fontSize: "24px",
    fontWeight: "400",
    letterSpacing: "10%",
    lineHeight: "28.13px",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
const dashboard = [
  {
    text: "Dashboard",
    icon: <img src="/dashboard.png" alt="" width="24px" height="24px" />,
    path: "/dashboard",
  },
];
const analytics = [
  {
    text: "Request Monitoring",
    path: "/monitor-request",
  },
];
const requestManagement = [
  {
    text: "Add Sms Request",
    path: "/add-sms-request",
  },
  {
    text: "Manage Sms Request",
    path: "/view-sms-request",
  },
];

function DrawerBar({ children, window, logout, auth: { user } }) {
  const classes = useStyles();
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [check, setCheck] = useState(false);
  const [requestCheck, setRequestCheck] = useState(false);
  const [analyticsCheck, setAnalyticsCheck] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  useEffect(() => {
    switch (location.pathname) {
      case "/dashboard":
        return (
          setCheck(true),
          setRequestCheck(false)
        );
      case "/add-sms-request":
        return (
          setCheck(false),
          setRequestCheck(true)
        );
      case "/view-sms-request":
        return (
          setCheck(false),
          setRequestCheck(true)
        );
      case "/monitor-request":
        return (
          setCheck(false),
          setAnalyticsCheck(true),
          setRequestCheck(false)
        );
      default:
        return location.pathname;
    }
  }, [location.pathname]);

  const drawer = (
    <div>
      <div className={classes.toolbar} />

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 0,
        }}
      >
        <img
          src="/logo.svg"
          alt=""
          style={{ width: "100px", height: "50px", marginBottom: "10%" }}
        />
      </div>
      <br />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 0,
          fontFamily: "Roboto",
          fontSize: "30px",
          fontWeight: "400",
          letterSpacing: "10%",
          lineHeight: "35.16px",
          marginBottom: "3%",
        }}
      >
        {user?.firstName} {user?.lastName}
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Roboto",
          fontSize: "18px",
          fontWeight: "400",
          letterSpacing: "10%",
          lineHeight: "21.09px",
          marginBottom: "3%",
        }}
      >
        {user?.email}
      </div>
      <div
        style={{
          border: "0.7px solid #FFFFFF",
          width: "100%",
          height: "0px",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "5%",
        }}
      ></div>
      <Divider />
      <List>
            {dashboard.map((item) => (
              <>
                <ListItem
                  button
                  key={item.text}
                  onClick={() => {
                    navigate(item.path);
                    setCheck(true);
                    setRequestCheck(false);
                  }}
                  className={
                    location.pathname === item.path
                      ? classes.active
                      : classes.active2
                  }
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    className={classes.listItemText}
                  />
                </ListItem>
              </>
            ))}
          <>
            <ListItem
              button
              onClick={() => setRequestCheck((prevCheck) => !prevCheck)}
              className={classes.active2}
            >
              <ListItemIcon>
                <MessageOutlinedIcon style={{ color: "#ffffff" }} />
              </ListItemIcon>
              <ListItemText className={classes.listItemText} primary="Sms Request" />
              {check ? (
                <ArrowDropDownIcon />
              ) : (
                <KeyboardArrowRightIcon fontSize="small" />
              )}
            </ListItem>
            
            {requestCheck ? (
              <>
                {requestManagement.map((item) => (
                  <>
                    <ListItem
                      button
                      key={item.text}
                      onClick={() => {
                        navigate(item.path);
                        setMobileOpen(false);
                      }}
                      className={
                        location.pathname === item.path
                          ? classes.active
                          : classes.active2
                      }
                    >
                      <ListItemIcon></ListItemIcon>
                      <ListItemText
                        className={classes.listItemText}
                        style={{ fontSize: "24px" }}
                        primary={item.text}
                      />
                    </ListItem>
                  </>
                ))}
              </>
            ) : null}
          </>
          {analytics.map((item) => (
              <>
                <ListItem
                  button
                  key={item.text}
                  onClick={() => {
                    navigate(item.path);
                    setCheck(false);
                    setAnalyticsCheck(true);
                    setRequestCheck(false);
                  }}
                  className={
                    location.pathname === item.path
                      ? classes.active
                      : classes.active2
                  }
                >
                  <ListItemIcon>
                      <TimelineOutlined style={{ color: "#ffffff" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    className={classes.listItemText}
                  />
                </ListItem>
              </>
            ))}
        <ListItem button onClick={() => logout()} className={classes.active2}>
          <ListItemIcon>
            <ExitToAppIcon style={{ color: "#ffffff" }} />
          </ListItemIcon>
          <ListItemText className={classes.listItemText} primary="Sign out" />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>

      <div className={classes.page}>{children}</div>
    </div>
  );
}

DrawerBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

DrawerBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(DrawerBar);
