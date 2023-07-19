import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import "../visaenquiry/Submitapplication.css";
import Paper from "@mui/material/Paper";
import axios from "axios";
import {
    Breadcrumbs,
    Container,
    Grid,
    Link,
    TextField,
    Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styles from "../visaenquiry/VisaEnquiry.module.css";
import Steppers from "../visaenquiry/Stepper";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveUserInfo } from "../redux/action/Action";
import { VISA_URL } from "./../../constant/constants";
import { OtherHousesSharp } from "@mui/icons-material";
const SubmitEdit = () => {
    const token = JSON.parse(localStorage.getItem("token"));

    let temp = useSelector((state) => state.saveUserInfo);
    const [user, setUser] = useState({});
    const [open, setOpen] = React.useState(false);
    const [openPreview, setOpenPreview] = React.useState(false);

    let userData = temp.userInfo;
    let feedbackData = {
        internet: userData.internet,
        magazine: userData.magazine,
        radio: userData.radio,
        seminar: userData.seminar,
        friends: userData.friends,
        newspaper: userData.newspaper,
        reference: userData.reference,
        seminar: userData.seminar,
        declaration: userData.declaration,
        others: userData.others
    }



    const handleClose = () => {
        setOpen(false);
        //setOpenPreview(false);
        // navigate("/Submitapplication");
    };
    // const handleClickOpenPreview = () => {
    //     setOpen(true);
    // };
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const checkFunction = (event) => {
        const { name, value } = event.target;
        console.log(value)
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const checkFunctionBoolean = (event) => {
        const { name, value } = event.target;
        console.log(value)
        setUser((prevState) => ({
            ...prevState,
            [name]: event.target.checked,
        }));
    };

    function update(target, src) {
        const res = {};
        Object.keys(target)
            .forEach(k => res[k] = (src[k] ?? target[k]));
        return res;
    }


    const handleOnSubmit = (e) => {
        let t = update(userData, user);
        // let assignee = t.assignee;
        delete t.assignee['_id'];
        let comments = t.comments;
        let newCommntsArray = comments.map(({ _id, ...rest }) => {
            return rest;
        });
        t.comments = newCommntsArray;
        dispatch(saveUserInfo(t));
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        };
        axios
            .put(`${VISA_URL}/users/editStudent`, t, config)
            .then((response) => {
                if (response?.data?.response == "success") {
                    alert(response?.data?.message);
                    navigate("/");
                } else {
                    alert(response?.data.error + " --" + response?.data.errordesc);
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }
    const popUp = () => {
        setOpen(true);
    };

    const backFunction = (e) => {
        navigate("/visaEdit");
    };

    const label = { inputProps: { "aria-label": "Checkbox demo" } };
    useEffect(() => {
        setUser(feedbackData)
        console.log(user);
    }, []);

    return (
        <Container maxWidth="mx" className={styles.containerFix}>
            <Grid item>
                <Box className={styles.breadcrumFix}>
                    <Breadcrumbs maxItems={2} aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href="/">
                            Home
                        </Link>

                        <Typography color="text.primary">Academic</Typography>
                    </Breadcrumbs>
                </Box>
                <Box sx={{ width: "100%" }}>
                    <Steppers activeSteps={4}></Steppers>
                </Box>

                <Grid item sx={{ width: "inherit" }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            "& > :not(style)": {
                                mt: 8,
                                ml: 8,
                                mr: 8,
                                width: "-webkit-fill-available",
                                pb: 2,
                            },
                        }}
                    >
                        <Paper elevation={3} sx={{ mr: 10 }}>
                            <Grid container spacing={2} sx={{ pl: 10 }}>
                                <Grid item xs={8}>
                                    <h5 className="Information">Reference</h5>
                                    <TextField
                                        id="outlined-size-small"
                                        size="normal"
                                        fullWidth
                                        required
                                        name="reference"
                                        onChange={checkFunction}
                                        value={user?.reference}
                                    />
                                </Grid>
                                <Grid item xs={8}>
                                    <h5 className="Information">
                                        Any Other Information you want to declare
                                    </h5>

                                    <TextField
                                        id="outlined-size-small"
                                        size="normal"
                                        fullWidth
                                        required
                                        name="declaration"
                                        onChange={checkFunction}
                                        value={user?.declaration}
                                    />
                                </Grid>
                                <Grid item xs={8}>
                                    <h5 className="Information">
                                        How did you come to know about us?
                                    </h5>

                                    <Grid sx={{ display: "flex", flexWrap: "wrap" }}>
                                        {console.log(user?.newspaper)}
                                        <Checkbox
                                            {...label}
                                            name="newspaper"
                                            onChange={checkFunctionBoolean}
                                            checked={user?.newspaper}
                                        />
                                        <p>Newspaper</p>
                                        <Checkbox
                                            {...label}
                                            name="magazine"
                                            onChange={checkFunctionBoolean}
                                            checked={user?.magazine}
                                        />
                                        <p>Magazine</p>
                                        <Checkbox
                                            {...label}
                                            name="radio"
                                            onChange={checkFunctionBoolean}
                                            checked={user?.radio}
                                        />
                                        <p>Radio</p>
                                        <Checkbox
                                            {...label}
                                            name="seminar"
                                            onChange={checkFunctionBoolean}
                                            checked={user?.seminar}

                                        />
                                        <p>Seminar</p>
                                        <Checkbox
                                            {...label}
                                            name="friends"
                                            onChange={checkFunctionBoolean}
                                            checked={user?.friends}
                                        />
                                        <p>Friends</p>
                                        <Checkbox
                                            {...label}
                                            name="internet"
                                            onChange={checkFunctionBoolean}
                                            checked={user?.internet}
                                        />
                                        <p>Internet</p>
                                    </Grid>
                                    <Grid item sx={{ mt: 2 }}>
                                        <TextField
                                            id="outlined-size-small"
                                            size="normal"
                                            fullWidth
                                            label="Other(Please specify)"
                                            name="other"
                                            onChange={checkFunction}
                                            value={user?.others}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid
                                item
                                sx={{
                                    display: "flex",
                                    gap: 10,
                                    justifyContent: "center",
                                    flexWrap: "wrap",
                                }}
                            >
                                <Grid item sx={{ mt: 2, display: "flex", gap: 1 }}>
                                    <Grid item>
                                        <Button variant="outlined" onClick={backFunction}>
                                            Back
                                        </Button>
                                    </Grid>

                                    <Grid item>
                                        <Button variant="outlined" onClick={popUp}>
                                            Submit
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="outlined" >
                                            Preview
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        {"Want to submit application form?"}
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            PLEASE REVIEW APPLICATION BEFORE SUBMIT.
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>Cancel</Button>
                                        <Button onClick={handleOnSubmit} autoFocus>
                                            Agree
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </Grid>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};
export default SubmitEdit;
