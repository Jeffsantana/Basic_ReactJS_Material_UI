import React, { Component, Fragment } from "react";
import { LinearProgress, Grid, Button, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { navigate } from "../../store/ducks/navigate";
import { Creators as CreatorsSnackbar } from "../../store/ducks/snackbar";
import { Container, MyItemForm, MyAutosuggest } from "../../components";
import { Airports, Companies } from "../../services";

class InsertAirports extends Component {
  state = {
    loading: true,
    open: false,
    MyDelete: false,
    email: "",
    name: "",
    clean: "",
    country: "",
    data: []
  };
  componentDidMount = async () => {
    const result = await Companies.listCountry();
    console.log("result:");
    console.log(result);
    if (result.ok) {
      this.setState({ data: result.data, loading: false });
    } else {
      this.props.msg(result.message);
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
  // handleInsert = async event => {
  //   this.props.onInsert(this.state);
  // };
  handleInsert = async () => {
    this.setState({ loading: true });
    // console.log({ ...this.state });
    const result = await Airports.InsertOne({
      ...this.state
    });
    if (result.ok) {
      this.props.msg(result.message);
      this.handleClose();
      // console.log(result);
    } else {
      this.setState({ loading: false });
      // console.log(result);
      this.props.msg(result.message);
    }
  };
  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
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
          <Typography variant="h5">Insert Airport</Typography>
          <Grid
            container
            spacing={40}
            justify="flex-start"
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
            <Grid item xs={4}>
              <MyAutosuggest
                myPlaceholder="Select Country"
                myLabel="Select Country"
                onClean={this.state.clean}
                value={this.state.country}
                onChange={(event, { newValue }) => {
                  this.setState({
                    // country: event.target.value,
                    country: newValue
                  });
                }}
                data={this.state.data}
                onChangeText={name => this.setState({ country: name })}
              />
            </Grid>
          </Grid>

          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="baseline"
          >
            <Button color="primary" onClick={this.handleInsert}>
              Save
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
)(InsertAirports);
