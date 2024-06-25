import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { People, Receipt, Subscriptions, AccountBalance, ShoppingCart } from '@mui/icons-material';
import NaturePeopleIcon from '@mui/icons-material/NaturePeople';
import SkateboardingIcon from '@mui/icons-material/Skateboarding';
import { Link, Outlet } from 'react-router-dom';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import BookIcon from '@mui/icons-material/Book';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DryCleaningIcon from '@mui/icons-material/DryCleaning';
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: '#006240', // Dark blue color
  color: 'white',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: '#006240', // Dark blue color
  color: 'white',
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: 'white',
  color: 'black',
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Makellos Admin
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} style={{paddingRight:"15px"}}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} style={{ color: "white" }}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem button component={Link} to="/dashboard">
            <ListItemIcon sx={{ color: 'white' }}>
              <People />
            </ListItemIcon>
            <ListItemText primary="Users" />

          </ListItem>

          <ListItem button component={Link} to="/subscriptions">
            <ListItemIcon sx={{ color: 'white' }}>
              <Subscriptions />
            </ListItemIcon>
            <ListItemText primary="Active Subscriptions" />
          </ListItem>




          <ListItem button component={Link} to="/activities">
            <ListItemIcon sx={{ color: 'white' }}>
              <NaturePeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Past Activities" />
          </ListItem>



          <ListItem button component={Link} to="/activeActivities">
            <ListItemIcon sx={{ color: 'white' }}>
              <SkateboardingIcon />
            </ListItemIcon>
            <ListItemText primary="Active Activities" />
          </ListItem>
          <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.367)", margin: "20px 0px" }} />
          {open &&
            <div style={{ color: "white", margin: "0px 0px 10px 20px" }}>PAYMENTS</div>}
          <ListItem button component={Link} to="/orders">
            <ListItemIcon sx={{ color: 'white' }}>
              <ShoppingCart />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItem>

          <ListItem button component={Link} to="/transactions">
            <ListItemIcon sx={{ color: 'white' }}>
              <ReceiptLongIcon />
            </ListItemIcon>
            <ListItemText primary="Transactions" />
          </ListItem>

          <ListItem button component={Link} to="/invoices">
            <ListItemIcon sx={{ color: 'white' }}>
              <Receipt />
            </ListItemIcon>
            <ListItemText primary="Invoices" />
          </ListItem>

          <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.367)", margin: "20px 0px" }} />
          {open &&
            <div style={{ color: "white", margin: "0px 0px 10px 20px" }}>DATA</div>}

          <ListItem button component={Link} to="/subs">
            <ListItemIcon sx={{ color: 'white' }}>
              <CardMembershipIcon />
            </ListItemIcon>
            <ListItemText primary="Subscription" />
          </ListItem>

          <ListItem button component={Link} to="/serviceArea">
            <ListItemIcon sx={{ color: 'white' }}>
              <LocationOnIcon />
            </ListItemIcon>
            <ListItemText primary="ServiceAreas" />
          </ListItem>

          <ListItem button component={Link} to="/serviceProvider">
            <ListItemIcon sx={{ color: 'white' }}>
              <DryCleaningIcon />
            </ListItemIcon>
            <ListItemText primary="ServiceProviders" />
          </ListItem>
          <ListItem button component={Link} to="/drivers">
            <ListItemIcon sx={{ color: 'white' }}>
              <DeliveryDiningIcon />
            </ListItemIcon>
            <ListItemText primary="DriversRecords" />
          </ListItem>
        </List>

        



      </Drawer>

      <Box component="main" sx={{ flexGrow: 1 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}