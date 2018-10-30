import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function BasicInfo(props) {
  let data = {
    name: "",
    age: 0
  };
  let changeName = e => {
    data.name = e.target.value;
  };
  let changeAge = e => {
    data.age = e.target.value;
  };
  let onclick = e => {
    props.updateBasicInfo(data);
    props.handleNext();
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Basic informations
      </Typography>
      <Grid container spacing={24}>
        <Grid item sm={12}>
          <TextField
            name="name"
            label="Your name"
            fullWidth
            type="text"
            onChange={changeName}
          />
        </Grid>
        <Grid item sm={12}>
          <TextField
            name="age"
            label="Your age"
            fullWidth
            type="number"
            onChange={changeAge}
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

export default BasicInfo;
