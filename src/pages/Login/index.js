import React, { Component, Fragment } from "react";
import {
  Button,
  CircularProgress,
  FormControl,
  Typography,
  Link,
  Modal,
  Input,
  InputLabel,
  InputAdornment,
  IconButton,
  Paper
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import logo from "../../assets/images/logo.png";
import { connect } from "react-redux";
import { RegisterUsers } from "../";
import { BeautifulModal } from "../../styles";
import { Container, ContentForm, Form, Dev, MessageError } from "./styles";
import { Creators as CreatorsAuth } from "../../store/ducks/authentication";
class Login extends Component {
  state = {
    email: "",
    password: "",
    showPassword: false
  };
  handleLogin = () => {
    this.props.login(this.state);
  };
  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };
  openModal = name => event => {
    this.setState({ [name]: true });
  };
  handleClose = event => {
    this.setState({
      RegisterUser: false
    });
  };

  render() {
    return (
      <Fragment>
        <Container style={{ justifyContent: "center", alignItems: "center" }}>
          <Paper>
            <ContentForm>
              <img
                src={logo}
                alt="EyesOn"
                style={{ width: "100%", display: "block" }}
              />
              <Form>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">E-mail</InputLabel>
                  <Input
                    id="email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onKeyDown={event => {
                      if (event.key === "Enter") this.handleLogin();
                    }}
                    onChange={event =>
                      this.setState({ email: event.target.value })
                    }
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    name="password"
                    type={this.state.showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="current-password"
                    onKeyDown={event => {
                      if (event.key === "Enter") this.handleLogin();
                    }}
                    onChange={event =>
                      this.setState({ password: event.target.value })
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword}
                        >
                          {this.state.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleLogin}
                  fullWidth
                >
                  {!this.props.auth.loading ? (
                    "Login"
                  ) : (
                    <CircularProgress
                      size={20}
                      style={{ color: "#fff", padding: 5 }}
                    />
                  )}
                </Button>
              </Form>
              <MessageError>
                {this.props.auth.message && (
                  <div>
                    {" "}
                    {this.props.auth.message}{" "}
                    <p>
                      <Button variant="contained" color="secondary">
                        Forgot your password?
                      </Button>
                    </p>
                  </div>
                )}
              </MessageError>

              <Typography>
                No account?
                <Link button onClick={this.openModal("RegisterUser")}>
                  {" "}
                  Sing Up
                </Link>
              </Typography>
              <Dev>Powered by SantanaJeff</Dev>
            </ContentForm>
          </Paper>
          <Modal open={this.state.RegisterUser}>
            <BeautifulModal>
              <RegisterUsers
                onClose={close => {
                  this.handleClose();
                }}
              />
            </BeautifulModal>
          </Modal>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.authentication
});

const mapDispatchToProps = {
  login: CreatorsAuth.loginResquest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
