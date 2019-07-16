import React, { Component } from "react";
import {
  Page,
  MyLinearProgress,
  MyTablePaginate,
  MySearchBox
} from "../../components";
import { Modal } from "@material-ui/core";
import { connect } from "react-redux";
import { navigate } from "../../store/ducks/navigate";
import { Creators as CreatorsSnackbar } from "../../store/ducks/snackbar";
import { Users } from "../../services";
import { BeautifulModal } from "../../styles";
import { InsertUsers, UpdateUsers } from "../index";

const headerTable = [
  {
    id: "asc",
    numeric: false,
    disablePadding: false,
    label: "Name"
  },
  { id: "EMAIL", numeric: false, disablePadding: false, label: "E-mail" },
  { id: "Company", numeric: false, disablePadding: false, label: "Company" }
];
const rowsTable = ["name", "email", "company"];
class ListPendingUsers extends Component {
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
    const result = await Users.listPendingPage();
    // console.log("result:");
    // console.log(result);
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
    const result = await Users.listPendingPage();
    if (result.ok) {
      this.setState({ data: result.data, loading: false });
    }
  };
  openInsert = () => {
    // console.log("openInsert");
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
        // console.log(result);
        this.setState({ data: result.data, loading: false });
      } else {
        this.props.msg(result.message);
      }
    } else {
      let result = await Users.listPendingPage(page + 1);
      if (result.ok) {
        // console.log(this.state.data);
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
    // console.log("this.state.search");
    // console.log(this.state.search);
    let result = await Users.Search(this.state.search);
    if (result.ok) {
      // console.log(result);
      this.setState({ data: result.data, loading: false });
    } else {
      this.props.msg(result.message);
    }
    if (this.state.search.length === 0) {
      this.handleClose();
    }
  };


  render() {
    const { data } = this.state;
    // console.log(data);
    if (this.state.loading) {
      return <MyLinearProgress open={this.state.loading} />;
    } else {
      return (
        <Page>
          <MySearchBox
            title={"Search Users"}
            search={item => {
              this.setState({ search: item }, () => {
                this.handleSearch();
              });
            }}
          />
          <MyTablePaginate
            header={headerTable}
            data={data}
            title={"Pending Users"}
            rows={rowsTable}
            onChangePage={page => {
              this.handlePages(page);
            }}
            onChangeItem={id => {
              this.handleEdit(id);
            }}
            openInsert={() => {
              this.openInsert();
            }}
          />
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
                // onInsert={toSend => {
                //   this.handleInsert(toSend);
                // }}
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
)(ListPendingUsers);
