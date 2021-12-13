import React, {useEffect} from 'react';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness4Icon from "@material-ui/icons/Brightness4";

import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import AssignmentIcon from '@material-ui/icons/Assignment';
import GroupIcon from '@material-ui/icons/Group';
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import EventIcon from '@material-ui/icons/Event';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import SearchText from "./SearchText";
import MyPage from "./MyPage";
import Group from "./Group";
import ChatRoom from "./ChatRoom";
import Chat from "./Chat";
// import SampleCalendar from "./Dateput";
import {useDispatch, useSelector} from 'react-redux';
import {signOut} from '../reducks/users/operations';
import { getUserId, getUser } from '../reducks/users/selectors';
import PanToolIcon from '@material-ui/icons/PanTool';
import Intro from './Intro';
import Calendar from './Calendar';
import { Avatar } from '@material-ui/core';
import {useHistory} from 'react-router-dom'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      backgroundColor: "#81c784",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,

  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
  },
  right: {
    marginLeft: 'auto',
  },
  unko: {
    position: 'fixed',
    top: 10,
    right: 50,
    zIndex: 99999,
  }
}));

const SideTabs = (props) => {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const selector = useSelector( state => state);
  const id = getUserId(selector);
  const user = getUser(selector);
  console.log(user)
  const [mobileOpen, setMobileOpen] = React.useState(false);
  console.log(user.name.split(' '));
  const history = useHistory();

  const [darkMode, setDarkMode] = React.useState(
    localStorage.getItem("darkMode") === "on" ? true : false
  );
  const handleDarkModeOn = () => {
    localStorage.setItem("darkMode", "on");
    setDarkMode(true);
  };
  const handleDarkModeOff = () => {
    localStorage.setItem("darkMode", "off");
    setDarkMode(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const theme1 = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  });

  const drawer = (
    <div>

      <div style={{ position: 'absolute', top: 13, left: 10, textAlign: 'center', display: 'flex'}}>
        <Avatar style={{ backgroundColor: "#81c784" }}>{user.name.split('').[0][0] + user.name.split(' ')[1][0]}</Avatar>
        <Typography style={{ marginTop: 10, marginLeft: 15 }}>{user.name}</Typography>
      </div>
      <div className={classes.toolbar} />
      
      <Divider />
      <List>
        <ListItem button component={NavLink} to={`/mypage/${id}`}>
          <ListItemIcon>{<EmojiEmotionsIcon />}</ListItemIcon>
          <ListItemText primary="マイページ" />
        </ListItem>
        <ListItem button component={NavLink} to={`/task/${id}`}>
          <ListItemIcon>{<EventIcon />}</ListItemIcon>
          <ListItemText primary="タスク" />
        </ListItem>
        <ListItem button component={NavLink} to={`/group/${id}`}>
          <ListItemIcon>{<GroupIcon />}</ListItemIcon>
          <ListItemText primary="グループ" />
        </ListItem>
        <ListItem button component={NavLink} to={`/chatroom/${id}`} >
          <ListItemIcon>{<ForumRoundedIcon />}</ListItemIcon>
          <ListItemText primary="チャット" />
        </ListItem>
        <ListItem button component={NavLink} to="/">
          <ListItemIcon>{<PanToolIcon />}</ListItemIcon>
          <ListItemText primary="説 明" />
        </ListItem>
        <Divider />
        <ListItem button onClick={ () => dispatch(signOut())}>
          <ListItemIcon>{<ExitToAppRoundedIcon />}</ListItemIcon>
          <ListItemText primary="ログアウト" />
        </ListItem>

        <Divider />
        <ListItem button>
          <ListItemIcon>{<AddAlertIcon />}</ListItemIcon>
          <ListItemText primary="通 知" />
        </ListItem>

      </List>
      
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={theme1}>
    <div className={classes.root}>
      <Router>
      <CssBaseline />
      {darkMode ? (
        <IconButton className={classes.unko} color="inherit" onClick={handleDarkModeOff}>
          <Brightness4Icon />
        </IconButton>
      ) : (
        <IconButton className={classes.unko} color="inherit" onClick={handleDarkModeOn}>
          <Brightness7Icon />
        </IconButton>
      )}
      <AppBar position="fixed" className={classes.appBar} >
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
          <Typography variant="h6" noWrap>
            KCS グループウェア
          </Typography>
          <div className={classes.right} >
            <SearchText />
          </div>
          
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
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
      <main className={classes.content}>
        <div className={classes.toolbar} />
          <Route exact path="/" component={Intro} />
          <Route path="/mypage/:id" component={MyPage} />
          <Route path="/task/:id(/:index)?" component={Calendar} />
          <Route path="/group/:id" component={Group} />
          <Route path="/chatroom/:id" component={ChatRoom} />
          <Route path="/chat/:id/:room_name/:room_id(/:group_id)?" component={Chat} />
      </main>
      </Router>
    </div>
    </ThemeProvider>
  );
}

SideTabs.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default SideTabs;