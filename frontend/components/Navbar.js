import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import "./Navbar.css";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import classNames from "classnames";
import MenuIcon from "@material-ui/icons/Menu";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import List from "@material-ui/core/List";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import {
  firstDividerSideBarItems,
  secondDividerSideBarItems
} from "./icons/dashboardData";

import Homepage from "./Homepage";
import Dashboard from "./Dashboard";
import SignUp from "./SignUp";
import Login from "./Login";
import Verify from "./Verify";
import Forgot from "./Forgot";
import ChangePassword from "./ChangePassword";
const drawerWidth = 240;
class NavBar extends Component {
  state = {
    open: false,
    isAuth: localStorage.getItem("isAuth"),
    user: {}
  };

  componentDidMount() {
    this.checkAuth();
  }

  checkAuth = () => {
    const token = localStorage.getItem("jwtToken");
    setAuthToken(token);
    axios
      .get("http://127.0.0.1:5000/users/checkToken")
      .then(res => {
        if (res.data.success) {
          this.login(res.data.user);
        }
      })
      .catch(err => {
        console.log("You are not logged in");
        this.signOut();
      });
  };
  login = user => {
    this.setState({ isAuth: true, user: user });
  };
  
  signOut = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("isAuth");
    localStorage.removeItem("userID");
    setAuthToken("");
    this.setState({ isAuth: false, user: {} });
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <BrowserRouter>
        <div>
          <AppBar
            className={classes.appBar}
            style={{ backgroundColor: "#60b0f4" }}
          >
            <Toolbar>
              {this.state.isAuth ? (
                <div>
                  <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={this.handleDrawerOpen}
                    className={classNames(
                      classes.menuButton,
                      this.state.open && classes.hide
                    )}
                  >
                    <MenuIcon />
                  </IconButton>

                  <Button color="inherit" className="navButton">
                    <Link to="/">Home</Link>
                  </Button>

                  <Button color="inherit" className="navButton">
                    <Link to="/dashboard">dashboard</Link>
                  </Button>

                  <Button
                    color="inherit"
                    className="navButton"
                    onClick={this.signOut}
                  >
                    sign out
                  </Button>
                </div>
              ) : (
                <div>
                  <Button color="inherit" className="navButton">
                    <Link to="/">Home</Link>
                  </Button>
                  <Button color="inherit" className="navButton">
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button color="inherit" className="navButton">
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </div>
              )}
            </Toolbar>
          </AppBar>

          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={this.state.open}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List>{firstDividerSideBarItems}</List>
            <Divider />
            <List>{secondDividerSideBarItems}</List>
          </Drawer>

          
            <Switch>
              <Route exact path="/" component={Homepage} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/forgot" component={Forgot} />

              <Route
                exact
                path="/login"
                render={myprops => <Login {...myprops} login={this.login} />}
              />
          
              <Route
                exact
                path="/dashboard"
                render={props =>
                  this.state.isAuth ? (
                    <Dashboard open={this.state.open} {...props} />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />
              
              <Route
                exact
                path="/events"
                render={props =>
                  this.state.isAuth ? (
                    <Dashboard open={this.state.open} {...props} show="events" />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />
              <Route
                exact
                path="/settings"
                render={props =>
                  this.state.isAuth ? (
                    <Dashboard open={this.state.open} {...props} show="settings" />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />
              <Route
                exact
                path="/profile"
                render={props =>
                  this.state.isAuth ? (
                    <Dashboard open={this.state.open} {...props} show="profile" />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />
              <Route
                exact
                path="/org"
                render={props =>
                  this.state.isAuth ? (
                    <Dashboard open={this.state.open} {...props} show="org" />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />
              <Route
                exact
                path="/connections"
                render={props =>
                  this.state.isAuth ? (
                    <Dashboard open={this.state.open} {...props} show="connections" />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />
              <Route
                exact
                path="/org/:id"
                render={props =>
                  this.state.isAuth ? (
                    <Dashboard open={this.state.open} {...props} show="orgprofile" />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />
              <Route
                exact
                path="/chats"
                render={props =>
                  this.state.isAuth ? (
                    <Dashboard open={this.state.open} {...props} user={this.state.user} show="chats" />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />
              <Route
                exact
                path="/chats/:id"
                render={props =>
                  this.state.isAuth ? (
                    <Dashboard open={this.state.open} {...props} show="messages" />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />
              <Route
                exact
                path="/survey"
                render={props =>
                  this.state.isAuth ? (
                    <Dashboard open={this.state.open} {...props} show="survey" />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />
            <Route exact path="/users/verify/:id"
             render={myprops => <Verify {...myprops} />}
            />
            <Route exact path="/users/reset/:id"
             render={myprops => <ChangePassword {...myprops} />}
            />

              <Route
                render={() => (
                  <p style={{ marginTop: "100px" }}>Page Not Found!!!!</p>
                )}
              />
            </Switch>
          </div>
      </BrowserRouter>
    );
  }
}

const styles = theme => ({
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  content: {
    flexGrow: 1,
    padding: 0,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  menuButton: {
    marginLeft: 0,
    marginRight: 0
  },
  hide: {
    display: "none"
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  }
});

export default withStyles(styles)(NavBar);
