import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useStyles } from './styles'; // Adjust the path as per your project structure

const BasicTable = ({ rows, onRowClick }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableCell}>User ID</TableCell>
            <TableCell align="right" className={classes.tableCell}>First Name</TableCell>
            <TableCell align="right" className={classes.tableCell}>Last Name</TableCell>
            <TableCell align="right" className={classes.tableCell}>Mobile Number</TableCell>
            <TableCell align="right" className={classes.tableCell}>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;