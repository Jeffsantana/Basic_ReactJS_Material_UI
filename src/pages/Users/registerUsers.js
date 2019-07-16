import React, { Component, Fragment } from "react";
import { LinearProgress, Grid, Button, Typography } from "@material-ui/core";
import {
  InputAdornment,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  withStyles
} from "@material-ui/core";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  MenuItem,
  Modal
} from "@material-ui/core";
import { connect } from "react-redux";
import { navigate } from "../../store/ducks/navigate";
import { Creators as CreatorsSnackbar } from "../../store/ducks/snackbar";
import { Container, MyItemForm } from "../../components";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Users, Companies } from "../../services";
import { AddCircle } from "@material-ui/icons";
import { colors } from "../../styles";
import { InsertClients } from "../../pages";
import { BeautifulModal } from "../../styles";

const styles = theme => ({
  root: {
    width: "100%",
    alignItems: "flex-start",
    backgroundColor: theme.palette.background.paper,
    marginTop: 20,
    color: colors.primary,
    zIndex: 0
  },
  item: {
    width: "100%",
    alignItems: "flex-start",
    marginLeft: 0,
    marginBottom: 10
  }
});
class registerUsers extends Component {
  state = {
    loading: true,
    open: false,
    email: "",
    password: "",
    companies: [],
    _company_id: "",
    company: "Company",
    InsertClient: false,
    showPassword: false
  };
  componentDidMount = async () => {
    this.setState({ loading: false });
    // const result = await Companies.listPage();
    // if (result.ok) {
    //   this.setState({ companies: result.data.docs, loading: false });
    // } else {
    //   this.props.msg(result.message);
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
  handleInsert = async () => {
    this.setState({ loading: true });
    // console.log({ ...this.state });
    const result = await Users.InsertOne({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      username: this.state.username,
      role: this.state.role,
      phone: this.state.phone,
      relatecompany: this.state.relatedcompany
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
  handleClickList = () => {
    this.setState(state => ({ open: !state.open }));
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
          <Typography variant="h5">Register</Typography>
          <Grid
            container
            spacing={40}
            justify="space-between"
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
            <Grid item xs={4}>
              <TextField
                label="Password"
                value={this.state.password}
                margin="normal"
                fullWidth={true}
                type={this.state.showPassword ? "text" : "password"}
                onChange={this.handleChange("password")}
                InputProps={{
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
          </Grid>
          <Grid
            container
            spacing={40}
            justify="flex-start"
            direction="row"
            alignItems="flex-start"
          >
            <MyItemForm
              label="User Name"
              value={state.username}
              onChange={this.handleChange("username")}
            />
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
            <MyItemForm
              label="Your Company"
              value={state.relatecompany}
              onChange={this.handleChange("relatecompany")}
            />
            <MyItemForm
              label="Phone"
              value={state.phone}
              onChange={this.handleChange("phone")}
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
)(withStyles(styles)(registerUsers));
