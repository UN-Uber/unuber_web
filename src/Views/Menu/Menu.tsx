import React, { useState } from "react";
import { logout } from "@/features/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Logo from '../../assets/profile_iconRecurso 5.svg';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';


const Menu: React.FC = () => {

  const [state, setState] = useState({left: false});

  const toggleDrawer = (open: boolean) => (event: React.MouseEvent) => {
    setState({...state, left: open});
  };

  // TODO: Logout Logic

  let dispatch = useDispatch();
  let navigate = useNavigate();

  function endSession() {
    dispatch(logout);
    localStorage.removeItem("token");
    setTimeout(() => navigate("/login"), 3500);
  }

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon sx={{fontSize: 30}}/>
          </IconButton>
          <img id="appbar-logo" src={Logo} />
        </Toolbar>
      </AppBar>

      <Drawer
          anchor="left"
          open={state.left}
          onClose={toggleDrawer(false)}
        >
          <Toolbar sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(false)}
            >
              <MenuIcon sx={{fontSize: 30}}/>
            </IconButton>
          </Toolbar>
          <Divider />
          <List sx={{width: 300, px: 1}}>
          <ListItem button component={Link} key={1} href="/home">
              <ListItemIcon>
                <HomeIcon  sx={{fontSize: 30}}/>
              </ListItemIcon>
              <ListItemText primary="Inicio" />
            </ListItem>

            <ListItem button component={Link} key={2} href="/viewData">
              <ListItemIcon>
                <AccountCircleIcon  sx={{fontSize: 30}}/>
              </ListItemIcon>
              <ListItemText primary="Cuenta" />
            </ListItem>

            <ListItem button component={Link} key={3} href="/wallet">
              <ListItemIcon>
                <CreditCardIcon  sx={{fontSize: 30}}/>
              </ListItemIcon>
              <ListItemText primary="Billetera" />
            </ListItem>

            <ListItem button key={4} onClick={() => {}}>
              <ListItemIcon>
                <LogoutIcon  sx={{color: "#F30000", fontSize: 30}}/>
              </ListItemIcon>
              <ListItemText sx={{color: "#F30000"}} primary="Cerrar sesión" />
            </ListItem>
          </List>
        </Drawer>

    </Box>
  );
}

export default Menu