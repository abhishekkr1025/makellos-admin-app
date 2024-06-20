import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TableSortLabel
} from '@mui/material';
import { format } from 'date-fns';
import { useStyles } from './styles'; // Adjust the path as per your project structure

const BasicTable = ({ rows, onRowClick }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('userID');
  const [order, setOrder] = useState('asc');

  // Define stableSort function first
  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      return order;
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property) => {
    const isAscending = orderBy === property && order === 'asc';
    setOrderBy(property);
    setOrder(isAscending ? 'desc' : 'asc');
  };

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const sortedRows = stableSort(rows, getComparator(order, orderBy));

  const formatTimestamp = (timestamp) => {
    return format(new Date(timestamp), 'dd MMM, yy - hh:mm a');
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableCell}>
              <TableSortLabel
                active={orderBy === 'userID'}
                direction={orderBy === 'userID' ? order : 'asc'}
                onClick={() => handleRequestSort('userID')}
              >
                User ID
              </TableSortLabel>
            </TableCell>
            <TableCell align="right" className={classes.tableCell}>
              <TableSortLabel
                active={orderBy === 'firstName'}
                direction={orderBy === 'firstName' ? order : 'asc'}
                onClick={() => handleRequestSort('firstName')}
              >
                First Name
              </TableSortLabel>
            </TableCell>
            <TableCell align="right" className={classes.tableCell}>
              <TableSortLabel
                active={orderBy === 'lastName'}
                direction={orderBy === 'lastName' ? order : 'asc'}
                onClick={() => handleRequestSort('lastName')}
              >
                Last Name
              </TableSortLabel>
            </TableCell>
            <TableCell align="right" className={classes.tableCell}>
              <TableSortLabel
                active={orderBy === 'mobileNumber'}
                direction={orderBy === 'mobileNumber' ? order : 'asc'}
                onClick={() => handleRequestSort('mobileNumber')}
              >
                Mobile Number
              </TableSortLabel>
            </TableCell>
            <TableCell align="right" className={classes.tableCell}>
              <TableSortLabel
                active={orderBy === 'email'}
                direction={orderBy === 'email' ? order : 'asc'}
                onClick={() => handleRequestSort('email')}
              >
                Email
              </TableSortLabel>
            </TableCell>
            <TableCell align="right" className={classes.tableCell}>
              <TableSortLabel
                active={orderBy === 'registeredTime'}
                direction={orderBy === 'registeredTime' ? order : 'asc'}
                onClick={() => handleRequestSort('registeredTime')}
              >
                Registration Timestamp
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow
              key={row.userID}
              onClick={() => onRowClick(row)}
              className={classes.tableRow}
            >
              <TableCell component="th" scope="row" className={classes.tableCell}>
                {row.userID}
              </TableCell>
              <TableCell align="right" className={classes.tableCell}>{row.firstName}</TableCell>
              <TableCell align="right" className={classes.tableCell}>{row.lastName}</TableCell>
              <TableCell align="right" className={classes.tableCell}>{row.mobileNumber}</TableCell>
              <TableCell align="right" className={classes.tableCell}>{row.email}</TableCell>
              <TableCell align="right" className={classes.tableCell}>{formatTimestamp(row.registeredTime)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default BasicTable;