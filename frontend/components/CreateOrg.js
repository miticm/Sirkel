import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
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

  form: {
    width: "100%", // Fix IE11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  title: {
    width: "100%",
    textAlign: "center",
    color: "#ffffff",
    backgroundColor: "#60b0f4",
    padding: theme.spacing.unit * (1 / 2),
    marginBottom: 0
  }
});

class CreateOrg extends Component {
  state = {
    name: "",
    desc: "",
    open: false,
    scroll: "paper"
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = async e => {
    e.preventDefault();
    const org = {
      name: this.state.name,
      description: this.state.description
    };
    try {
      let orgsRes = await axios.post("http://127.0.0.1:5000/orgs", { org });
      if (orgsRes.data.success) {
        this.setState({
          name: "",
          description: "",
          open: true
        });
        this.props.getOrgList();
        const currentUserID = localStorage.getItem("userID");
        let groupRes = await axios.post("http://127.0.0.1:5000/chats/group", {
          receivers: [currentUserID],
          name: org.name
        });
        console.log(groupRes);
      }
    } catch (err) {
      console.log(err);
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
              Create a new Organization
            </Typography>
            <form className={classes.form} onSubmit={this.onSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel>Name of the Organization</InputLabel>
                <Input
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel>Description</InputLabel>
                <Input
                  name="description"
                  multiline
                  value={this.state.description}
                  onChange={this.onChange}
                />
              </FormControl>

              <Button
                style={{ backgroundColor: "#60b0f4" }}
                type="submit"
                multiple
                variant="raised"
                color="primary"
                className={classes.submit}
              >
                Create
              </Button>

              <Button
                style={{ backgroundColor: "#60b0f4", marginLeft: "68%" }}
                multiple
                variant="raised"
                color="primary"
                href="https://www.purdue.edu/studentregulations/student_organizations/forming.html"
                target="_blank"
                className={classes.submit}
              >
                Forming Clubs Info
              </Button>

              <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                scroll={this.state.scroll}
                aria-labelledby="scroll-dialog-title"
              >
                <DialogTitle id="scroll-dialog-title">
                  Purdue Club Regulations
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    A group of Purdue students may become a student organization
                    upon formal recognition by the Office of the Dean of
                    Students. According to Article 13 of the Purdue University
                    Bill of Student Rights, any student group recognized as a
                    Purdue student organization shall be entitled to the use of
                    available University facilities in conformity with
                    regulations. Recognition shall not imply University
                    endorsement of group goals and activities. Such recognition
                    is contingent upon the following considerations: The
                    approval of the constitution of the proposed student
                    organization by the Office of the Dean of Students. An
                    outline of the basic information to be included in a
                    constitution is available in the Student Organization
                    Handbook online, or at Office of the Dean of Students in
                    Schleman Hall. The filing of a list of eligible officers
                    including the name of a faculty advisor. The establishment
                    of a financial account with the Business Office for Student
                    Organizations. Any student organization not covered by
                    Purdue University's liability insurance program (those whose
                    finances are not managed through the Business Office for
                    Student Organizations) must provide proof of liability
                    insurance. Such proof shall be in the form of a Certificate
                    of Insurance showing a minimum of $1.0 million of commercial
                    general liability insurance. The Certificate shall also name
                    Purdue University and The Trustees of Purdue University as
                    additional insureds. To maintain status as a recognized
                    student organization the following conditions must be met:
                    Any new or revised constitution must be submitted to the
                    Office of the Dean of Students for approval. All amendments
                    to the current constitution must be submitted to the Office
                    of the Dean of Students for approval. A list of new eligible
                    officers must be filed in the Office of the Dean of Students
                    within three weeks of their election. Submit a new
                    Certificate of Insurance annually within 30 days of
                    expiration of the previous year's policy. Members of student
                    organizations are required to abide by the laws of the state
                    of Indiana, the United States, the community, the state or
                    country in which the organization's activities occur, and
                    University rules and regulations. The Office of the Dean of
                    Students will notify any recognized student organization
                    that has failed to meet the conditions for maintaining
                    active status: The student organization will be deactivated
                    if the conditions listed in Section B above (this is true of
                    all section references in this part unless otherwise
                    specified) are not satisfied. The organization may request
                    to be returned to active status once it has met the
                    necessary qualifications. If a recognized student
                    organization is in a state of deactivation for a period of
                    at least two years, the Office of the Dean of Students will
                    withdraw recognition from that organization. An organization
                    may request to have recognition withdrawn at any time it
                    chooses.
                  </DialogContentText>
                  <a
                    href="https://www.purdue.edu/studentregulations/student_organizations/forming.html"
                    target="_blank"
                  >
                    Learn More
                  </a>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Accept
                  </Button>
                </DialogActions>
              </Dialog>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

CreateOrg.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateOrg);
