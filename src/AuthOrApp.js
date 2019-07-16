import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Login from "./pages/Login";
import App from "./App";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Creators as CreatorsAuth } from "./store/ducks/authentication";
import { Container } from "./components";
import { GlobalStyle } from "./styles";
import { api } from "./services";

class AuthOrApp extends Component {
  componentDidMount() {
    let { token } = this.props.auth;
    this.props.validateToken(token);
  }

  render() {
    const { user, validToken } = this.props.auth;

    if (user && validToken) {
      api.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
      return <App>{this.props.children}</App>;
    } else if (!user && !validToken) {
      return (
        <Fragment>
          <GlobalStyle />
          <Container>
            <Login />
          </Container>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <GlobalStyle />
          <Container
            style={{
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <CircularProgress size={50} />
          </Container>
        </Fragment>
      );
    }
  }
}

const mapStateToProps = state => ({
  auth: state.authentication
});

const mapDispatchToProps = {
  validateToken: CreatorsAuth.validateToken
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthOrApp);
