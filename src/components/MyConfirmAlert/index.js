import React, { Component } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Grid,
  Modal,
  Button
} from "@material-ui/core";
// import { Container } from "../../components";
import Error from "@material-ui/icons/Error";
// import { BeautifulModal } from "../../styles";
import MyConfirmAlertStyle from "./styles";

class MyConfirmAlert extends Component {
  handleOnConfirm = () => {
    // console.log("chegou no delete confirm");
    this.props.onResultConfirm();
  };
  handleOnCancel = () => {
    // console.log("chegou no delete cancel");
    this.props.onResultCancel();
  };
  // this.props.onResult(); this.props.onClose
  render() {
    return (
      <Modal open={this.props.open}>
        <Dialog open={this.props.open}>
          <DialogContent style={{ paddingBottom: 0, paddingTop: 12 }}>
            <MyConfirmAlertStyle>
              <Error style={{ fontSize: 150, color: "red" }} />

              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item>
                  <Typography variant={"h5"}>Are you sure?</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="Subheading">
                    You may lose data permanentely
                  </Typography>
                </Grid>
                {/* <Grid item>
                  <Typography variant="Subheading">
                    from the database
                  </Typography>
                </Grid> */}
              </Grid>
            </MyConfirmAlertStyle>
          </DialogContent>
          <DialogActions style={{ paddingTop: 0 }}>
            <Button color="primary" onClick={this.props.onResultConfirm}>
              Confirm
            </Button>
            <Button color="secondary" onClick={this.props.onResultCancel}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Modal>
    );
  }
}

export default MyConfirmAlert;
