import React, { Component, Fragment } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { navigate } from "../../store/ducks/navigate";
import { Creators as CreatorsSnackbar } from "../../store/ducks/snackbar";
import image from "../../assets/images/developing.png";

class MyModal extends Component {
  state = {
    loading: true,
    open: false,
    MyDelete: false,
    timeline: []
  };
  componentDidMount = async () => {};
  handleNavigate = route => {
    this.props.navigate(route);
    typeof this.props.closeDrawer === "function" && this.props.closeDrawer();
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  handleClose = event => {
    this.props.onClose();
  };
  handleInsert = async event => {
    this.props.onInsert(this.state);
  };

  render() {
    // const state = this.state;

    return (
      <Fragment>
        <Typography variant="h5">Developing Page</Typography>
        <img
          src={image}
          style={{ objectFit: "container", width: "40%", maxHeigth: 400 }}
          alt="Developing Page"
        />

        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="baseline"
        >
          <Button color="secondary" onClick={this.props.onClose}>
            Cancel
          </Button>
        </Grid>
      </Fragment>
    );
    // }
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  navigate,
  msg: CreatorsSnackbar.showSimple
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyModal);
