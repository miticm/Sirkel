import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "../components/Navbar";
import Homepage from "../components/Homepage";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import CreatePost from "../components/CreatePost";
import UserPost from "../components/UserPost"
import ProfilePage from "../components/ProfilePage"

require("../node_modules/normalize.css/normalize.css");

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/createpost" component={CreatePost} />
            <Route exact path="/userpost" component={UserPost} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={Login} />       
            <Route exact path="/profile" component={ProfilePage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("app"));
