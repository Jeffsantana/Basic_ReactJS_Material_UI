import React, { Component } from "react";
import { Page, MyLinearProgress, MySearchBox } from "../../components";
import {
  Grid,
  Paper,
  Typography,
  ButtonBase,
  List,
  ListItem,
  ListItemText,
  Modal
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { constants } from "../../config";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { navigate } from "../../store/ducks/navigate";
import { Creators as CreatorsSnackbar } from "../../store/ducks/snackbar";
import { Users } from "../../services";
import { BeautifulModal } from "../../styles";
import { InsertUsers, UpdateUsers } from "../index";

const useStyles = theme => ({
  root: {
    flexGrow: 1
  },
  modal: {
    overflow: "scroll"
  },
  paper: {
    padding: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2
  },
  image: {
    width: "100%",
    display: "block"
  },
  img: {
    margin: "auto",
    maxWidth: "100%",
    display: "block",
    maxHeight: "20vh"
  }
});
class ListVerifiedUsers extends Component {
  state = {
    loading: true,
    open: false,
    data: [],
    search: "",
    updateId: 0,
    toSearch: 1,
    insert: false,
    edit: false
  };
  componentDidMount = async () => {
    const result = await Users.listPage();
    if (result.ok) {
      this.setState({ data: result.data, loading: false });
    } else {
      this.props.msg(result.message);
    }
  };
  handleClose = async event => {
    this.setState({
      open: false,
      loading: true,
      insert: false,
      edit: false
    });
    const result = await Users.listPage();
    if (result.ok) {
      this.setState({ data: result.data, loading: false });
    }
  };
  openInsert = () => {
    this.setState({ insert: true });
  };
  handleNavigate = route => {
    this.props.navigate(route);
    typeof this.props.closeDrawer === "function" && this.props.closeDrawer();
  };
  handlePages = async page => {
    this.setState({ loading: true });
    if (this.state.search.length > 2) {
      let result = await Users.Search(this.state.search, page + 1);

      if (result.ok) {
        this.setState({ data: result.data, loading: false });
      } else {
        this.props.msg(result.message);
      }
    } else {
      let result = await Users.listPage(page + 1);
      if (result.ok) {
        this.setState({ data: result.data, loading: false });
      }
    }
  };
  handleEdit = async id => {
    this.setState({
      edit: true,
      updateId: id,
      search: "",
      toSearch: 1
    });
  };
  handleSearch = async () => {
    let result = await Users.Search(this.state.search);
    if (result.ok) {
      this.setState({ data: result.data, loading: false });
    } else {
      this.props.msg(result.message);
    }
    if (this.state.search.length === 0) {
      this.handleClose();
    }
  };

  render() {
    const { classes } = this.props;
    if (this.state.loading) {
      return <MyLinearProgress open={this.state.loading} />;
    } else {
      return (
        <Page>
          <MySearchBox
            title={"Search Verified Users"}
            search={item => {
              this.setState({ search: item }, () => {
                this.handleSearch();
              });
            }}
          />
          <div className={classes.root}>
            {this.state.data.docs.map(item => (
              <Paper className={classes.paper}>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid item xs={6}>
                    <Grid
                      container
                      direction="column"
                      justify="flex-start"
                      alignItems="flex-start"
                      xs={12}
                    >
                      <Grid item>
                        <Typography variant="body2" color="textSecondary">
                          Name: {item.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          E-mail: {item.email}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          User name: {item.username}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="flex-end"
                    >
                      <Grid item xs={5}>
                        <List>
                          <ListItem
                            style={{ padding: 0 }}
                            button
                            onClick={() => this.handleEdit(item._id)}
                          >
                            <ExpandMore />
                            <ListItemText inset secondary="See Details" />
                          </ListItem>
                        </List>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={6}>
                    <ButtonBase className={classes.image}>
                      <img
                        className={classes.img}
                        alt="User"
                        src={constants.api + item.image.url}
                      />
                    </ButtonBase>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </div>
          <Modal open={this.state.edit}>
            <BeautifulModal>
              <UpdateUsers
                id={this.state.updateId}
                onClose={close => {
                  this.handleClose();
                }}
              />
            </BeautifulModal>
          </Modal>
          <Modal open={this.state.insert}>
            <BeautifulModal>
              <InsertUsers
                onClose={close => {
                  this.handleClose();
                }}
              />
            </BeautifulModal>
          </Modal>
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
)(withStyles(useStyles)(ListVerifiedUsers));
