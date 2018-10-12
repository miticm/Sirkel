import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import NavBar from "../components/Navbar";
import Homepage from "../components/Homepage";
import Dashboard from "../components/Dashboard";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
require("../node_modules/normalize.css/normalize.css");
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import io from "socket.io-client";

export default class App extends Component {
  socket = (this.socket = io("http://127.0.0.1:5000"));

  state = {
    isAuth: localStorage.getItem("isAuth")
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
          this.login();
        }
      })
      .catch(err => {
        console.log("You are not logged in");
        this.signOut();
      });
  };
  login = () => {
    this.setState({ isAuth: true });
  };
  signOut = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("isAuth");
    setAuthToken("");
    this.setState({ isAuth: false });
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar isAuth={this.state.isAuth} signOut={this.signOut} />
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/signup" component={SignUp} />

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
                  <Dashboard {...props} />
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
                  <Dashboard {...props} show="events" />
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
                  <Dashboard {...props} show="settings" />
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
                  <Dashboard {...props} show="profile" />
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
                  <Dashboard {...props} show="org" />
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
                  <Dashboard {...props} show="connections" />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/orgprofile"
              render={props =>
                this.state.isAuth ? (
                  <Dashboard {...props} show="orgprofile" />
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
                  <Dashboard {...props} show="orgprofile" />
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
                  <Dashboard {...props} show="chats" />
                ) : (
                  <Redirect to="/login" />
                )
              }
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
ReactDOM.render(<App />, document.getElementById("app"));
