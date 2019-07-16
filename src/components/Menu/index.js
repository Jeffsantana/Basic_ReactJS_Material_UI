import React from "react";
import { Hidden } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Routes from "../../routes";
import { colors } from "../../styles";
import { RightSideBar, LeftSideBar } from "../index";
const drawerWidth = 280;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: "100%",
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    maxWidth: 1300,
    margin: "0 auto"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 10
  },
  hide: {
    display: "none"
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 2px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: colors.main,
    flex: 1,
    overflow: "auto"
  },
  img: {},
  perfil: {
    marginRight: 10
  }
});

class MiniDrawer extends React.Component {
  state = {
    open: true,
    anchorEl: null
  };

  handleResize = () => {
    // this.setState({
    //     windowHeight: window.innerHeight,
    //     windowWidth: window.innerWidth
    // })
    if (window.innerWidth < 800) this.setState({ open: false });
    if (window.innerWidth > 800) this.setState({ open: true });
  };
  componentWillMount() {
    this.handleResize();
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    // this.handleResize();
    window.removeEventListener("resize", this.handleResize);
  }

  handleDrawerOpen = () => {
    this.setState({ open: !this.state.open });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Hidden smDown>
          <div
            style={{ width: 280, background: colors.main, overflow: "auto" }}
          >
            <div className={classes.toolbar} />
            <LeftSideBar />
          </div>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Routes />
        </main>
        <Hidden smDown>
          <div
            style={{ width: 280, padding: 10, paddingTop: 20, paddingLeft: 0 }}
          >
            <div className={classes.toolbar} />
            <RightSideBar />
          </div>
        </Hidden>
        <div />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MiniDrawer);
