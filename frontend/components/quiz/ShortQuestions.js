import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

function ShortQuestions() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        short questions
      </Typography>
      <Grid container spacing={24}>
        <Grid item md={12}>
          <TextField
            required
            id="q1"
            label="Who would you want as a dinner guest?"
            fullWidth
            multiline
          />
        </Grid>

        <Grid item md={12}>
          <TextField
            required
            id="q2"
            label="What would constitute a perfect day for you?"
            fullWidth
            multiline
          />
        </Grid>

        <Grid item md={12}>
          <TextField
            required
            id="q3"
            label="What do you value most in a friendship?"
            fullWidth
            multiline
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default ShortQuestions;
