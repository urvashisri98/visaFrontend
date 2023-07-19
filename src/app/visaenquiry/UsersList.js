import React, { useEffect, useState } from 'react';
import { Button, Container } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { Grid, Stack, CircularProgress, TextField } from '@mui/material';
import Alert from '@mui/material/Alert';
import axios from "axios";

// Table imports
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
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
// end

// import PlusIcon from '../../images/plus-icon.png';
import { appColors } from '../visaenquiry/appColors';
// import './UsersList.css';
import { VISA_URL } from "./../../constant/constants";

// import ViewIcon from './../../images/eye-icon.png';
// import DeleteIcon from './../../images/delete-icon.png';
// import EditIcon from './../../images/edit-icon.png';
// import BlockedIcon from './../../images/inactive-toggle.png';
// import UnblockedIcon from './../../images/active-toggle.png';

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

  useEffect(() => {
    const getUsersListData = async () => {
      const result = await axios.get(`${VISA_URL}/users/getUsers`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      let tableRows = [];
      let key = 1;

      result?.data?.apiRes.forEach(element => {
        Object.values(element)[0].map((item) => {
          tableRows.push({
            id: key, name: item?.name, phoneNumber: item?.phoneNumber, email: item?.email, userType: Object.keys(element)[0],
            actions: (
              <Grid style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <figure onClick={() => navigate(`/user`, { state: { id: item._id, readOnly: true } })}>
                  <img src="" style={{ marginRight: 10, marginLeft: 10 }} />
                </figure>
                <figure onClick={() => navigate(`/user`, { state: { id: item._id } })}>
                  <img src="" style={{ marginRight: 10, marginLeft: 10 }} />
                </figure>
                <figure onClick={() => deleteUser(item?._id)}>
                  <img src="" style={{ marginRight: 10, marginLeft: 10 }} />
                </figure>
                {
                  item?.isActive ? (
                    <figure onClick={() => blockUser()}>
                      <img src=""style={{ marginRight: 10, marginLeft: 10 }} />
                    </figure>
                  ) :
                    (
                      <figure onClick={() => unBlockUser()}>
                        <img src="" style={{ marginRight: 10, marginLeft: 10 }} />
                      </figure>
                    )
                }
              </Grid>
            )
          });
          key++;
        });
      });

      setTableRows(tableRows);
    };

    getUsersListData();
  }, []);

  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [deleteAlertVisible, setDeleteAlertVisibility] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [blockAlertVisibility, setBlockAlertVisibility] = useState(false);
  const [blockUserId, setBlockUserId] = useState(null);
  const [unBlockAlertVisibility, setunBlockAlertVisibility] = useState(false);
  const [unBlockUserId, setUnBlockUserId] = useState(null);
  const [displayLoader, setDisplayLoader] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const deleteUser = (userId) => {
    setDeleteAlertVisibility(true);
    setDeleteUserId(userId);
  }

  const blockUser = (userId) => {
    setBlockAlertVisibility(true);
    setBlockUserId(userId);
  }

  const unBlockUser = (userId) => {
    setunBlockAlertVisibility(true);
    setUnBlockUserId(userId);
  }

  const blockUserConfirmed = async () => {

  }

  const unBlockUserConfirmed = async () => {

  }

  const deleteUserConfirmed = async () => {
    setDeleteAlertVisibility(false);
    setDisplayLoader(true);
    // await axios
    //   .post(`${VISA_URL}` + '/users/addUser', CircularJSON.stringify({
    //     name: name,
    //     mobileNo: phone,
    //     email: email,
    //     createRole: userType,
    //     resetPasswordAccess: resetPasswordAccess,
    //     dashboardAccess: dashboardAccess,
    //     createUserAccess: createUserAccess,
    //     enquiryFormAccess: enquiryFormAccess,
    //     exportInfoAccess: exportInfoAccess
    //   }),
    //     config
    //   )
    //   .then((response) => {
    //     if (response.data.response == 'success') {
    //       alert('User added successfully');
    //       navigate("/usersList");
    //     }
    //     else {
    //       alert('Some error in adding new user')
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    setDisplayLoader(false);
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
    tableRows.filter((item) => {
      
    })
  }

  return (<Container className='users-list-container' style={{ backgroundColor: appColors.lightGreyBg }}>
    {
      deleteAlertVisible &&
      <Stack sx={{ width: '100%', marginBottom: 2 }} spacing={2}>
        <Alert
          severity="warning"
          action={
            <Box>
              <Button color="inherit" size="small" onClick={() => setDeleteAlertVisibility(false)}>
                Cancel
              </Button>
              <Button color="inherit" size="small" onClick={() => deleteUserConfirmed()}>
                Yes
              </Button>
            </Box>
          }
        >
          Do you really want to delete this user?
        </Alert>
      </Stack>
    }

    {
      blockAlertVisibility &&
      <Stack sx={{ width: '100%', marginBottom: 2 }} spacing={2}>
        <Alert
          severity="warning"
          action={
            <Box>
              <Button color="inherit" size="small" onClick={() => setBlockAlertVisibility(false)}>
                Cancel
              </Button>
              <Button color="inherit" size="small" onClick={() => blockUserConfirmed()}>
                Yes
              </Button>
            </Box>
          }
        >
          Do you really want to block this user?
        </Alert>
      </Stack>
    }

    {
      unBlockAlertVisibility &&
      <Stack sx={{ width: '100%', marginBottom: 2 }} spacing={2}>
        <Alert
          severity="warning"
          action={
            <Box>
              <Button color="inherit" size="small" onClick={() => setunBlockAlertVisibility(false)}>
                Cancel
              </Button>
              <Button color="inherit" size="small" onClick={() => unBlockUserConfirmed()}>
                Yes
              </Button>
            </Box>
          }
        >
          Do you really want to unblock this user?
        </Alert>
      </Stack>
    }

    <Container item className='users-list-header' style={{ backgroundColor: appColors.white }}>
      <h2 className='heading-text' style={{ color: appColors.basicTextColor }}>Users</h2>
      <Button onClick={() => navigate("/user")} className='header-btn' style={{ backgroundColor: appColors.appBlueColor, color: appColors.white }}>
        <img src="" width={10} height={10} style={{ marginRight: 15 }} />
        Add User
      </Button>
    </Container>
    <Container item style={{ backgroundColor: appColors.white, marginTop: 20, padding: 10, textAlign: 'right' }}>
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
    <TableContainer component={Paper} className='table-container'>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Id</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Phone Number</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">User Type</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? tableRows.slice(page ,rowsPerPage, page,  rowsPerPage + rowsPerPage)
            : tableRows
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