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
import { socketContext } from "../utils/socketContext";

const socket = io.connect(`${serverAddress}`);

export default class App extends Component {
  state = {
    open:false,
    title:"",
    content:""
  }

  componentDidMount(){
    socket.on("remindDues",data=>{
      console.log(data);
      if(data.userID == localStorage.getItem('userID')){
        this.setState({title:`You have $ ${data.amount} dues need to pay`,content:`Organization: ${data.orgName}`},()=>{
          this.setState({open:true})
        })
      }
    })
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
    <socketContext.Provider value={socket}>
      <NavBar />
      <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>
            {/* New Match 👏🏻👏🏻👏🏻 */}
            {this.state.title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.state.content}
              {/* There is a new organization that you may like!
              Go check it out in the organization page.
              We match the organization with you base on your survey. */}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Got it
            </Button>
          </DialogActions>
        </Dialog>
    </socketContext.Provider>
    )
  }
}


ReactDOM.render(<App />, document.getElementById("app"));