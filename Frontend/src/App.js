import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import NavBar from "../components/Navbar";
import Homepage from "../components/Homepage";
import Dashboard from "../components/Dashboard";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import ProfilePage from "../components/ProfilePage"

require("../node_modules/normalize.css/normalize.css");
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
export default class App extends Component {
  state = {
    isAuth: false
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
      });
  };
  login = () => {
    this.setState({ isAuth: true });
  };
  signOut = () => {
    localStorage.removeItem("jwtToken");
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
            <Route exact path="/profile" component={ProfilePage} />

            <Route
              exact
              path="/login"
              render={myprops => <Login {...myprops} login={this.login} />}
            />
            <Route
              exact
              path="/dashboard"
              render={props =>
                this.state.isAuth ? <Dashboard {...props} /> : <Login />
              }
            />
            <Route
              exact
              path="/events"
              render={props =>
                this.state.isAuth ? (
                  <Dashboard {...props} show="events" />
                ) : (
                  <Login />
                )
              }
            />
                        <Route
              exact
              path="/organizations"
              render={props =>
                this.state.isAuth ? (
                  <Dashboard {...props} show="organizations" />
                ) : (
                  <Login />
                )
              }
            />

            <Route render={() => <p>Page Not Found</p>} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("app"));
