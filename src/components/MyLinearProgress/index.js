import React, { Component, Fragment } from "react";
import { CircularProgress } from "@material-ui/core";
import { BeautifulModal } from "../../styles";

class MyLinearProgress extends Component {
  render() {
    return (
      <Fragment>
        <BeautifulModal>
          <CircularProgress />
        </BeautifulModal>
      </Fragment>
    );
  }
}

export default MyLinearProgress;
