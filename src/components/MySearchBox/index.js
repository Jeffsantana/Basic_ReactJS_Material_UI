import React, { Component } from "react";
import { Paper, InputBase, IconButton } from "@material-ui/core";
import { Search } from "@material-ui/icons";

class MySearchBox extends Component {
  state = {
    loading: false,
    open: false,
    LinearProgress: false,
    toSearch: 1
    // search: ""
  };

  render() {
    return (
      <Paper
        style={{
          marginTop: 15,
          display: "flex",
          flexDirection: "row",
          width: "100%"
        }}
        elevation={this.state.toSearch}
      >
        <InputBase
          style={{ marginLeft: 8, flexGrow: 1 }}
          value={this.state.search}
          autoFocus={true}
          onFocus={event => {
            this.setState({ toSearch: 5 });
          }}
          onChange={event => {
            this.props.search(event.target.value);
          }}
          placeholder={this.props.title}
        />
        <IconButton
          style={{ padding: 10 }}
          aria-label="Search"
          // onClick={() => {
          //   this.props.search(this.state.search);
          // }}
        >
          <Search />
        </IconButton>
      </Paper>
    );
  }
}

export default MySearchBox;
