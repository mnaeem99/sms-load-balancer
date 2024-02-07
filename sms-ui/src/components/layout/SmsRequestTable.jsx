import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@material-ui/core/Grid";
import TablePagination from "@material-ui/core/TablePagination";

const useStyles = makeStyles({
  table: {
    minWidth: "90%",
  },
  delete: {
    color: "#ff0011",
    //   marginLeft:45
  },
  button1: {
    width: 20,
    height: 20,
    padding: 0,
  },
  button2: {
    width: 40,
    height: 20,
    padding: 0,
  },
  icon: {
    width: 64,
    height: 64,
  },
  MuiTableRowroot: {
    fontWeight: "bold !important",
    fontSize: "17px !important",
  },
});

function SmsRequestTable({
  data,
  setSize,
  setPageNumber,
  totalElements,
  setSearchKeyword,
  searchKeyword,
}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPageNumber(newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageNumber(0);
    setPage(0);
    setRowsPerPage(event.target.value);
    setSize(event.target.value);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, totalElements - page * rowsPerPage);

  const labelDisplayedRows = ({ from, to, count }) => {
    return `Showing ${from}-${to} of ${count} entries`;
  };
  return (
    <Grid
      style={{
        marginLeft: "auto",
        marginRight: "auto",
      }}
      xs={11}
    >
      <Grid
        spacing={1}
        container
        xs={12}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Grid item lg={9} xs={12} md={9} sm={12}>
          {" "}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            className="page"
            count={totalElements}
            style={{
              display: "flex",
              width: "100% !important",
            }}
            rowsPerPage={rowsPerPage}
            labelDisplayedRows={labelDisplayedRows}
            page={page}
            SelectProps={{
              SelectDisplayProps: {
                style: { alignSelf: "flex-end" },
              },
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
        <Grid item lg={3} xs={12} md={4} sm={12}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              onChange={(e) => setSearchKeyword(e.target.value)}
              value={searchKeyword}
              id="standard-basic"
              placeholder="Search"
              label="Standard"
              name="search"
              className="inputstyle-two"
              fullWidth
            />
            <div class="icon-container">
              <img
                src="/search.svg"
                alt=""
                style={{
                  width: "22px",
                  marginLeft: "-50px",
                }}
              />
            </div>
          </div>
        </Grid>
      </Grid>
      <br />
      <TableContainer
        className={classes.rootTable}
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          background: "#FFFFFF",
          boxShadow: "-1px 0px 20px 1px rgba(0, 0, 0, 0.1)",
          borderRadius: "20px",
          width: "100%",
        }}
      >
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                className={classes.MuiTableRowroot}
                style={{ borderBottom: "2px solid gray" }}
              >
                Client
              </TableCell>
              <TableCell
                className={classes.MuiTableRowroot}
                style={{ borderBottom: "2px solid gray" }}
              >
                Phone
              </TableCell>
              <TableCell
                className={classes.MuiTableRowroot}
                style={{ borderBottom: "2px solid gray" }}
              >
                Message
              </TableCell>
              <TableCell
                className={classes.MuiTableRowroot}
                style={{ borderBottom: "2px solid gray" }}
              >
                Sent At
              </TableCell>
              <TableCell
                className={classes.MuiTableRowroot}
                style={{ borderBottom: "2px solid gray" }}
              >
                Status
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.map((row) => (
              <TableRow key={row._id}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ borderBottom: "none" }}
                >
                  {row.appId}
                </TableCell>
                <TableCell style={{ borderBottom: "none" }}>
                  {row.phone}
                </TableCell>
                <TableCell style={{ borderBottom: "none" }}>
                  {row.message}
                </TableCell>
                <TableCell style={{ borderBottom: "none" }}>
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  }).format(new Date(row?.createdAt))}
                </TableCell>
                <TableCell style={{ borderBottom: "none" }}>
                  {row.status}
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default SmsRequestTable;
