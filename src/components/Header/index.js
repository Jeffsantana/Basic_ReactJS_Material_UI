import React, { Component } from "react";
import {
  Hidden,
  Menu,
  MenuItem,
  Grid,
  Typography,
  Toolbar,
  AppBar,
  SwipeableDrawer,
  IconButton,
  ButtonBase
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import LeftSideBar from "../LeftSideBar";
import { connect } from "react-redux";
import { colors } from "../../styles";
import { navigate } from "../../store/ducks/navigate";
import { Creators as CreatorsAuth } from "../../store/ducks/authentication";
// import { setSystem } from '../actions/systemActions';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      drawer: false
    };
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleNavigate = route => {
    this.props.navigate(route);
    typeof this.props.closeDrawer === "function" && this.props.closeDrawer();
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleLogout = event => {
    this.props.logout();
  };
  handleProfile = event => {
    this.handleNavigate("/user");
    this.handleClose();
  };

  render() {
    return (
      <div style={styles.root}>
        <AppBar
          style={{
            backgroundColor: colors.primary,
            justifyContent: "center",
            alignItems: "center"
          }}
          position="static"
        >
          <Toolbar style={{ maxWidth: 1300, width: "100%" }}>
            <Hidden mdUp>
              <IconButton
                style={styles.menuButton}
                color="inherit"
                aria-label="Menu"
                onClick={() => this.setState({ drawer: !this.state.drawer })}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Grid container>
              <ButtonBase
                onClick={() => this.props.navigate("/")}
                style={{ padding: 10, borderRadius: 5 }}
              >
                <Typography variant="title" color="inherit">
                  ReactJS and Material-UI
                </Typography>
              </ButtonBase>
            </Grid>
            <Grid container alignItems="flex-end" justify="flex-end">
              <IconButton
                color="inherit"
                onClick={event => this.handleClick(event)}
                aria-owns={this.state.anchorEl ? "simple-menu" : null}
                aria-haspopup="true"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={this.state.anchorEl}
                open={Boolean(this.state.anchorEl)}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleProfile}>Profile</MenuItem>
                <MenuItem
                  onClick={() => {
                    this.handleLogout();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </Grid>
          </Toolbar>
        </AppBar>
        <SwipeableDrawer
          open={this.state.drawer}
          onClose={() => this.setState({ drawer: false })}
          onOpen={() => this.setState({ drawer: true })}
        >
          <div tabIndex={0} role="button">
            <LeftSideBar
              navigate={this.props.navigate}
              closeDrawer={() => this.setState({ drawer: false })}
            />
            {/* <RightSideBar/> */}
            {/* <SideList /> */}
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  system: state.systemReducer
});

// const mapDispatchToProps = {
//   navigate
//   // setSystem
// };
const mapDispatchToProps = {
  navigate,
  logout: CreatorsAuth.logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

const styles = {
  root: {
    flexGrow: 1,
    position: "fixed",
    zIndex: 2,
    width: "100%"
  },
  flex: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};
