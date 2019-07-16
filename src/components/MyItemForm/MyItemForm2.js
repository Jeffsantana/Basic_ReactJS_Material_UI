import React, { Component } from "react";
import { TextField, Grid } from "@material-ui/core";

class MyItemForm2 extends Component {
  render() {
    const { label, value } = this.props;
    return (
      <Grid item xs={6} sm={6}>
        <TextField
          autoFocus={this.props.MyFocus}
          label={label}
          value={value}
          margin="normal"
          onChange={this.props.onChange}
          fullWidth={true}
          disabled={this.props.disabled}
        />
      </Grid>
    );
  }
}
export default MyItemForm2;
