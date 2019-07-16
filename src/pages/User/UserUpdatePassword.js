import React, { Component, Fragment } from "react";
import {
  LinearProgress,
  Grid,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  TextField
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { connect } from "react-redux";
import { navigate } from "../../store/ducks/navigate";
import { Creators as CreatorsSnackbar } from "../../store/ducks/snackbar";
import { Container } from "../../components";
import { Users } from "../../services";

class UserUpdatePassword extends Component {
  state = {
    loading: true,
    open: false,
    MyDelete: false,
    email: "",
    name: "",
    equalsError: false,
    passwordNow: false,
    data: []
  };
  componentDidMount = async () => {
    const result = await Users.listMyUser();
    if (result.ok) {
      this.setState({ ...this.state, ...result.data, loading: false });
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
  handleUpdate = async () => {
    this.setState({ loading: true });
    // console.log({ ...this.state });
    const send = {
      password: this.state.password,
      email: this.state.email
    };

    if (this.state.password1 === this.state.password2) {
      const result = await Users.ConfirmPassword(send);
      if (result.ok) {
        // console.log(result);
        this.props.msg(result.message);
        const result2 = await Users.UpdateOne(this.state._id, {
          password: this.state.password1,
          email: this.state.email
        });
        if (result2.ok) {
          this.props.msg(result2.message);
          this.props.onClose();
        } else {
          this.props.msg(result.message);
        }
        this.props.onClose();
      } else {
        this.props.msg(result.message);
      }
      this.setState({ equalsError: false, loading: false });
    } else {
      this.setState({ equalsError: true, loading: false });
      this.props.msg("Your new password are wrong");
    }

    // const result = await Users.UpdateOne({
    //   ...this.state
    // });
    // if (result.ok) {
    //   this.props.msg(result.message);
    //   this.handleClose();
    //   // console.log(result);
    // } else {
    //   this.setState({ loading: false });
    //   // console.log(result);
    //   this.props.msg(result.message);
    // }
  };
  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };
  handleClickShowPassword1 = () => {
    this.setState({ showPassword1: !this.state.showPassword1 });
  };
  handleClickShowPassword2 = () => {
    this.setState({ showPassword2: !this.state.showPassword2 });
  };
  render() {
    // const state = this.state;
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
          <Typography variant="h5">Change your Password</Typography>
          <Grid
            container
            spacing={40}
            justify="flex-start"
            direction="row"
            alignItems="flex-start"
          >
            <Grid item xs={4}>
              <TextField
                label="Your Password now"
                value={this.state.password}
                margin="normal"
                fullWidth={true}
                type={this.state.showPassword ? "text" : "password"}
                onChange={this.handleChange("password")}
                InputProps={{
                  error: this.state.passwordNow,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPassword}
                      >
                        {this.state.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="New Password"
                value={this.state.password1}
                margin="normal"
                fullWidth={true}
                type={this.state.showPassword1 ? "text" : "password"}
                onChange={this.handleChange("password1")}
                InputProps={{
                  error: this.state.equalsError,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPassword1}
                      >
                        {this.state.showPassword1 ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="New Password again"
                value={this.state.password2}
                margin="normal"
                fullWidth={true}
                type={this.state.showPassword2 ? "text" : "password"}
                onChange={this.handleChange("password2")}
                InputProps={{
                  error: this.state.equalsError,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPassword2}
                      >
                        {this.state.showPassword2 ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          </Grid>

          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="baseline"
          >
            <Button color="primary" onClick={this.handleUpdate}>
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
)(UserUpdatePassword);
