import React, { Component } from "react";
import { Page, MyConfirmAlert, MyLinearProgress } from "../../components";
import { Users, UploadAvatar } from "../../services";
import {
  Grid,
  Avatar,
  TextField,
  Button,
  Modal,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent
} from "@material-ui/core";
import { connect } from "react-redux";
import { navigate } from "../../store/ducks/navigate";
import { Creators as CreatorsSnackbar } from "../../store/ducks/snackbar";
import { Creators as CreatorsAuth } from "../../store/ducks/authentication";
import { constants } from "../../config";
import { BeautifulModal } from "../../styles";
import { UserUpdatePassword } from "../index";

class User extends Component {
  state = {
    loading: true,
    open: false,
    LinearProgress: false,
    MyConfirm: false,
    MyPassword: false,
    name: "",
    email: "",
    username: "",
    fullUrl: "",
    file: "",
    file2: { name: false }
  };
  componentDidMount = async () => {
    const result = await Users.listMyUser();
    if (result.ok) {
      this.setState({
        ...this.state,
        ...result.data,
        fullUrl: constants.api + result.data.image.url,
        loading: false
      });
    }
    // this.setState({...this.state,...this.props.auth.user.user,url:constants.api+this.props.auth.user.user.image.url})
  };
  handleClose = event => {
    this.setState({
      MyConfirm: false,
      MyPassword: false,
      open: false,
      file: "",
      file2: { name: false }
    });
  };
  handleOpen = event => {
    this.setState({ MyConfirm: true });
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  handleNavigate = route => {
    this.props.navigate(route);
    typeof this.props.closeDrawer === "function" && this.props.closeDrawer();
  };
  handleConfirm = () => {
    this.handleNavigate("/");
  };
  handleselectedFile = async event => {
    await this.setState({
      file: URL.createObjectURL(event.target.files[0]),
      file2: event.target.files[0],
      loaded: 0,
      open: true
    });
  };
  handleUpload = async () => {
    this.setState({
      loading: true
    });
    const data = new FormData();
    data.append("file", this.state.file2);
    const result = await UploadAvatar.post("/image-user", data);
    if (result) {
      this.props.msg(result.data.message + result.data.user.name);
      this.setState({
        fullUrl: constants.api + result.data.user.image.url,
        url: result.data.user.image.url
      });
      // this.props.setUser({...result.data.user})
    } else {
      this.props.msg(result.data.message);
      this.setState({ loading: false, open: false });
    }
    const result2 = await Users.listMyUser();
    console.log(result2);
    if (result2.ok) {
      this.setState({
        ...this.state,
        ...result2.data,
        fullUrl: constants.api + result2.data.image.url
      });
      this.props.setUser({ ...result2.data });
      this.setState({ loading: false, open: false });
    }
  };
  handleUpdate = async () => {
    const result = await Users.UpdateOne(this.state._id, this.state);
    // console.log(result);
    if (result.ok) {
      this.props.msg(result.message);
      this.props.setUser({ ...result.data });
      this.handleNavigate("/");
    } else {
      this.props.msg(result.message);
    }
  };
  render() {
    const state = this.state;
    if (this.state.loading) {
      return <MyLinearProgress open={this.state.loading} />;
    } else {
      return (
        <Page>
          <Grid
            container
            spacing={40}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={this.handleselectedFile}
              style={{ display: "none" }}
              id="raised-button-file"
            />
            <label htmlFor="raised-button-file">
              <Grid item xs={8} sm={4}>
                <Avatar
                  src={this.state.fullUrl}
                  style={{ margin: 30, width: 200, height: 200 }}
                />
              </Grid>
            </label>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                value={state.name}
                margin="normal"
                fullWidth={true}
                onChange={this.handleChange("name")}
              />
              <TextField
                label="Email"
                value={state.email}
                margin="normal"
                fullWidth={true}
                onChange={this.handleChange("email")}
              />
              <TextField
                label="Username"
                value={state.username}
                margin="normal"
                fullWidth={true}
                onChange={this.handleChange("username")}
              />
            </Grid>
          </Grid>

          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="baseline"
          >
            <Button
              color="inherit"
              onClick={() => {
                this.setState({ MyPassword: true });
              }}
            >
              Change your password
            </Button>
            <Button color="primary" onClick={this.handleUpdate}>
              Save
            </Button>
            <Button color="secondary" onClick={this.handleOpen}>
              Cancel
            </Button>
          </Grid>
          <Modal open={this.state.MyPassword}>
            <BeautifulModal>
              <UserUpdatePassword
                id={this.state.updateId}
                onClose={close => {
                  this.handleClose();
                }}
              />
            </BeautifulModal>
          </Modal>
          <MyConfirmAlert
            onResultConfirm={() => {
              this.handleConfirm();
            }}
            onResultCancel={this.handleClose}
            open={this.state.MyConfirm}
          />
          <Dialog open={this.state.open}>
            <Grid container justify="center">
              <Avatar
                id="tmp"
                src={this.state.file}
                style={{ margin: 20, width: 200, height: 200 }}
              />
            </Grid>
            <DialogTitle>
              <Grid container justify="center">
                {this.state.file2.name}
              </Grid>
            </DialogTitle>
            <DialogContent style={{ alignItems: "center" }}>
              <Grid container justify="center">
                Are tou sure?
              </Grid>
              <Grid container justify="center">
                this operation can not be undone
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={this.handleUpload}>
                Save
              </Button>
              <Button color="secondary" onClick={this.handleClose}>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Page>
      );
    }
  }
}

const mapStateToProps = state => ({
  auth: state.authentication
  // sanitize: state.manufecture
});

const mapDispatchToProps = {
  navigate,
  msg: CreatorsSnackbar.showSimple,
  setUser: CreatorsAuth.setUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
