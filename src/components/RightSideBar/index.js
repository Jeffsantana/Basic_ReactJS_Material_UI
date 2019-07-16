import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { AddCircle } from "@material-ui/icons";
import { colors } from "../../styles";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar
} from "@material-ui/core";
import { Paper, Modal, withStyles } from "@material-ui/core";
import { BeautifulModal } from "../../styles";
import { InsertUsers } from "../../pages";
import { MyModal, MyLinearProgress } from "../index";
// import { Aircrafts } from "../../services";
import { connect } from "react-redux";
import { navigate } from "../../store/ducks/navigate";
import { Creators as CreatorsSnackbar } from "../../store/ducks/snackbar";

const styles = theme => ({
  root: {
    maxWidth: 335,
    margin: 20,
    color: colors.primary
  },
  item: {
    marginBottom: 10
  }
});

// function AlignItemsList(this.props) {
class AlignItemsList extends Component {
  state = {
    loading: false,
    InsertUser: false,
    InsertNote: false,
    Insert: false
  };

  openModal = name => event => {
    this.setState({ [name]: true });
  };
  handleClose = event => {
    this.setState({
      InsertUser: false,
      InsertNote: false,
      Insert: false,
      loading: false
    });
  };

  render() {
    const { classes } = this.props;
    if (this.state.loading) {
      return <MyLinearProgress open={this.state.loading} />;
    } else {
      return (
        <Fragment>
          <List className={classes.root}>
            <Paper className={classes.item}>
              <ListItem button onClick={this.openModal("InsertUser")}>
                <ListItemAvatar>
                  <AddCircle />
                </ListItemAvatar>
                <ListItemText inset primary="User" />
              </ListItem>
            </Paper>
            <Paper className={classes.item}>
              <ListItem button onClick={this.openModal("Insert")}>
                <ListItemAvatar>
                  <AddCircle />
                </ListItemAvatar>
                <ListItemText inset primary="Note" />
              </ListItem>
            </Paper>
          </List>

          <Modal open={this.state.InsertUser}>
            <BeautifulModal>
              <InsertUsers
                onClose={close => {
                  this.handleClose();
                }}
              />
            </BeautifulModal>
          </Modal>
          <Modal open={this.state.Insert}>
            <BeautifulModal>
              <MyModal
                onInsert={toSend => {
                  this.handleInsert(toSend);
                }}
                onClose={close => {
                  this.handleClose();
                }}
              />
            </BeautifulModal>
          </Modal>
        </Fragment>
      );
    }
  }
}

AlignItemsList.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({});
const mapDispatchToProps = {
  navigate,
  msg: CreatorsSnackbar.showSimple
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AlignItemsList));
