import React, { useGlobal, useState } from "reactn";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
// import NotFound from './pages/NotFound';
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Logout from "./components/Logout";
import SignUp from "./pages/SignUp";
import User from "./pages/User";
import ShoppingList from "./pages/ShoppingList";
import Schedule from "./pages/Schedule";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import HomeIcon from "@material-ui/icons/Home";
import FaceIcon from "@material-ui/icons/Face";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const history = useHistory();
  const classes = useStyles();
  const [token, setToken] = useGlobal("token");

  const logout = () => {
    setToken(null);
  };

  const goToPage = page => {
    history.push(`/${page}`);
    setDrawerOpen(false);
  };

  return (
    <div className={classes.root}>
      {token && (
        <Drawer
          classes={{ paper: "drawer" }}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}>
          <List>
            <ListItem onClick={() => goToPage("")} button>
              <ListItemIcon>
                {" "}
                <HomeIcon />{" "}
              </ListItemIcon>
              <ListItemText primary="Home"></ListItemText>
            </ListItem>
            <ListItem onClick={() => goToPage("profile")} button>
              <ListItemIcon>
                {" "}
                <FaceIcon />{" "}
              </ListItemIcon>

              <ListItemText primary="Profile"></ListItemText>
            </ListItem>
            <ListItem onClick={() => goToPage("schedule")} button>
              <ListItemIcon>
                {" "}
                <CalendarTodayIcon />{" "}
              </ListItemIcon>

              <ListItemText primary="Schedule"></ListItemText>
            </ListItem>
            <ListItem onClick={() => goToPage("shoppinglist")} button>
              <ListItemIcon>
                {" "}
                <FormatListBulletedIcon />{" "}
              </ListItemIcon>

              <ListItemText primary="Shoppinglist"></ListItemText>
            </ListItem>
          </List>
        </Drawer>
      )}
      <AppBar style={{ backgroundColor: "green" }} position="static">
        <Toolbar>
          <IconButton
            onClick={() => setDrawerOpen(true)}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            FarmAssistant
          </Typography>
          {!token && (
            <>
              <Button onClick={() => goToPage("login")} color="inherit">
                Login
              </Button>
              <Button onClick={() => goToPage("sign-up")} color="inherit">
                Sign up
              </Button>
            </>
          )}
          {token && (
            <Button onClick={logout} color="inherit">
              Log out{" "}
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <h1 className="homeheader">Welcome to my FarmAssistant </h1>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/user/:userId" component={User} />
        <PrivateRoute path="/profile" component={Profile} />
        {/* <Route component={NotFound} /> */}
        <Route path="/ShoppingList" component={ShoppingList} />
        <Route path="/Schedule" component={Schedule} />
      </Router>
    </>
  );
}

export default App;
