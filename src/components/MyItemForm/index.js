import React, { Component } from "react";
import { TextField, Grid } from "@material-ui/core";

class MyItemForm extends Component {
  render() {
    const { label, value } = this.props;
    return (
      <Grid item xs={4} sm={4}>
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
export default MyItemForm;
