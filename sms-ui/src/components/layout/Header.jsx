import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import Button from '@mui/material/Button';
import logo from '../../assests/logo.svg'
import "./Landing.css";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const drawerWidth = 240;
function Header(props) {
    let navigate = useNavigate();
  const { window, isLanding, isAuthenticated } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Divider />
      <List>
          <ListItem key={"item2"} disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }} onClick={() => navigate('/login')}>
              <ListItemText primary={"Login"} />
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" style={{background:"#490F4C",opacity:"80%"}}>
        <Toolbar>
        {isLanding === true &&
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>}
          <Box style={{width:"50%"}} sx={{ display: { xs: 'none', sm: 'block' } }}>
            <img src={logo} width={50} height={50} alt="" style={{width:"20%",marginLeft:'5%'}} />
          </Box>
          <Box style={{width:"50%"}} sx={{ display: { xs: 'block', sm: 'none' } }}>
            <div style={{display: 'flex', justifyContent: 'right'}}>
              <img src={logo} width={50} height={50} alt="" style={{width:"50%",marginLeft:'5%'}} />
            </div>
          </Box>
          {isLanding === true &&
         <Box style={{width:"50%"}} sx={{ display: { xs: 'none', sm: 'block' } }}>
          <div style={{display: 'flex', justifyContent: 'right'}}>
            <Button onClick={() => navigate('login')}>
                <div className="login-button">
                    <div className="div">
                        <PermIdentityIcon className="user-icon"/>
                        <div className="dashboard">{isAuthenticated === true ? "Home":"Login" }</div>
                    </div>
                </div>
            </Button>
            </div>
         </Box>}
        </Toolbar>
      </AppBar>
      {isLanding === true &&
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>}
    </Box>
  );
}

Header.propTypes = {
  window: PropTypes.func,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {})(Header);