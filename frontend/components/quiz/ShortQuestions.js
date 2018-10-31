import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";

function ShortQuestions(props) {
  let data = {
    q1: "",
    q2: "",
    q3: ""
  };
  let q1 = e => {
    data.q1 = e.target.value;
  };
  let q2 = e => {
    data.q2 = e.target.value;
  };
  let q3 = e => {
    data.q3 = e.target.value;
  };
  let onclick = e => {
    props.updateShortQuestions(data);
    props.handleNext();
  };
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
            label="Do you like sports? (Y/N)"
            fullWidth
            multiline
            onChange={q1}
          />
        </Grid>

        <Grid item md={12}>
          <TextField
            required
            id="q2"
            label="Do you like listening to music? (Y/N)"
            fullWidth
            multiline
            onChange={q2}
          />
        </Grid>

        <Grid item md={12}>
          <TextField
            required
            id="q3"
            label="Do you like playing video games? (Y/N)"
            fullWidth
            multiline
            onChange={q3}
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        style={{
          marginTop: "30px",
          marginLeft: "450px"
        }}
        onClick={onclick}
      >
        Next
      </Button>
    </React.Fragment>
  );
}

export default ShortQuestions;
