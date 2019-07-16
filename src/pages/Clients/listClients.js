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
import { Companies } from "../../services";
import { BeautifulModal } from "../../styles";
import { InsertClients, UpdateClients } from "../index";

const headerTable = [
  {
    id: "asc",
    numeric: false,
    disablePadding: false,
    label: "Name"
  },
  { id: "COUNTRY", numeric: false, disablePadding: false, label: "Country" }
  // { id: "ROLE", numeric: false, disablePadding: false, label: "Role" },
  // { id: "ROLE", numeric: false, disablePadding: false, label: "Role" },
  // { id: "Company", numeric: false, disablePadding: false, label: "Company" }
];
const rowsTable = ["name", "country"];
class ListClients extends Component {
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
    const result = await Companies.listPage();
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
    const result = await Companies.listPage();
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
      let result = await Companies.Search(this.state.search, page + 1);

      if (result.ok) {
        // console.log(result);
        this.setState({ data: result.data, loading: false });
      } else {
        this.props.msg(result.message);
      }
    } else {
      let result = await Companies.listPage(page + 1);
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
    let result = await Companies.Search(this.state.search);
    if (result.ok) {
      // console.log(result);
      this.setState({ data: result.data, loading: false });
    } else {
      this.props.msg(result.message);
    }
    if (this.state.search.length === 0) {
      this.setState({ loading: false });
      this.handleClose();
    }
  };
  // handleInsert = async toSend => {
  //   this.setState({ insert: false, loading: true });
  //   const result = await Users.InsertOne(toSend);
  //   if (result.ok) {
  //     this.props.msg(result.message);
  //     // this.props.onClose();
  //     this.handleClose();
  //   } else {
  //     console.log(result);
  //     this.props.msg(result.message);
  //     this.handleClose();
  //   }
  // };

  render() {
    const { data } = this.state;
    // console.log(data);
    if (this.state.loading) {
      return <MyLinearProgress open={this.state.loading} />;
    } else {
      return (
        <Page>
          <MySearchBox
            title={"Search Clients"}
            search={item => {
              this.setState({ search: item }, () => {
                this.handleSearch();
              });
            }}
          />
          <MyTablePaginate
            header={headerTable}
            data={data}
            title={"Clients"}
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
              <UpdateClients
                id={this.state.updateId}
                onClose={close => {
                  this.handleClose();
                }}
              />
            </BeautifulModal>
          </Modal>
          <Modal open={this.state.insert}>
            <BeautifulModal>
              <InsertClients
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
)(ListClients);
