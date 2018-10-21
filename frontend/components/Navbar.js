import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import "./Navbar.css";

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

export default function NavBar(props) {
  return (
    <div className="navbar">
      <AppBar style={{ backgroundColor: "#60b0f4" }}>
        <Toolbar>
          <Button color="inherit" className="navButton">
            <Link to="/">Home</Link>
          </Button>

          {props.isAuth ? (
            <div>
              <Button color="inherit" className="navButton">
                <Link to="/dashboard">dashboard</Link>
              </Button>
              <Button
                color="inherit"
                className="navButton"
                onClick={props.signOut}
              >
                sign out
              </Button>
              <div className={classes.grow} />
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                <SearchIcon />
                </div>
                <Input
                  placeholder="Search…"
                  disableUnderline
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
                </div>
              </div>
          ) : (
            <div>
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
    </div>
  );
}
