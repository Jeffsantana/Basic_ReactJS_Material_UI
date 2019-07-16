import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  ListItemAvatar,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse
} from "@material-ui/core";
import {
  People,
  VerifiedUser,
  PersonAdd,
  AllInclusive,
  ExpandLess,
  ExpandMore
} from "@material-ui/icons";
import { navigate } from "../../store/ducks/navigate";
import { constants } from "../../config";
const styles = {
  root: {},
  nested: {}
};

class SideList extends Component {
  state = {
    open: false,
    sanitize: false,
    selectedIndex: null,
    url: ""
  };

  componentDidMount = () => {};
  componentWillMount() {
    let pathname = window.location.pathname;
    switch (pathname) {
      case "/schedule":
        this.setState({ selectedIndex: 1 });
        break;
      default:
        break;
    }
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleNavigate = route => {
    this.props.navigate(route);
    typeof this.props.closeDrawer === "function" && this.props.closeDrawer();
  };

  handleListItemClick = index => {
    this.setState({ selectedIndex: index });
  };

  render() {
    return (
      <div style={styles.root}>
        <List component="nav" style={{ minWidth: 250 }}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt={this.props.auth.user.user.name}
                src={constants.api + this.props.auth.user.user.image.url}
              />
            </ListItemAvatar>
            <ListItemText
              secondary={
                <Fragment>
                  <Typography component="span" color="textPrimary">
                    {this.props.auth.user.user.name}
                  </Typography>
                  <Typography component="span" color="textSecondary">
                    {this.props.auth.user.user.username}
                  </Typography>
                </Fragment>
              }
            />
          </ListItem>

          <ListItem button onClick={this.handleClick}>
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText inset primary="Users" />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                selected={this.state.selectedIndex === 1}
                style={styles.nested}
                onClick={() => {
                  this.handleNavigate("/pending-users");
                  this.handleListItemClick(1);
                }}
              >
                <ListItemIcon>
                  <PersonAdd />
                </ListItemIcon>
                <ListItemText inset primary="Pending Users" />
              </ListItem>
              <ListItem
                button
                selected={this.state.selectedIndex === 2}
                style={styles.nested}
                onClick={() => {
                  this.handleNavigate("/verified-users");
                  this.handleListItemClick(2);
                }}
              >
                <ListItemIcon>
                  <VerifiedUser />
                </ListItemIcon>
                <ListItemText inset primary="Verified User" />
              </ListItem>
              <ListItem
                button
                selected={this.state.selectedIndex === 3}
                style={styles.nested}
                onClick={() => {
                  this.handleNavigate("/all-users");
                  this.handleListItemClick(3);
                }}
              >
                <ListItemIcon>
                  <AllInclusive />
                </ListItemIcon>
                <ListItemText inset primary="All Users" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.authentication,
  sanitize: state.manufecture,
  model: state.vincimodel
});

const mapDispatchToProps = {
  navigate
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideList);
