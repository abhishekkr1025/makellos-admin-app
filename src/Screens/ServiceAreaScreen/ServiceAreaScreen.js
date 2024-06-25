import React, { useEffect, useState } from 'react';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, TextField, Typography, TablePagination, TableSortLabel } from '@mui/material';
import axios from 'axios';
import { format } from 'date-fns';
import ScreenHeading from '../../CustomComponents/ScreenHeading';
import { useNavigate } from 'react-router-dom';

const SERVICE_AREA_API = "http://dev.makellos.co.in:8080/area/getAllAreas";

const ServiceAreas = () => {
  const [serviceArea, setServiceArea] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('creationTimestamp');
  const [orderDirection, setOrderDirection] = useState('desc');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(SERVICE_AREA_API);
        setServiceArea(response.data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset page when searching
  };

  const filteredServiceArea = serviceArea.filter(serviceArea =>
    Object.values(serviceArea).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedServiceArea = filteredServiceArea.sort((a, b) => {
    if (orderDirection === 'asc') {
      return a[orderBy] > b[orderBy] ? 1 : -1;
    } else {
      return a[orderBy] < b[orderBy] ? 1 : -1;
    }
  });

  const paginatedServiceArea = sortedServiceArea.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);  // Reset page to 0 when changing rows per page
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const formatTimestamp = (timestamp) => {
    return format(new Date(timestamp), 'dd MMM, yy - hh:mm a');
  };

  if (loading) {
    return <CircularProgress />;
  }

  const handleRowClick = (serviceArea) => {
    navigate(`/serviceArea/${serviceArea.areaId}`, { state: { serviceArea } });
  };



  return (
    <Box sx={{ display: 'flex' }} style={{backgroundColor:"#f1f2f5"}}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ mb: 3 }}>
        <ScreenHeading heading="Service Areas"/>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ minWidth: 200 }}
            />
          </Box>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 750 }}>
            <TableHead>
              <TableRow>
                <TableCell sortDirection={orderDirection}>
                  <TableSortLabel
                    active={orderBy === 'areaId'}
                    direction={orderBy === 'areaId' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('areaId')}
                  >
                  Area ID
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderDirection}>
                  <TableSortLabel
                    active={orderBy === 'areaName'}
                    direction={orderBy === 'areaName' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('areaName')}
                  >
                    Area Name
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderDirection}>
                  <TableSortLabel
                    active={orderBy === 'areaDescription'}
                    direction={orderBy === 'areaDescription' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('areaDescription')}
                  >
                    Area Description
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderDirection}>
                  <TableSortLabel
                    active={orderBy === 'areaPincode'}
                    direction={orderBy === 'areaPincode' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('areaPincode')}
                  >
                   Area Pincode
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderDirection}>
                  <TableSortLabel
                    active={orderBy === 'areaStatus'}
                    direction={orderBy === 'areaStatus' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('areaStatus')}
                  >
                   Area Status
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderDirection}>
                  <TableSortLabel
                    active={orderBy === 'creationTimestamp'}
                    direction={orderBy === 'creationTimestamp' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('creationTimestamp')}
                  >
                   Creation Timestamp
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedServiceArea.map((serviceArea) => (
                <TableRow key={serviceArea.areaId}>
                  <TableCell>{serviceArea.areaId || 'N/A'}</TableCell>
                  <TableCell>{serviceArea.areaName || 'N/A'}</TableCell>
                  <TableCell>{serviceArea.areaDescription || 'N/A'}</TableCell>
                  <TableCell>{serviceArea.areaPincode || 'N/A'}</TableCell>
                  <TableCell>{serviceArea.areaStatus || 'N/A'}</TableCell>
                  <TableCell>{serviceArea.creationTimestamp || 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredServiceArea.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ServiceAreas;
