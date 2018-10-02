import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function NavBar(props) {
  return (
    <div>
      <AppBar position="sticky" style={{ backgroundColor: "#60b0f4" }}>
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
