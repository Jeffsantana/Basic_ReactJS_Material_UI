import React, { Component } from "react";
import { Page } from "../../components";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { ServiceExcel } from "../../services";
import {
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogTitle,
  Paper,
  LinearProgress
} from "@material-ui/core";
import { connect } from "react-redux";
import { navigate } from "../../store/ducks/navigate";
import { Creators as CreatorsSnackbar } from "../../store/ducks/snackbar";

class UploadDB extends Component {
  state = {
    loaded: 0,
    loading: false,
    open: false,
    LinearProgress: false,
    file: { name: false }
  };

  handleselectedFile = event => {
    this.setState({
      file: event.target.files[0],
      loaded: 0,
      loading: true,
      open: true,
      result: false
    });
    // console.log(this.state.file);
  };

  handleClose = event => {
    this.setState({
      open: false,
      file: false
    });
  };
  handleUpload = async event => {
    this.setState({
      LinearProgress: true
    });
    const data = new FormData();
    data.append("excelFile", this.state.file);
    // data.append("excelFile", "");
    // data.append('filename', this.fileName.value);
    const result = await ServiceExcel.post("/upload-excel", data);
    // console.log("result:");
    // console.log(result);
    if (result) {
      this.setState({
        LinearProgress: false,
        result: result.data.message
      });
    }
  };

  handleNavigate = route => {
    this.props.navigate(route);
    typeof this.props.closeDrawer === "function" && this.props.closeDrawer();
  };

  render() {
    return (
      <Page>
        <Paper alignItems="center">
          <div
            style={{
              display: "flex",
              height: 400,
              width: "100%",
              backgroundColor: "white",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <input
              accept="/*.xlsx"
              name="excelFile"
              onChange={this.handleselectedFile}
              style={{ display: "none" }}
              id="raised-button-file"
              multiple
              type="file"
            />
            {/* <label htmlFor="raised-button-file">
              <Button
                variant="contained"
                component="span"
                justify="center"
                alignItems="center"
                style={{ display: "flex" }}
              >
                Choose a new Database (excel)
                <CloudUploadIcon />
              </Button>
            </label> */}

            <label htmlFor="raised-button-file">
              <ButtonBase
                component="span"
                variant="contained"
                style={{ flexDirection: "column" }}
              >
                <CloudUploadIcon style={{ fontSize: 70, color: "blue" }} />
                <span style={{ fontSize: 20, color: "blue" }}>
                  Choose a new Database (excel)
                </span>
              </ButtonBase>
            </label>
          </div>

          <Dialog open={this.state.open}>
            <DialogTitle> {this.state.file.name}</DialogTitle>
            <DialogActions>
              <Button color="primary" onClick={this.handleUpload}>
                Save
              </Button>
              <Button color="secondary" onClick={this.handleClose}>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog open={this.state.LinearProgress}>
            <LinearProgress style={{ width: 200 }} />
          </Dialog>
          <Dialog open={this.state.result}>
            <DialogTitle> {this.state.result}</DialogTitle>
            <DialogActions>
              <Button
                color="primary"
                onClick={() => {
                  this.handleNavigate("/");
                }}
              >
                return
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </Page>
    );
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
)(UploadDB);
