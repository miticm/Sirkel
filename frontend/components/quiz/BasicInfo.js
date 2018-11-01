import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from "@material-ui/core/Button";

class BasicInfo extends Component {
  state = {
    name: "",
    collegeLevel: ""
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onclick = e => {
    this.props.updateBasicInfo({
      name: this.state.name,
      collegeLevel: this.state.collegeLevel
    });
    this.props.handleNext();
  }

  render() {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Basic informations
        </Typography>
        <Grid container spacing={24}>
          <Grid item sm={12}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel>Your Name</InputLabel>
              <Input
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                required
              />
            </FormControl>
          </Grid>
          <Grid item sm={12}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel>College Level</InputLabel>
              <Select
                value={this.state.collegeLevel}
                inputProps={{
                  name: 'collegeLevel'
                }}
                onChange={this.onChange}
                required
              >
                <MenuItem value="Undergraduate">
                  Undergraduate
                </MenuItem>
                <MenuItem value="Graduate">
                  Graduate
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          style={{
            marginTop: "30px",
            marginLeft: "450px"
          }}
          onClick={this.onclick}
        >
          Next
        </Button>
      </React.Fragment>
    );
  }
}

export default BasicInfo;
