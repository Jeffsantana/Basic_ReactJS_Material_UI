import React, { Component, Fragment } from "react";
import { LinearProgress, Grid, Button, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { navigate } from "../../store/ducks/navigate";
import { Creators as CreatorsSnackbar } from "../../store/ducks/snackbar";
import { Container, MyItemForm, MyDeleteAlert } from "../../components";
import { MyNewPage, Companies } from "../../services";

class InsertMyNewPage extends Component {
  state = {
    loading: true,
    open: false,
    MyDelete: false,
    email: "",
    name: "",
    data: [],
    clean: "",
    country: "",
    address: ""
  };
  componentDidMount = async () => {
    const result = await MyNewPage.listOne(this.props.id);
    if (result.ok) {
      this.setState({ ...this.state, ...result.data });
    }
    const result2 = await Companies.listCountry();
    // console.log("result:");
    // console.log(result);
    if (result2.ok) {
      this.setState({ data2: result2.data, loading: false });
    } else {
      this.props.msg(result2.message);
    }
  };
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
  handleUpload = async event => {
    const result = await MyNewPage.UpdateOne(this.state._id, this.state);
    if (result.ok) {
      this.props.msg(result.message);
      this.props.onClose();
    } else {
      this.props.msg(result.message);
    }
  };
  handleDelete = async event => {
    this.setState({ MyDelete: false });
    const result = await MyNewPage.DeleteOne(this.state._id, this.state);
    if (result.ok) {
      this.props.msg(result.message);
      this.props.onClose();
    } else {
      this.props.msg(result.message);
    }
  };

  render() {
    const state = this.state;
    // console.log("state:");
    // console.log(state);
    if (this.state.loading) {
      return (
        <Container>
          <LinearProgress />
        </Container>
      );
    } else {
      return (
        <Fragment>
          <Typography variant="h5">Update MyNewPage </Typography>
          <Grid
            container
            spacing={40}
            justify="flex-start"
            direction="row"
            alignItems="flex-start"
          >
            <MyItemForm
              MyFocus={true}
              label="Name"
              value={state.name}
              disabled={true}
              onChange={this.handleChange("name")}
            />
          </Grid>
          <Grid
            container
            spacing={40}
            justify="flex-start"
            direction="row"
            alignItems="flex-start"
          >
            <MyItemForm
              label="Email"
              value={state.email}
              disabled={true}
              onChange={this.handleChange("email")}
            />
          </Grid>
          <MyDeleteAlert
            onResultConfirm={() => {
              this.handleDelete();
            }}
            onResultCancel={this.handleClose}
            open={this.state.MyDelete}
          />
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="baseline"
          >
            <Button color="primary" onClick={this.handleUpload}>
              Save
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                this.setState({ MyDelete: true });
              }}
            >
              Delete
            </Button>
            <Button color="secondary" onClick={this.props.onClose}>
              Cancel
            </Button>
          </Grid>
        </Fragment>
      );
    }
  }
}

const mapStateToProps = state => ({
  // sanitize: state.manufecture
});

const mapDispatchToProps = {
  navigate,
  msg: CreatorsSnackbar.showSimple
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InsertMyNewPage);
