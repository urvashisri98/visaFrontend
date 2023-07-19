import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Select, CircularProgress, TextField, Breadcrumbs, Link, Typography, Button, Container,
  FormControl, InputLabel, MenuItem, Grid, Tooltip
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
import { Circles } from 'react-loader-spinner';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// end

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import './channel-list.module.css';
import { appColors } from '../../constant/Colors';
import PlusIcon from '../../images/plus-icon.png';
import CircularJSON from "circular-json";
import { VISA_URL } from "./../../constant/constants";

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

const ChannelList = () => {

  const [tableRows, setTableRows] = useState([]);
  const [allUsersList, setAllUsersListData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUsersListData = async () => {
    const result = await axios.get(`${VISA_URL}/users/getUsers`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    let allUsersList = [];
    let key = 1;
    setLoading(false);
    result?.data?.data?.users.forEach(item => {
      allUsersList.push({
        id: item?._id, key: key, name: item?.name
      });
      key++;
    });
    setAllUsersListData(allUsersList);
  };

  const getChannelsListData = async () => {
    const result = await axios.get(`${VISA_URL}/users/getChannel`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    let tableRows = [];
    let key = 1;
    setLoading(false);
    console.log(result?.data?.channels);
    result?.data?.channels.forEach(item => {
      if (item?.isDeleted !== true) {
        var adminsData = '';
        item?.admins.map((adminData, index) => {
          if (item?.admins.length == index + 1) {
            adminsData = adminsData + adminData?.name;
          }
          else {
            adminsData = adminsData + adminData?.name + ', ';
          }
        });
  
        tableRows.push({
          id: key, channel: item?.channel, admins: adminsData,
          actions: (
            <Grid style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Tooltip title="Delete User"><DeleteForeverIcon style={{ color: "red" }} onClick={() => deleteUser(item?.channelId)}></DeleteForeverIcon></Tooltip>
            </Grid>)
        })
      }
    });

    setTableRows(tableRows);
  };

  useEffect(() => {
    getUsersListData();
    getChannelsListData();
  }, []);

  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [displayLoader, setDisplayLoader] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchedTableRows, setSearchedTableRows] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogAction, setDialogAction] = useState(null);
  const [addChannelDialogVisibility, setAddChannelDialogVisibility] = useState(false);
  const [newChannelName, setNewChannelName] = useState('');
  const [newChannelSelectedUsers, setNewChannelSelectedUsers] = useState([]);

  const deleteUser = (userId) => {
    setDeleteUserId(userId);
    setShowDialog(true);
    setDialogTitle('Do you really want to delete this Channel');
    setDialogAction('delete-user');
  }

  const deleteUserConfirmed = async () => {
    const result = await axios.delete(`${VISA_URL}/users/deleteChannel?channelId=` + deleteUserId,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

    if (result.data.response == "success") {
      setLoading(false);
      setDialogTitle('Channel deleted successfully');
      setDialogAction('none');
      getChannelsListData();
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

  const addChannel = async () => {

    setAddChannelDialogVisibility(false);
   
    await axios.post(`${VISA_URL}/users/addChannel`, CircularJSON.stringify({
      channel: newChannelName,
      adminIds: newChannelSelectedUsers
    }),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      })
      .then(response => {
        alert(response?.data?.message);
        setNewChannelName('');
        setNewChannelSelectedUsers([]);
        getChannelsListData();
      }
      );
  }

  const handleNewChannelUsersChange = (event) => {
    setNewChannelSelectedUsers(event.target.value);
  }

  return (<Container >
    <Box sx={{ mt: 2 }}>
      <Breadcrumbs maxItems={2} aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography color="text.primary">Channel List</Typography>
      </Breadcrumbs>
    </Box>

    <Container item style={{ backgroundColor: appColors.white, marginTop: 20, padding: 10, textAlign: 'right' }}>
      {/* {userPermissions?.allowCreateUser == true && ( */}
      <Button onClick={() => setAddChannelDialogVisibility(true)} className='header-btn'
        style={{
          backgroundColor: appColors.appBlueColor, color: appColors.white,
          height: 40, marginRight: 10
        }}>
        <img src={PlusIcon} width={10} height={10} style={{ marginRight: 15 }} />
        Add Channel
      </Button>
      {/* )
      } */}

      {/* <TextField
        size="small"
        id="outlined"
        label="Search"
        onChange={(e) => {
          conductSearch(e.target.value);
        }}
        value={searchValue}
      /> */}
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
          {dialogAction != 'none' && <Button variant="contained" onClick={() => {
            switch (dialogAction) {
              case 'delete-user': { deleteUserConfirmed() } break;
            }
          }}>Yes</Button>}
        </DialogActions>
      </Dialog>
    }
    {
      <Dialog open={addChannelDialogVisibility}>
        <DialogTitle>{'Add Channel'}</DialogTitle>
        <DialogContent style={{}}>
          <TextField
            size="small"
            id="outlined"
            label="Enter Channel Name"
            onChange={(e) => {
              setNewChannelName(e.target.value);
            }}
            value={newChannelName}
          />
          <FormControl style={{ width: 150, height: 40 }}>
            <InputLabel id="demo-mutiple-name-label">Users</InputLabel>
            <Select
              labelId="demo-mutiple-name-label"
              id="demo-mutiple-name"
              multiple
              value={newChannelSelectedUsers}
              onChange={handleNewChannelUsersChange}
              style={{ width: 150, height: 40, marginLeft: 10 }}
            >
              {allUsersList.map((item) => (
                <MenuItem key={item?.key} value={item?.id}>
                  {item?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => { setAddChannelDialogVisibility(false) }}>Close</Button>
          <Button disabled={newChannelName.length == 0 || newChannelSelectedUsers.length == 0} variant="contained" onClick={() => addChannel()}>Add</Button>
        </DialogActions>
      </Dialog>
    }
    <TableContainer component={Paper} className='table-container'>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Channel Name</StyledTableCell>
            <StyledTableCell align="center">Admins</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? (searchedTableRows !== null ? searchedTableRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : tableRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage))
            : (searchedTableRows !== null ? searchedTableRows : tableRows)
          ).map((row) => (
            <TableRow key={row.id}>
              <TableCell align="center" width={100}>
                {row.channel}
              </TableCell>
              <TableCell align="center" width={100}>
                {row.admins}
              </TableCell>
              <TableCell align="center" width={100}>
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

export default ChannelList;