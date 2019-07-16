import React, { Component, Fragment } from "react";
import { LinearProgress, Grid, Button, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { navigate } from "../../store/ducks/navigate";
import { Creators as CreatorsSnackbar } from "../../store/ducks/snackbar";
import {
  Container,
  MyItemForm,
  MyAutosuggest,
  MyDeleteAlert
} from "../../components";
import { Companies } from "../../services";

class InsertClients extends Component {
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
    const result = await Companies.listCountry();
    if (result.ok) {
      this.setState({ data: result.data });
    } else {
      this.props.msg(result.message);
    }
    const result2 = await Companies.listOne(this.props.id);
    // console.log("result2:");
    // console.log(result2);
    if (result2.ok) {
      this.setState({
        // data: result.data,
        _id: result2.data._id,
        email: result2.data.email,
        name: result2.data.name,
        abbr: result2.data.abbr,
        phone: result2.data.phone,
        street: result2.data.address.street,
        number: result2.data.address.number,
        district: result2.data.address.district,
        zip: result2.data.address.zip,
        city: result2.data.address.city,
        province: result2.data.address.state,
        country: result2.data.address.country,
        loading: false
      });
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
  handleUpload = async event => {
    let send = {
      email: this.state.email,
      name: this.state.name,
      abbr: this.state.abbr,
      phone: this.state.phone,
      address: {
        street: this.state.street,
        number: this.state.number,
        district: this.state.district,
        zip: this.state.zip,
        city: this.state.city,
        state: this.state.province,
        country: this.state.country
      }
    };
    const result = await Companies.UpdateOne(this.state._id, send);
    if (result.ok) {
      this.props.msg(result.message);
      this.props.onClose();
    } else {
      this.props.msg(result.message);
    }
  };
  handleDelete = async event => {
    this.setState({ MyDelete: false });
    const result = await Companies.DeleteOne(this.state._id, this.state);
    if (result.ok) {
      this.props.msg(result.message);
      this.props.onClose();
    } else {
      this.props.msg(result.message);
    }
  };
  // handleInsert = async () => {
  //   this.setState({ loading: true });
  //   // console.log({ ...this.state });
  //   let send = {
  //     email: this.state.email,
  //     name: this.state.name,
  //     abbr: this.state.abbr,
  //     phone: this.state.phone,
  //     address: {
  //       street: this.state.street,
  //       number: this.state.number,
  //       district: this.state.district,
  //       zip: this.state.zip,
  //       city: this.state.city,
  //       state: this.state.province,
  //       country: this.state.country
  //     }
  //   };
  //   const result = await Companies.InsertOne({
  //     ...send
  //   });
  //   if (result.ok) {
  //     this.props.msg(result.message);
  //     this.handleClose();
  //     // console.log(result);
  //   } else {
  //     this.setState({ loading: false });
  //     // console.log(result);
  //     this.props.msg(result.message);
  //   }
  // };
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
          <Typography variant="h5">Update Clients </Typography>
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
              onChange={this.handleChange("name")}
            />
            <MyItemForm
              label="Abbreviation"
              value={state.abbr}
              onChange={this.handleChange("abbr")}
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
              onChange={this.handleChange("email")}
            />
            <MyItemForm
              label="Phone"
              value={state.phone}
              onChange={this.handleChange("phone")}
            />
            <Grid item xs={4}>
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
                data={this.state.data}
                onChangeText={name => this.setState({ country: name })}
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={40}
            justify="flex-start"
            direction="row"
            alignItems="flex-start"
          >
            <MyItemForm
              label="State/Province"
              value={state.province}
              onChange={this.handleChange("province")}
            />
            <MyItemForm
              label="District"
              value={state.district}
              onChange={this.handleChange("district")}
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
              label="Street"
              value={state.street}
              onChange={this.handleChange("street")}
            />
            <MyItemForm
              label="Number"
              value={state.number}
              onChange={this.handleChange("number")}
            />
            <MyItemForm
              label="Zip"
              value={state.zip}
              onChange={this.handleChange("zip")}
            />
          </Grid>
          {/* <Grid
            container
            spacing={40}
            justify="flex-start"
            direction="row"
            alignItems="flex-start"
          >
            <Grid item xs={4}>
              <FormControl
                variant="filled"
                fullWidth={true}
                className={{ paddingTop: 22.5 }}
              >
                <InputLabel
                  margin="normal"
                  htmlFor="filled-age-native-simple"
                />
                <Select
                  native
                  style={{ paddingTop: 17 }}
                  value={this.state._company_id}
                  onChange={this.handleChange("_company_id")}
                >
                  <option>{"Company"}</option>
                  {this.state.companies.map(item => (
                    <option value={item._id}>{item.name}</option>
                  ))}
                </Select>
              </FormControl>
            </Grid>


          </Grid> */}
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
)(InsertClients);
