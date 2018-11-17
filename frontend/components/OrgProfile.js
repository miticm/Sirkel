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
      leader: { username: "", id: "" },
      members: [],
      paidmembers: [],
      _id: "",
      avatar: "",
      chatRoomID: ""
    }
  };
  getOrgByID() {
    Axios.get(`${serverAddress}/orgs/${this.props.match.params.id}`).then(
      res => {
        console.log(res.data);
        if (res.data.success) {
          console.log(res.data.org);
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

  clickPay = f => {
    let currentUserId = localStorage.getItem("userID");
    let exist = this.state.orgObject.paidmembers.find(f => {
      return f.id === currentUserId;
    });
    if (!exist) {
      Axios.post(`${serverAddress}/orgs/${this.state.orgObject._id}/pay`)
        .then(res => {
          if (res.data.success) {
            this.getOrgByID();
          }
        })
        .catch(err => console.log(err));
    } else {
      alert("You have already paid your dues");
    }
  };

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
            <p> {this.state.orgObject.description}</p>

            <p>{`Founder: ${this.state.orgObject.leader.username}`}</p>

            <table>
              <tr>
                <th>Members</th>
                <th>Dues</th>
                <th>Add dues</th>
                <th>Send reminder to pay dues</th>
              </tr>
              
                {this.state.orgObject.members.map(m => {
                  return (
                    <tr>
                      <td>{m.username}</td>
                      <td>{m.dues}</td>
                      <td><input type="number"/> <Button>Add</Button><Button>Clear</Button></td>
                      <td><Button fullWidth color="secondary">Remind</Button></td>
                    </tr>

                  )
                })}
              
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

OrgProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(OrgProfile);
