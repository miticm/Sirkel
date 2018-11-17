import React, { Component } from "react";
import ReactDOM from "react-dom";
import NavBar from "../components/Navbar";
import io from "socket.io-client";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
require("../node_modules/normalize.css/normalize.css");
import serverAddress from "../utils/serverAddress";


export default class App extends Component {
  state = {
    open:false
  }
  componentDidMount(){
    let socket = io.connect(`${serverAddress}`);
    socket.on("notification",data=>{
      this.setState({open:data.open})
    })
    socket.emit("userID",{userID:localStorage.getItem("userID")});
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
    <div>
      <NavBar />
      <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>{"New Match 👏🏻👏🏻👏🏻"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              There is a new organization that you may like!
              Go check it out in the organization page.
              We match the organization with you base on your survey.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Nice!
            </Button>
          </DialogActions>
        </Dialog>
    </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById("app"));