import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import "./Navbar.css";
export default function NavBar(props) {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Button color="inherit" className="navButton">
            <Link to="/">Home</Link>
          </Button>
          <Button color="inherit" className="navButton">
            <Link to="/login">Login</Link>
          </Button>
          <Button color="inherit" className="navButton">
            <Link to="/signup">Sign Up</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
