import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Axios from "axios";
import Switch from "@material-ui/core/Switch";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import serverAddress from "../utils/serverAddress";
import { socketContext } from "../utils/socketContext";

const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: "75px",
    marginBottom: "75px",
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: "90%",
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },

  replyField: {
    marginTop: 0,
    marginRight: 10,
    display: "fixed",
    flexDirection: "column",
    alignItems: "left",
    width: 460
  },

  submit: {
    margin: theme.spacing.unit,
    marginTop: "0.2rem",
    marginLeft: 0,
    marginRight: 0
  },

  title: {
    backgroundColor: "#60b0f4",
    padding: theme.spacing.unit * (1 / 2),
    marginBottom: 0,
    width: "100%"
  }
});

class OrgProfile extends Component {
  state = {
    orgObject: {
      name: "",
      description: "",
      admins: [],
      members: [],
      _id: "",
      avatar: "",
      chatRoomID: ""
    },
    amount: 0
  };
  

  getOrgByID() {
    Axios.get(`${serverAddress}/orgs/${this.props.match.params.id}`).then(
      res => {
        if (res.data.success) {
          this.setState({ orgObject: res.data.org });
        } else {
          this.setState({ orgObject: { name: "Organization not found" } });
        }
      }
    );
  }
  componentDidMount() {
    this.getOrgByID();
  }
  onClick = e => {
    let currentUserId = localStorage.getItem("userID");
    let exist = this.state.orgObject.members.find(e => {
      return e.id === currentUserId;
    });
    if (!exist) {
      Axios.post(`${serverAddress}/orgs/${this.state.orgObject._id}/join`)
        .then(res => {
          if (res.data.success) {
            this.getOrgByID();
          }
        })
        .catch(err => console.log(err));
    } else {
      alert("You are a member of this Org already");
    }
  };

  onChange = e => {
    this.setState({ amount: e.target.value });
  };

  changeDues = (userID, amount) => {
    if(amount < 0){
      return;
    }
    Axios.post(`${serverAddress}/orgs/${this.props.match.params.id}/dues`, {
      amount: amount,
      userID: userID
    }).then(res => {
      if (res.data.success) {
        this.setState({amount:0})
        this.getOrgByID();
      }
    });
  };

  remindDues = (userID,amount) =>{
    if(amount > 0){
      this.props.socket.emit("remind",{
        userID,
        amount,
        orgName:this.state.orgObject.name
      })
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="headline" className={classes.title}>
              {this.state.orgObject.name}
            </Typography>
            <Avatar
              alt="orj avatar"
              src={this.state.orgObject.avatar}
              style={{ height: 80, width: 80 }}
            />
            <h1> {this.state.orgObject.description}</h1>
            <table>
              <thead>
                <tr>
                  <th>Members</th>
                  <th>Dues</th>
                  <th>
                    Add dues{" "}
                    <input
                      onChange={this.onChange}
                      type="number"
                      value={this.state.amount}
                    />
                  </th>
                  <th>Send reminder to pay dues</th>
                </tr>
              </thead>
              <tbody>
                {this.state.orgObject.members.map(m => {
                  return (
                    <tr key={Math.random() * 100}>
                      <td>{m.username}</td>
                      <td>{m.dues}$</td>
                      <td>
                        <Button
                          color="primary"
                          onClick={() =>
                            this.changeDues(m.id, this.state.amount)
                          }
                        >
                          Add
                        </Button>
                        <Button
                          color="primary"
                          onClick={() => this.changeDues(m.id, 0)}
                        >
                          Clear
                        </Button>
                      </td>
                      <td>
                        <Button fullWidth color="secondary" onClick={()=>this.remindDues(m.id,m.dues)}>
                          Remind
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <Button
              className={classes.submit}
              style={{ backgroundColor: "#60b0f4", color: "white" }}
              onClick={this.onClick}
              fullWidth
            >
              Join
            </Button>
            <Button
              fullWidth
              style={{ backgroundColor: "#60b0f4", color: "white" }}
              className={classes.submit}
            >
              <Link to={`/chats/${this.state.orgObject.chatRoomID}`}>
                Chat room
              </Link>
            </Button>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

const OrgProfileWithSocket = props => (
  <socketContext.Consumer>
    {socket => <OrgProfile {...props} socket={socket} />}
  </socketContext.Consumer>
)

export default withStyles(styles)(OrgProfileWithSocket);
