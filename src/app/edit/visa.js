import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import "../visaenquiry/VisaDetails.css";
import Paper from "@mui/material/Paper";
import {
    Breadcrumbs,
    Container,
    Grid,
    Link,
    TextField,
    Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import styles from "../visaenquiry/VisaEnquiry.module.css";
import Steppers from "../visaenquiry/Stepper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveUserInfo } from "../redux/action/Action";

const VisaEdit = () => {

    let temp = useSelector((state) => state.saveUserInfo);
    
    let userData = temp.userInfo;
    const visaData = {
        visaEarlierRefused: userData.visaEarlierRefused,
        visaRefusalReason: userData.visaRefusalReason,
        needEducationLoan: userData.needEducationLoan,
        loanAmount: userData.loanAmount,
        fundsAsAnnualIncome: userData.fundsAsAnnualIncome,
        fundsAsLiquidAmt: userData.fundsAsLiquidAmt,
        fundsAsProperty: userData.fundsAsProperty,
        relativesAbroad: userData.relativesAbroad,
        relativeSponsorReason: userData.relativeSponsorReason

    }
    const [isEducationLoan, setIsEducationLoan] = useState({});
    const [isRefusedVisa, setIsRefusedVisa] = useState(0);
    const [isRelativeAboard, setIsRelativeAboard] = useState(0);
    const loanAmountRegex = /\b\d{1,3}(,\d{3})*(\.\d+)?\b/;
    const propertyRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
    const amountRegex = /\b\d{1,3}(,\d{3})*(\.\d+)?\b/;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    let userDetail = useSelector((state) => state.saveVisaDetails);
    const [user, setUser] = useState({
        visaEarlierRefused: false,
        visaRefusalReason: "",
        needEducationLoan: false,
        loanAmount: 0,
        fundsAsAnnualIncome: 0,
        fundsAsLiquidAmt: 0,
        fundsAsProperty: 0,
        relativesAbroad: false,
        relativeSponsorReason: ""
    });

    function update(target, src) {
        const res = {};
        Object.keys(target)
              .forEach(k => res[k] = (src[k] ?? target[k]));
        return res;
      }

    const saveUserData = (event) => {
        const { name, value } = event.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        let t =update(userData, user); 
        dispatch(saveUserInfo(t));
        navigate("/submitEdit");
    };

    useEffect(() => {
        console.log(visaData)
        setUser(visaData);
    }, []);

    const backFunction = (e) => {
        navigate("/educationEdit");
    };

    const label = { inputProps: { "aria-label": "Checkbox demo" } };
    return (
        <Container maxWidth="mx" className={styles.containerFix}>
            <Grid item>
                <Grid item sx={{ flexWrap: "wrap" }}>
                    <Box className={styles.breadcrumFix}>
                        <Breadcrumbs maxItems={2} aria-label="breadcrumb">
                            <Link underline="hover" color="inherit" href="/">
                                Home
                            </Link>

                            <Typography color="text.primary">Academic</Typography>
                        </Breadcrumbs>
                    </Box>
                    <Box sx={{ width: "100%" }}>
                        <Steppers activeSteps={3}></Steppers>
                    </Box>
                </Grid>
                <Grid item>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            "& > :not(style)": {
                                mt: 8,
                                ml: 8,
                                width: "-webkit-fill-available",

                                mr: 8,
                            },
                        }}
                    >
                        <Paper elevation={3}>
                            <Grid item sx={{ pl: 10, pr: 10, flexWrap: "wrap", mt: 5 }}>
                                <Grid item sx={{ width: "fit-content" }}>
                                    <h5>Funds at your disposal(Amount in Rs.):</h5>
                                </Grid>

                                <Grid item sx={{ display: "flex", gap: 1, mt: 3 }}>
                                    <Grid item xs={8} sx={{ flex: 1 }}>

                                        <TextField
                                            id="outlined-basic"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            type="number"
                                            label="Liquid Amount"
                                            name="fundsAsLiquidAmt"
                                            onChange={saveUserData}
                                            value={user?.fundsAsLiquidAmt}
                                        />
                                        {/* )} */}
                                    </Grid>
                                    <Grid item xs={8} sx={{ flex: 1 }}>

                                        <TextField
                                            id="outlined-basic"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            type="number"
                                            name="fundsAsProperty"
                                            label="Property"
                                            onChange={saveUserData}
                                            value={user?.fundsAsProperty}
                                        />
                                        {/* )} */}
                                    </Grid>
                                    <Grid item xs={8} sx={{ flex: 1 }}>

                                        <TextField
                                            id="outlined-basic"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            type="number"
                                            name="fundsAsAnnualIncome"
                                            label="Annual Income"
                                            onChange={saveUserData}
                                            value={user?.fundsAsAnnualIncome}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid
                                    item
                                    sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}
                                >
                                    <Grid item sx={{ flex: 1 }}>
                                        <Grid item sx={{ display: "flex" }}>
                                            <h5>Do you need any Education Loan ?</h5>
                                        </Grid>
                                        <Grid item sx={{ display: "flex" }}>
                                            <Checkbox
                                                {...label}
                                                onChange={() =>
                                                    setUser({ ...user, needEducationLoan: true })
                                                }
                                                checked={user?.needEducationLoan ? true : false}
                                                name="Yesloan"
                                            />

                                            <p>Yes</p>
                                            <Checkbox
                                                {...label}
                                                onChange={() =>
                                                    setUser({ ...user, isneedEducationLoanEducationLoan: false })
                                                }
                                                checked={user?.needEducationLoan ? false : true}
                                                name="Noloan"
                                            />
                                            <p>No</p>
                                        </Grid>
                                        <Grid
                                            style={{
                                                display: user.needEducationLoan ? "flex" : "none",
                                            }}
                                        >
                                            <TextField
                                                id="outlined-basic"
                                                variant="outlined"
                                                size="small"
                                                fullWidth
                                                type="number"
                                                sx={{ mt: 1 }}
                                                label="Loan Amount in Rs."
                                                onChange={saveUserData}
                                                value={user?.loanAmount}
                                                name="loanAmount"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item sx={{ flex: 1 }}>
                                        <Grid item sx={{ display: "flex" }}>
                                            <h5>Have you been refused visa earlier?</h5>
                                        </Grid>
                                        <Grid item sx={{ display: "flex" }}>
                                            <Checkbox
                                                {...label}
                                                onChange={() =>
                                                    setUser({ ...user, visaEarlierRefused: true })
                                                }
                                                checked={user?.visaEarlierRefused ? true : false}
                                                name="yesvisa"
                                            />
                                            <p>Yes</p>
                                            <Checkbox
                                                {...label}
                                                onChange={() =>
                                                    setUser({ ...user, visaEarlierRefused: false })
                                                }
                                                checked={user?.visaEarlierRefused ? false : true}
                                                name="novisa"
                                            />
                                            <p>No</p>
                                        </Grid>
                                        <Grid>
                                            <Grid
                                                style={{
                                                    display: user.visaEarlierRefused ? "flex" : "none",
                                                }}
                                            >
                                                <TextField
                                                    id="outlined-basic"
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth
                                                    name="visaRefusalReason"
                                                    sx={{ mt: 1 }}
                                                    label="If yes,specify reason...."
                                                    onChange={saveUserData}
                                                    value={user?.visaRefusalReason}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item sx={{ flex: 1 }}>
                                        <Grid item sx={{ display: "flex" }}>
                                            <h5>Do you have relatives aboard?</h5>
                                        </Grid>

                                        <Grid item sx={{ display: "flex" }}>
                                            <Checkbox
                                                {...label}
                                                onChange={() =>
                                                    setUser({ ...user, relativesAbroad: true })
                                                }
                                                checked={user?.relativesAbroad ? true : false}
                                                name="yesaboard"
                                            />
                                            <p>Yes</p>
                                            <Checkbox
                                                {...label}
                                                onChange={() =>
                                                    setUser({ ...user, relativesAbroad: false })
                                                }
                                                checked={user?.relativesAbroad ? false : true}
                                                name="noaboard"
                                            />
                                            <p>No</p>
                                        </Grid>

                                        <Grid
                                            style={{
                                                display: user.relativesAbroad ? "flex" : "none",
                                            }}
                                        >
                                            <TextField
                                                id="outlined-basic"
                                                variant="outlined"
                                                size="small"
                                                fullWidth
                                                name="relativeSponsorReason"
                                                sx={{ mt: 1 }}
                                                label="If yes,whether they are sponsoring you?"
                                                onChange={saveUserData}
                                                value={user?.relativeSponsorReason}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid
                                    item
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        gap: 1,
                                        p: 2,
                                    }}
                                >
                                    <Grid item>
                                        <Button variant="outlined" onClick={backFunction}>
                                            Back
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="outlined" onClick={handleOnSubmit}>
                                            Next
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};
export default VisaEdit;
