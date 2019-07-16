import React, { Fragment } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  IconButton,
  Tooltip
} from "@material-ui/core/";

// import DeleteIcon from "@material-ui/icons/Delete";
import { AddCircle } from "@material-ui/icons";
import EditIcon from "@material-ui/icons/Edit";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import styled from "styled-components";

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy, header } = this.props;
    // console.log("this.props:");
    // console.log(this.props);
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            {/* <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            /> */}
          </TableCell>
          {header.map(
            row => (
              <TableCell
                key={row.id}
                // align={row.numeric ? "right" : "left"}
                align={"left"}
                padding={row.disablePadding ? "none" : "default"}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  }
});
const TitleBar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;
let EnhancedTableToolbar = props => {
  const { numSelected, classes, title } = props;
  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <TitleBar>
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subtitle1">
              {numSelected} selected
            </Typography>
          ) : (
            <Typography variant="h5" id="tableTitle">
              {title}
            </Typography>
          )}
        </div>
        {/* <IconButton style={{ padding: 0, marginTop: 10 }} aria-label="Add">
          <AddCircleOutline style={{ fontSize: 40 }} />
        </IconButton> */}

        <IconButton style={{ padding: 0, marginTop: 10 }} aria-label="Add">
          <AddCircle style={{ fontSize: 40 }} onClick={props.openInsert} />
        </IconButton>
      </TitleBar>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

let ShowMoreButton = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : null}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton aria-label="Edit">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ) : null}
      </div>
    </Toolbar>
  );
};

ShowMoreButton.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
};

ShowMoreButton = withStyles(toolbarStyles)(ShowMoreButton);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    width: "100%"
  },
  tableCell: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "40px"
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

class MyTablePaginate extends React.Component {
  state = {
    order: "asc",
    orderBy: "",
    selected: [],
    // data: Aircrafts,
    page: 0,
    rowsPerPage: 20
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n._id) }));

      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    this.setState({ selected: [] });
    this.props.onChangeItem(id);
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
    this.props.onChangePage(page);
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { data, classes, header, title, rows } = this.props;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.total - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          title={title}
          openInsert={this.props.openInsert}
        />
        <div className={classes.tableWrapper}>
          <Table
            fixedHeader={true}
            className={classes.table}
            minWidth={"450"}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.total}
              header={header}
            />
            <TableBody>
              {stableSort(data.docs, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n._id);
                  // console.log(n);
                  return (
                    <Fragment>
                      <TableRow
                        hover
                        onClick={event => this.handleClick(event, n._id)}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={n.id}
                        selected={isSelected}
                      >
                        <TableCell padding="checkbox">
                          {/* <Checkbox checked={isSelected} /> */}
                        </TableCell>
                        {/* <TableCell alignItems={"flex-start"} align="left">
                          {n.name}
                        </TableCell> */}

                        {rows.map(item => (
                          <TableCell
                            className={classes.tableCell}
                            alignItems={"flex-start"}
                            align="left"
                          >
                            {n[item]}
                          </TableCell>
                        ))}

                        {/* <TableCell className={classes.tableCell} align="left">
                          {n.modelo}
                        </TableCell>
                        <TableCell
                          alignItems={"flex-start"}
                          className={classes.tableCell}
                          align="left"
                        >
                          {n.num_serie}
                        </TableCell> */}
                      </TableRow>
                    </Fragment>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[20]}
          component="div"
          count={data.total}
          rowsPerPage={rowsPerPage}
          page={data.page - 1}
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

MyTablePaginate.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MyTablePaginate);
