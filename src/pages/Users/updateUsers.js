import React, { Component, Fragment } from "react";
import { LinearProgress, Grid, Button, Typography } from "@material-ui/core";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { connect } from "react-redux";
import { navigate } from "../../store/ducks/navigate";
import { Creators as CreatorsSnackbar } from "../../store/ducks/snackbar";
import { Container, MyDeleteAlert, MyItemForm } from "../../components";
import { Users, Companies } from "../../services";

class updateUser extends Component {
  state = {
    loading: true,
    open: false,
    MyDelete: false,
    password: "",
    companies: [],
    _company_id: "",
    showPassword: false
  };
  componentDidMount = async () => {
    const result = await Users.listOne(this.props.id);
    if (result.ok) {
      this.setState({ ...this.state, ...result.data, loading: false });
    }
    // const result2 = await Companies.listPage();
    // // console.log("result:");
    // // console.log(result);
    // if (result2.ok) {
    //   this.setState({ companies: result2.data.docs, loading: false });
    // } else {
    //   this.props.msg(result2.message);
    // }
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
    const send = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      username: this.state.username,
      role: this.state.role,
      phone: this.state.phone,
      _company_id: this.state._company_id,
      profile: this.state.profile
    };
    const result = await Users.UpdateOne(this.state._id, send);
    if (result.ok) {
      this.props.msg(result.message);
      this.props.onClose();
    } else {
      this.props.msg(result.message);
    }
  };
  handleDelete = async event => {
    this.setState({ MyDelete: false });
    const result = await Users.DeleteOne(this.state._id, this.state);
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
          <Typography variant="h5">Update User</Typography>
          <Grid
            container
            spacing={40}
            justify="flex-start"
            direction="row"
            alignItems="flex-start"
          >
            <MyItemForm
              label="Name"
              value={state.name}
              onChange={this.handleChange("name")}
            />
            <MyItemForm
              label="Email"
              value={state.email}
              onChange={this.handleChange("email")}
            />
            <MyItemForm
              label="User Name"
              value={state.username}
              onChange={this.handleChange("username")}
            />
          </Grid>
          <Grid
            container
            spacing={40}
            justify="space-between"
            direction="row"
            alignItems="flex-start"
          >
            <Grid item xs={4}>
              <FormControl
                variant="filled"
                fullWidth={true}
                className={{ paddingTop: 22.5 }}
              >
                <InputLabel margin="normal" htmlFor="filled-age-native-simple">
                  {" "}
                  Pending
                </InputLabel>
                <Select
                  style={{ paddingTop: 17 }}
                  value={this.state.pending}
                  onChange={this.handleChange("pending")}
                >
                  <MenuItem value={true}>True</MenuItem>
                  <MenuItem value={false}>False</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <MyItemForm
              label="Role"
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
            <MyItemForm
              label="Phone"
              value={state.phone}
              onChange={this.handleChange("phone")}
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
)(updateUser);
