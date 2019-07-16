import React, { Component, Fragment } from "react";
import { LinearProgress, Grid, Button, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { navigate } from "../../store/ducks/navigate";
import { Creators as CreatorsSnackbar } from "../../store/ducks/snackbar";
import { Container, MyItemForm, MyAutosuggest } from "../../components";
import { Operators, Companies } from "../../services";

class InsertMyNewPage extends Component {
  state = {
    loading: true,
    open: false,
    MyDelete: false,
    email: "",
    name: "",
    clean: "",
    country: "",
    data: [],
    data2: []
  };
  componentDidMount = async () => {
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
  handleInsert = async () => {
    this.setState({ loading: true });
    // console.log({ ...this.state });
    const result = await Operators.InsertOne({
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
          <Typography variant="h5">Insert Operators </Typography>
          <Grid
            container
            spacing={40}
            justify="flex-start"
            direction="row"
            alignItems="flex-start"
          >
            <MyItemForm
              label="Operator Name"
              value={state.name}
              onChange={this.handleChange("name")}
            />
            <MyItemForm
              label="Contact Name"
              value={state.contact_name}
              onChange={this.handleChange("contact_name")}
            />
            <MyItemForm
              label="Email"
              value={state.email}
              onChange={this.handleChange("email")}
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
              label="Phone"
              value={state.phone}
              onChange={this.handleChange("phone")}
            />
            <MyItemForm
              label="Contact role"
              value={state.role}
              onChange={this.handleChange("role")}
            />
          </Grid>
          <Grid
            container
            spacing={40}
            justify="flex-start"
            direction="row"
            alignItems="flex-start"
          >
            <Grid item xs={4}>
              <MyAutosuggest
                myPlaceholder="Select Country"
                myLabel="Select Country"
                onClean={this.state.clean}
                value={this.state.country}
                onChange={(event, { newValue }) => {
                  this.setState({
                    country: newValue
                  });
                }}
                data={this.state.data2}
                onChangeText={name => this.setState({ country: name })}
              />
            </Grid>
            <MyItemForm
              label="State/Province"
              value={state.province}
              onChange={this.handleChange("province")}
            />
            <MyItemForm
              label="City"
              value={state.city}
              onChange={this.handleChange("city")}
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
              label="Address"
              value={state.address}
              onChange={this.handleChange("address")}
            />
            <MyItemForm
              label="Zip"
              value={state.zip}
              onChange={this.handleChange("zip")}
            />
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
)(InsertMyNewPage);
