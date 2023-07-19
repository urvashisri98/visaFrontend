import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
    Grid, CircularProgress, TextField, Breadcrumbs, Link, Typography, Alert, Button, Container,
    Tooltip
} from '@mui/material';
import axios from "axios";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import { Circles } from 'react-loader-spinner';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import './UsersList.css';
import { appColors } from '../../constant/Colors';
import PlusIcon from '../../images/plus-icon.png';
import CircularJSON from "circular-json";
import { VISA_URL } from "./../../constant/constants";

const Channel = () => {

    const [tableRows, setTableRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [assine, setAssigne] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [channel, setChannel] = useState('')
    const navigate = useNavigate();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [displayLoader, setDisplayLoader] = useState(false);
    const [searchedTableRows, setSearchedTableRows] = useState(null);
    const [showDialog, setShowDialog] = useState(false)
    const [open, setOpen] = React.useState(false);
    const [showChannelDeleteDialog, setShowChannelDeleteDialog] = useState(false)
    const [removeUser, setRemoveUser] = useState({})
    const [error, setError] =useState('')

    const token = JSON.parse(localStorage.getItem("token"));

    const deleteUserConfirmed = async () => {

        const result = await axios.delete(`${VISA_URL}/users/deleteChannelUser?adminId=`+removeUser.adminId+`&channelId=`+removeUser.channelId,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
        if (result.data.response == "success") {

            setShowDialog(false);
            getUsersListData();

        }
        else {
            setShowDialog(false);
        }
    }

    const deleteChannelConfirmed = async () => {
        const result = await axios.delete(`${VISA_URL}/users/deleteChannel?channelId=` + deleteUserId,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

        if (result.data.response == "success") {
            setLoading(false);

            //getChannelsListData();
        }
        else {

        }
    }

    const getUsersList = async () => {
        const result = await axios.get(`${VISA_URL}/users/getUsers`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        setLoading(false);
        setAssigne(result);
    }

    const addChannel = async () => {
        setLoading(true)
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        }
        if (selectedUser) {
            const data = {
                channel: channel,
                adminIds: [selectedUser]
            }
            axios.post(`${VISA_URL}` + '/users/addChannel', CircularJSON.stringify(data),
                config
            )
                .then((response) => {
                    getUsersListData();
                    //getUserPermissions();
                    getUsersList();
                })
        } else {
            setError("Please enter channel name")
        }
        setLoading(false);
        setOpen(false);
    }

    const handleChange = (event) => {
        setSelectedUser(event.target.value);
    };


    const getUsersListData = async () => {
        const result = await axios.get(`${VISA_URL}/users/getChannel`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        console.log(result?.data?.channels)
        let tableRows = [];
        let key = 1;
        setLoading(false);
        result?.data?.channels.forEach(item => {
            tableRows.push({
                id: key, name: item?.channel, channelId: item?.channelId, assignee: item.admins
            });
            key++;
        });
        setTableRows(tableRows);
    };

    useEffect(() => {
        getUsersListData();
        //getUserPermissions();
        getUsersList();
    }, []);



    const handleClickOpen = () => {
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChannel = (e) => {
        setChannel(e.target.value)
    }


    const handleClick = () => {
        console.info('You clicked the Chip.');
    };

    const handleDelete = (userId, channelId) => {
        console.log(userId, channelId);
        let data = {
            channelId: channelId,
            adminId: userId
        }
        setRemoveUser(data);
        setShowDialog(true)
    };

    const handleDeleteChannel = () => {
        setShowChannelDeleteDialog(true)
    };


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
            <Button onClick={handleClickOpen} className='header-btn'
                style={{
                    backgroundColor: appColors.appBlueColor, color: appColors.white,
                    height: 40, marginRight: 10
                }}>
                <img src={PlusIcon} width={10} height={10} style={{ marginRight: 15 }} />
                Add Channel
            </Button>
            {/* )
      } */}


        </Container>
        {displayLoader && <Box style={{ marginTop: 20 }}>
            <CircularProgress />
        </Box>}

        <TableContainer component={Paper} className='table-container'>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>

                        <TableCell align="center"><h6>Channel Name</h6></TableCell>
                        <TableCell align="center"><h6>Assignee</h6></TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? (searchedTableRows !== null ? searchedTableRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : tableRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage))
                        : (searchedTableRows !== null ? searchedTableRows : tableRows)
                    ).map((row) => (
                        <TableRow key={row.id}>

                            <TableCell align="center" >
                                {row.name}
                            </TableCell>
                            <TableCell align="right">
                                {row.assignee.map((item) => (
                                    <Stack direction="row" spacing={2} >

                                        <Chip label={item.name} variant="outlined" onDelete={() => { handleDelete(item._id, row.channelId) }} />


                                    </Stack>
                                ))}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
        </TableContainer>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Channel</DialogTitle>
            <DialogContent>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        size="small"
                        onChange={handleChannel}
                        value={channel}
                    />
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small-label">User</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={selectedUser}
                        label="User"
                        onChange={handleChange}
                    >
                        {assine?.data?.data?.users.map((items) => {
                            return (
                                <MenuItem value={items?._id}>{items?.name}</MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                {(selectedUser  && channel)&& (
                <Button onClick={addChannel}>Add</Button>)}
            </DialogActions>
        </Dialog>
        {
            <Dialog open={showDialog}>
                <DialogTitle>{'Delete User'}</DialogTitle>
                <DialogContent style={{ height: 80, width: 500 }}>
                   
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => { setShowDialog(false) }}>Close</Button>
                    <Button variant="contained" onClick={() => { deleteUserConfirmed() }}>Yes</Button>
                </DialogActions>
            </Dialog>
        }
        {
            <Dialog open={showChannelDeleteDialog}>
                <DialogTitle>{'Delete User'}</DialogTitle>
                <DialogContent style={{ height: 80, width: 500 }}>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => { setShowDialog(false) }}>Close</Button>
                    <Button variant="contained" onClick={() => { deleteChannelConfirmed() }}>Yes</Button>
                </DialogActions>
            </Dialog>
        }
    </Container>);

}

export default Channel;






