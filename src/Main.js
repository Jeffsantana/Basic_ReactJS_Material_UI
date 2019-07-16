import React, { Fragment } from "react";
import { SnackbarError, Snackbar } from "./components";
import { connect } from "react-redux";
import { Creators as CreatorsSnackbar } from "./store/ducks/snackbar";
import AuthOrApp from "./AuthOrApp";

const Main = props => (
  <Fragment>
    <Snackbar
      error={props.snackbar.simple}
      message={props.snackbar.simple_message}
      onClose={() => props.onCloseSimple()}
    />
    <SnackbarError
      error={props.snackbar.error}
      message={props.snackbar.error_message}
      onClose={() => props.onCloseError()}
    />
    <AuthOrApp />
  </Fragment>
);

const mapStateToProps = state => ({
  snackbar: state.snackbar,
  auth: state.autentication
});

const mapDispatchToProps = {
  onCloseError: CreatorsSnackbar.closeError,
  onCloseSimple: CreatorsSnackbar.closeSimple
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
