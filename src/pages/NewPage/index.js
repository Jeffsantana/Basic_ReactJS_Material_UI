import React, { Component } from "react";
import { Page, MyLinearProgress } from "../../components";
import { Paper } from "@material-ui/core";
import { connect } from "react-redux";
import { navigate } from "../../store/ducks/navigate";
import { Creators as CreatorsSnackbar } from "../../store/ducks/snackbar";

class NewPage extends Component {
  state = {
    loading: false,
    open: false,
    LinearProgress: false
  };

  handleClose = event => {
    this.setState({
      open: false,
      file: false
    });
  };

  handleNavigate = route => {
    this.props.navigate(route);
    typeof this.props.closeDrawer === "function" && this.props.closeDrawer();
  };

  render() {
    if (this.state.loading) {
      return <MyLinearProgress open={this.state.loading} />;
    } else {
      return (
        <Page>
          <Paper>
            <h2>New Page</h2>
          </Paper>
        </Page>
      );
    }
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  navigate,
  msg: CreatorsSnackbar.showSimple
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPage);
