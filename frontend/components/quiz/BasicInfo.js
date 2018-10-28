import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { number } from "prop-types";

function BasicInfo() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Basic informations
      </Typography>
      <Grid container spacing={24}>
        <Grid item sm={12}>
          <TextField
            required
            id="name"
            label="Your name"
            fullWidth
            type="text"
          />
        </Grid>
        <Grid item sm={12}>
          <TextField
            required
            id="age"
            label="Your age"
            fullWidth
            type="number"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default BasicInfo;
