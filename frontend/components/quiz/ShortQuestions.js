import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';

class ShortQuestions extends Component {
  state = {
    likesSports: "",
    likesMusic: "",
    likesVideoGames: "",
    tags: ""
  };
  
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onclick = e => {
    this.props.updateShortQuestions({
      likesSports: this.state.likesSports,
      likesMusic: this.state.likesMusic,
      likesVideoGames: this.state.likesVideoGames,
      tags: this.state.tags
    });
    this.props.handleNext();
  };

  render() {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          short questions
        </Typography>
        <Grid container spacing={24}>
          <Grid item md={12}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel>Do you like playing sports?</InputLabel>
              <Select
                value={this.state.likesSports}
                inputProps={{
                  name: 'likesSports'
                }}
                onChange={this.onChange}
                required
              >
                <MenuItem value="Yes">
                  Yes
                </MenuItem>
                <MenuItem value="No">
                  No
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item md={12}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel>Do you like listening to music?</InputLabel>
              <Select
                value={this.state.likesMusic}
                inputProps={{
                  name: 'likesMusic'
                }}
                onChange={this.onChange}
                required
              >
                <MenuItem value="Yes">
                  Yes
                </MenuItem>
                <MenuItem value="No">
                  No
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item md={12}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel>Do you like playing video games?</InputLabel>
              <Select
                value={this.state.likesVideoGames}
                inputProps={{
                  name: 'likesVideoGames'
                }}
                onChange={this.onChange}
                required
              >
                <MenuItem value="Yes">
                  Yes
                </MenuItem>
                <MenuItem value="No">
                  No
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item md={12}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel>Enter your interests in a comma separated list.</InputLabel>
              <Input
                name="tags"
                value={this.state.tags}
                onChange={this.onChange}
                required
              />
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

export default ShortQuestions;
