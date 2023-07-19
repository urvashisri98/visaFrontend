import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Grid, CircularProgress, TextField, Breadcrumbs, Link, Typography, Alert, Button, Container,
  Tooltip
} from '@mui/material';
import axios from "axios";

// Table imports
import PropTypes from 'prop-types';
import { useTheme, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { getUserPermissionsData } from '../../utils';
import {Circles} from 'react-loader-spinner';
// end

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import './UsersList.css';
import { appColors } from '../../constant/Colors';
import ViewIcon from './../../images/eye-icon.png';
import DeleteIcon from './../../images/delete-icon.png';
import EditIcon from './../../images/edit-icon.png';
import BlockedIcon from './../../images/inactive-toggle.png';
import UnblockedIcon from './../../images/active-toggle.png';
import PlusIcon from '../../images/plus-icon.png';
import CircularJSON from "circular-json";
import { VISA_URL } from "./../../constant/constants";
import Edit from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PageviewIcon from '@mui/icons-material/Pageview';
const token = JSON.parse(localStorage.getItem("token"));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: appColors.white,
    color: appColors.tableHeadingColor,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const UsersList = () => {

  const [tableRows, setTableRows] = useState([]);
  const [userPermissions, setUserPermissions] = useState({});
  const [loading, setLoading] = useState(true);
  const getUsersListData = async () => {
    const result = await axios.get(`${VISA_URL}/users/getUsers`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    let tableRows = [];
    let key = 1;
    setLoading(false);
    result?.data?.data?.users.forEach(item => {
        tableRows.push({
          id: key, name: item?.name, phoneNumber: item?.mobileNo, email: item?.email, userType: item?.adminType,
          actions: (
            <Grid style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Tooltip title="View User"><PageviewIcon  style={{ color: "green" }} onClick={() => navigate(`/user`, { state: { id: item._id, readOnly: true } })}></PageviewIcon></Tooltip>
              <Tooltip title="Delete User"><DeleteForeverIcon style={{ color: "red" }} onClick={() => deleteUser(item?._id)}></DeleteForeverIcon></Tooltip>
              <Tooltip title="Edit User"><Edit  style={{ color: "orange" }} onClick={() => navigate(`/user`, { state: { id: item._id } })}></Edit></Tooltip>

             
              {/* <Tooltip title="View User">
                <figure style={{ cursor: 'pointer' }} onClick={() => navigate(`/user`, { state: { id: item._id, readOnly: true } })}>
                  <img src={ViewIcon} style={{ marginRight: 10, marginLeft: 10 }} />
                </figure>
              </Tooltip>
              <Tooltip title="Edit User">
                <figure style={{ cursor: 'pointer' }} onClick={() => navigate(`/user`, { state: { id: item._id } })}>
                  <img src={EditIcon} style={{ marginRight: 10, marginLeft: 10 }} />
                </figure>
              </Tooltip>
              <Tooltip title="Delete User">
                <figure style={{ cursor: 'pointer' }} onClick={() => deleteUser(item?._id)}>
                  <img src={DeleteIcon} style={{ marginRight: 10, marginLeft: 10 }} />
                </figure>
              </Tooltip>
              {
                item?.isActive ? (
                  <Tooltip title="Block User">
                    <figure style={{ cursor: 'pointer' }} onClick={() => blockUser(item._id)}>
                      <img src={UnblockedIcon} style={{ marginRight: 10, marginLeft: 10 }} />
                    </figure>
                  </Tooltip>
                ) :
                  (
                    <Tooltip title="Unblock User">
                      <figure style={{ cursor: 'pointer' }} onClick={() => unBlockUser(item._id)}>
                        <img src={BlockedIcon} style={{ marginRight: 10, marginLeft: 10 }} />
                      </figure>
                    </Tooltip>
                  )
              } */}
            </Grid>
          )
        });
        key++;
      });
    setTableRows(tableRows);
  };

  useEffect(() => {
    getUsersListData();
    getUserPermissions();
  }, []);

  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [blockUserId, setBlockUserId] = useState(null);
  const [unBlockUserId, setUnBlockUserId] = useState(null);
  const [displayLoader, setDisplayLoader] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchedTableRows, setSearchedTableRows] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogAction, setDialogAction] = useState(null);

  const getUserPermissions = async () => {
    var userPermissionsData = await getUserPermissionsData();

    if (userPermissionsData !== null) {
      setUserPermissions(userPermissionsData);
    }
    else {
      setUserPermissions({});
    }
  }

  const deleteUser = (userId) => {
    setDeleteUserId(userId);
    setShowDialog(true);
    setDialogTitle('Do you really want to delete this user');
    setDialogAction('delete-user');
  }

  const blockUser = (userId) => {
    setBlockUserId(userId);
    setShowDialog(true);
    setDialogTitle('Do you really want to block this user');
    setDialogAction('block-user');
  }

  const unBlockUser = (userId) => {
    setUnBlockUserId(userId);
    setShowDialog(true);
    setDialogTitle('Do you really want to unblock this user');
    setDialogAction('unblock-user');
  }

  const blockUserConfirmed = async () => {
    const result = await axios.post(`${VISA_URL}/users/blockUser?userId=` + blockUserId, CircularJSON.stringify({
      "block": true
    }),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

    if (result.data.response == "success") {
      setLoading(false);
      setDialogTitle('User blocked successfully');
      setDialogAction('none');
      getUsersListData();
    }
    else {
      setDialogTitle('Some error occured');
      setDialogAction('none');
    }

  }

  const unBlockUserConfirmed = async () => {
    const result = await axios.post(`${VISA_URL}/users/blockUser?userId=` + unBlockUserId, CircularJSON.stringify({
      "block": false
    }),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

    if (result.data.response == "success") {
      setLoading(false);
      setDialogTitle('User unblocked successfully');
      setDialogAction('none');
      getUsersListData();
    }
    else {
      setDialogTitle('Some error occured');
      setDialogAction('none');
    }
  }

  const deleteUserConfirmed = async () => {
    const result = await axios.delete(`${VISA_URL}/users/deleteUser?userId=` + deleteUserId,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

    if (result.data.response == "success") {
      setLoading(false);
      setDialogTitle('User deleted successfully');
      setDialogAction('none');
      getUsersListData();
    }
    else {
      setDialogTitle('Some error occured');
      setDialogAction('none');
    }
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableRows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const conductSearch = (value) => {
    setSearchValue(value);

    if (value == '') {
      setSearchedTableRows(tableRows);
    }
    else {
      let newRows = tableRows.filter((item) => {
        return (item?.name?.includes(value) || item?.email?.includes(value));
      })
      setSearchedTableRows(newRows);
    }
  }
  if (loading) {
    return (
      <div className="loader-container">
        <Circles type="Puff" color="#3081E8" height={100} width={100} />
      </div>
    );
  }
  return (<Container >
    <Box sx={{ mt: 2 }}>
      <Breadcrumbs maxItems={2} aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography color="text.primary">User List</Typography>
      </Breadcrumbs>
    </Box>

    <Container item style={{ backgroundColor: appColors.white, marginTop: 20, padding: 10, textAlign: 'right' }}>
      {/* {userPermissions?.allowCreateUser == true && ( */}
        <Button onClick={() => navigate("/user")} className='header-btn'
          style={{
            backgroundColor: appColors.appBlueColor, color: appColors.white,
            height: 40, marginRight: 10
          }}>
          <img src={PlusIcon} width={10} height={10} style={{ marginRight: 15 }} />
          Add User
        </Button>
      {/* )
      } */}

      <TextField
        size="small"
        id="outlined"
        label="Search"
        onChange={(e) => {
          conductSearch(e.target.value);
        }}
        value={searchValue}
      />
    </Container>
    {displayLoader && <Box style={{ marginTop: 20 }}>
      <CircularProgress />
    </Box>}
    {
      <Dialog open={showDialog}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent style={{ height: 80, width: 500 }}>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => { setShowDialog(false) }}>Close</Button>
          {dialogAction != 'none' && <Button variant="contained" onClick={() => {switch(dialogAction){
                                                         case 'delete-user': {deleteUserConfirmed()} break;
                                                         case 'block-user': {blockUserConfirmed()} break;
                                                         case 'unblock-user': {unBlockUserConfirmed()}}}}>Yes</Button>}
        </DialogActions>
      </Dialog>
    }
    <TableContainer component={Paper} className='table-container'>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow sx={{
              "& th": {
                color: "rgba(96, 96, 96)",
                backgroundColor: "#1976d2",
                color:"#ffffff"
              }
            }}>
            <TableCell align="center">Id</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Phone Number</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">User Type</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? (searchedTableRows !== null ? searchedTableRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : tableRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage))
            : (searchedTableRows !== null ? searchedTableRows : tableRows)
          ).map((row) => (
            <TableRow key={row.id}>
              <TableCell align="center" width={100}>
                {row.id}
              </TableCell>
              <TableCell align="center" width={100}>
                {row.name}
              </TableCell>
              <TableCell align="center">
                {row.phoneNumber}
              </TableCell>
              <TableCell align="center">
                {row.email}
              </TableCell>
              <TableCell align="center">
                {row.userType == 'superAdmin' ? 'Super Admin' : (row.userType == 'admin' ? 'Admin' : 'Sub Admin')}
              </TableCell>
              <TableCell align="center">
                {row.actions}
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              count={tableRows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
              align={'right'}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  </Container>);

}

export default UsersList;






