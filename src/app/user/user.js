import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
    TextField,
    SelectChangeEvent,
    Button,
    MenuItem,
    FormControl,
    InputLabel, Breadcrumbs,Link,Typography
} from "@mui/material";
import Container from "@mui/material/Container";
import Grid from '@mui/material/Unstable_Grid2';

import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularJSON from "circular-json";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { appColors } from '../../constant/Colors';
import BackIcon from './../../images/arrow-left.png';
import './user.css';
import { VISA_URL } from "../../constant/constants";
import {useLocation} from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const User = () => {

    const [editUserData, setEditUserData] = React.useState(null);
    const [salutation, setSalutation] = React.useState('Salutation');
    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [userType, setUserType] = React.useState('');
    const [resetPasswordAccess, setResetPasswordAccess] = React.useState(null);
    const [dashboardAccess, setDashboardAccess] = React.useState(null);
    const [createUserAccess, setCreateUserAccess] = React.useState(null);
    const [enquiryFormAccess, setEnquiryFormAccess] = React.useState(null);
    const [exportInfoAccess, setExportInfoAccess] = React.useState(null);
    const [readOnly, setReadOnly] = React.useState(null);
    const token = JSON.parse(localStorage.getItem("token"));
    // const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    const getEditUserData = async() => {
        const result = await axios.get(`${VISA_URL}/users/getUser`, {
            params: {
              userId: location?.state?.id
            },
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
        });
        // setLoading(false);
        console.log(result?.data?.apiRes);
        setEditUserData(result?.data?.apiRes);
        setName(result?.data?.apiRes?.name);
        setPhone(result?.data?.apiRes?.mobileNo);
        setEmail(result?.data?.apiRes?.email);
        setUserType(result?.data?.apiRes?.adminType);
        setDashboardAccess(result?.data?.apiRes?.role?.dashBoardAccess);
        setCreateUserAccess(result?.data?.apiRes?.role?.createUserAccess);
        setResetPasswordAccess(result?.data?.apiRes?.role?.resetPasswordAccess);
        setEnquiryFormAccess(result?.data?.apiRes?.role?.enquiryFormAccess);
        setExportInfoAccess(result?.data?.apiRes?.role?.exportInfoAccess);
    }

    useEffect(() => {

       

        if (location?.state?.id) {
           getEditUserData();
        }

        if (location?.state?.readOnly) {
            setReadOnly(true);
        }
        else {
            setReadOnly(false);
        }
    }, []);

    const handleChange = (event) => {
        setSalutation(event.target.value);
    };

    const userTypeHandler = (e) => {
        setUserType(e.target.value);
    }

    const createUserHandler = async () => {
        const token = JSON.parse(localStorage.getItem('token'));

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Bearer " +
                    token,
            }
        };

        if (location?.state?.id) {
            editUser();
        }
        else {
            createUser(config);
        }
    }

    const createUser = async(config) => {
        await axios
        .post(`${VISA_URL}`+'/users/addUser', CircularJSON.stringify({
                name: name,
                mobileNo: phone,
                email: email,
                role: [],
                adminType:userType,
                // resetPasswordAccess: resetPasswordAccess,
                // dashboardAccess: dashboardAccess,
                // createUserAccess: createUserAccess,
                // enquiryFormAccess: enquiryFormAccess,
                // exportInfoAccess: exportInfoAccess
            }),
            config
        )
        .then((response) => {
            if (response.data.response == 'success') {
                alert('User added successfully');
                
                navigate("/usersList");
            }
            else {
                alert('Some error in adding new user')
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const editUser = async() => {

        console.log('Payload ==> ', {
            name: name,
            mobileNo: phone,
            email: email,
            updatedRole: userType,
            resetPasswordAccess: resetPasswordAccess,
            dashboardAccess: dashboardAccess,
            createUserAccess: createUserAccess,
            enquiryFormAccess: enquiryFormAccess,
            exportInfoAccess: exportInfoAccess
        });

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Bearer " +
                    token,
            },
            params: {
                userId: location?.state?.id
            },
        };
        await axios
        .put(`${VISA_URL}`+'/users/editUser',
            CircularJSON.stringify({
                name: name,
                mobileNo: phone ? phone : '',
                email: email,
                updatedrole: userType,
                resetPasswordAccess: resetPasswordAccess,
                dashboardAccess: dashboardAccess,
                createUserAccess: createUserAccess,
                enquiryFormAccess: enquiryFormAccess,
                exportInfoAccess: exportInfoAccess
            }),
            config
        )
        .then((response) => {
            if (response.data.response == 'success') {
                alert('User Edited successfully');
                // setLoading(false);
                navigate("/usersList");
            }
            else {
                alert('Some error in adding new user')
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
    // if (loading) {
    //     return (
    //       <div className="loader-container">
    //         <Circles type="Puff" color="#3081E8" height={100} width={100} />
    //       </div>
    //     );
    //   }
    return (
        <Container >
        <Box sx={{mt:2}}>
                        <Breadcrumbs maxItems={2} aria-label="breadcrumb">
                            <Link underline="hover" color="inherit" href="/">
                                Home
                            </Link>
                            <Typography color="text.primary">Add Users</Typography>
                        </Breadcrumbs>
                    </Box>
            <Container item >
               
                <Box sx={{ p: 2, marginTop: 3, textAlign: 'left' }}>
                    <Grid container spacing={1} columns={16}>
                        <Grid item xs={12} sm={4} md={4} p={2}>
                            {/* <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 5 }}>Name</p> */}
                            <TextField
                                size="small"
                                id="outlined"
                                label="Enter Name"
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                                value={name}
                                disabled={readOnly}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} p={2}>
                            {/* <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 5 }}>Phone Number</p> */}
                            <TextField
                                size="small"
                                id="outlined"
                                label="Enter Phone number"
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                }}
                                value={phone}
                                disabled={readOnly}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} p={2}>
                            {/* <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 5 }}>Email Id</p> */}
                            <TextField
                                size="small"
                                id="outlined"
                                label="Enter Email"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                value={email}
                                disabled={readOnly}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} p={2}>
                            {/* <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 5 }}>User Type</p> */}
                            <FormControl
                                sx={{ textAlign: "left" }}
                                size="small"
                                fullWidth
                            >
                               
                                <InputLabel
                                    id="demo-simple-select-helper-label"
                                    sx={{ fontSize: 13 }}
                                >
                                    Select User Type
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="outlined-required"
                                    label="Select User Type"
                                    name="userType"
                                    fullWidth
                                    defaultValue=""
                                    value={userType}
                                    onChange={(value) => userTypeHandler(value)}
                                    disabled={readOnly}
                                >
                                    <MenuItem  value={"ADMIN"}>Admin</MenuItem>
                                    <MenuItem value={"SUBADMIN"}>Sub Admin</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
                {/* <Container item>
                    <h5 style={{ color: appColors.basicTextColor, marginTop: 10, marginBottom: 20, textAlign: 'left' }}>
                        Enquiry
                    </h5>
                    
                    <Box style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 5, color: appColors.tableHeadingColor, width: '70%', textAlign: 'left' }}>Module</p>
                        <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 5, color: appColors.tableHeadingColor, width: '15%' }}>Hide</p>
                        <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 5, color: appColors.tableHeadingColor, width: '15%' }}>Show</p>
                    </Box>
                    <hr></hr>
                    <Box style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 5, color: appColors.tableHeadingColor, width: '70%', textAlign: 'left' }}>Reset Password Access</p>

                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '15%'}}>
                            <FormControlLabel
                                label=""
                                control={
                                    <Checkbox
                                        onChange={(event) => setResetPasswordAccess(false)}
                                        checked={resetPasswordAccess == false ? true : false}
                                        disabled={readOnly}
                                        defaultChecked={resetPasswordAccess == false ? true : false}
                                    />
                                }
                                style={{textAlign: 'center', margin: 0}}
                            />
                        </div>

                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '15%'}}>
                            <FormControlLabel
                                label=""
                                control={
                                    <Checkbox
                                        onChange={(event) => setResetPasswordAccess(true)}
                                        checked={resetPasswordAccess}
                                        defaultChecked={resetPasswordAccess}
                                        disabled={readOnly}
                                    />
                                }
                                style={{textAlign: 'center', margin: 0}}
                            />
                        </div>
                    </Box>
                    <hr></hr>

                    <Box style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 5, color: appColors.tableHeadingColor, width: '70%', textAlign: 'left' }}>Dashboard Access</p>

                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '15%'}}>
                            <FormControlLabel
                                label=""
                                control={
                                    <Checkbox
                                        onChange={(event) => setDashboardAccess(false)}
                                        checked={dashboardAccess == false ? true : false}
                                        defaultChecked={dashboardAccess == false ? true : false}
                                        disabled={readOnly}
                                    />
                                }
                                style={{textAlign: 'center', margin: 0}}
                            />
                        </div>

                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '15%'}}>
                            <FormControlLabel
                                label=""
                                control={
                                    <Checkbox
                                        onChange={(event) => setDashboardAccess(true)}
                                        checked={dashboardAccess}
                                        defaultChecked={dashboardAccess}
                                        disabled={readOnly}
                                    />
                                }
                                style={{textAlign: 'center', margin: 0}}
                            />
                        </div>
                    </Box>
                    <hr></hr>

                    <Box style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 5, color: appColors.tableHeadingColor, width: '70%', textAlign: 'left' }}>Create User Access</p>

                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '15%'}}>
                            <FormControlLabel
                                label=""
                                control={
                                    <Checkbox
                                        onChange={(event) => setCreateUserAccess(false)}
                                        checked={createUserAccess == false ? true : false}
                                        defaultChecked={createUserAccess == false ? true : false}
                                        disabled={readOnly}
                                    />
                                }
                                style={{textAlign: 'center', margin: 0}}
                            />
                        </div>

                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '15%'}}>
                            <FormControlLabel
                                label=""
                                control={
                                    <Checkbox
                                        onChange={(event) => setCreateUserAccess(true)}
                                        checked={createUserAccess}
                                        defaultChecked={createUserAccess}
                                        disabled={readOnly}
                                    />
                                }
                                style={{textAlign: 'center', margin: 0}}
                            />
                        </div>
                    </Box>
                    <hr></hr>

                    <Box style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 5, color: appColors.tableHeadingColor, width: '70%', textAlign: 'left' }}>Enquiry form Access</p>

                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '15%'}}>
                            <FormControlLabel
                                label=""
                                control={
                                    <Checkbox
                                        onChange={(event) => setEnquiryFormAccess(false)}
                                        checked={enquiryFormAccess == false ? true : false}
                                        defaultChecked={enquiryFormAccess == false ? true : false}
                                        disabled={readOnly}
                                    />
                                }
                                style={{textAlign: 'center', margin: 0}}
                            />
                        </div>

                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '15%'}}>
                            <FormControlLabel
                                label=""
                                control={
                                    <Checkbox
                                        onChange={(event) => setEnquiryFormAccess(true)}
                                        checked={enquiryFormAccess}
                                        defaultChecked={enquiryFormAccess}
                                        disabled={readOnly}
                                    />
                                }
                                style={{textAlign: 'center', margin: 0}}
                            />
                        </div>
                    </Box>
                    <hr></hr>

                    <Box style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 5, color: appColors.tableHeadingColor, width: '70%', textAlign: 'left' }}>Export Info Access</p>

                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '15%'}}>
                            <FormControlLabel
                                label=""
                                control={
                                    <Checkbox
                                        onChange={(event) => setExportInfoAccess(false)}
                                        checked={exportInfoAccess == false ? true : false}
                                        defaultChecked={exportInfoAccess == false ? true : false}
                                        disabled={readOnly}
                                    />
                                }
                                style={{textAlign: 'center', margin: 0}}
                            />
                        </div>

                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '15%'}}>
                            <FormControlLabel
                                label=""
                                control={
                                    <Checkbox
                                        onChange={(event) => setExportInfoAccess(true)}
                                        checked={exportInfoAccess}
                                        defaultChecked={exportInfoAccess}
                                        disabled={readOnly}
                                    />
                                }
                                style={{textAlign: 'center', margin: 0}}
                            />
                        </div>
                    </Box>
                </Container> */}

                {!readOnly && <Grid item xs={12} sm={12} p={1} style={{display: 'flex', marginTop: 30, alignItems: 'right', justifyContent: 'flex-end'}}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={6} p={1}>
                            <Button onClick={() => navigate('/usersList')} style={{backgroundColor: appColors.btnBgColorGrey, color: appColors.black}} variant="contained">Cancel</Button>
                        </Grid>
                        <Grid item xs={12} sm={6} p={1}>
                            <Button onClick={() => createUserHandler()} style={{backgroundColor: appColors.appBlueColor, color: appColors.white}} variant="contained">Submit</Button>
                        </Grid>
                    </Grid>
                </Grid>}
            </Container>
        </Container>

    );
};
export default User;