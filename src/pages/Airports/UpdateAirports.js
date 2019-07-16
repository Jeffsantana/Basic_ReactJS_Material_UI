import React, { Component, Fragment } from "react";
import { LinearProgress, Grid, Button, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { navigate } from "../../store/ducks/navigate";
import { Creators as CreatorsSnackbar } from "../../store/ducks/snackbar";
import { Airports, Companies } from "../../services";
import {
  Container,
  MyDeleteAlert,
  MyItemForm,
  MyAutosuggest
} from "../../components";

class updateAirports extends Component {
  state = {
    loading: true,
    open: false,
    MyDelete: false,
    timeline: [],
    date: [],
    data2: []
  };
  componentDidMount = async () => {
    const result = await Airports.listOne(this.props.id);
    if (result.ok) {
      this.setState({ ...this.state, ...result.data });
    }
    const result2 = await Companies.listCountry();
    // console.log("result2:");
    // console.log(result2);
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
    const result = await Airports.UpdateOne(this.state._id, this.state);
    if (result.ok) {
      this.props.msg(result.message);
      this.props.onClose();
    } else {
      this.props.msg(result.message);
    }
  };
  handleDelete = async event => {
    this.setState({ MyDelete: false });
    const result = await Airports.DeleteOne(this.state._id, this.state);
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
          <Typography variant="h5">Update Airport</Typography>
          <Grid
            container
            spacing={40}
            justify="space-between"
            direction="row"
            alignItems="flex-start"
          >
            <MyItemForm
              label="Aerodrome"
              value={state.aerodrome}
              onChange={this.handleChange("aerodrome")}
            />
            <MyItemForm
              label="City"
              value={state.city}
              onChange={this.handleChange("city")}
            />
            <Grid item sm={4} xs={4}>
              <MyAutosuggest
                myPlaceholder="Country"
                myLabel="Country"
                // onClean={this.state.country}
                value={this.state.country}
                onChange={(event, { newValue }) => {
                  this.setState({
                    // country: event.target.value,
                    country: newValue
                  });
                }}
                data={this.state.data2}
                onChangeText={name => this.setState({ country: name })}
              />
            </Grid>
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
)(updateAirports);
