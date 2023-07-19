import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import "./VisaDetails.css";
import Paper from "@mui/material/Paper";
import {
  Breadcrumbs,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Checkbox from "@mui/material/Checkbox";
import styles from "./VisaEnquiry.module.css";
import Steppers from "./Stepper";
import { useDispatch, useSelector } from "react-redux";
import { saveVisaDetail } from "../redux/action/Action";
import { useNavigate } from "react-router-dom";
const VisaDetails = () => {
  const steps = [
    "Personal Details ",
    "Education & Work Experience",
    "Visa Detail & Finance",
    "Submit Application",
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let userDetail = useSelector((state) => state.saveVisaDetails);
  let data = userDetail.visaDetail;
  console.log("data from redux", data);
  const [user, setUser] = useState({
    Amount: 0 || data?.Amount,
    Property: "" || data?.Property,
    Income: 0 || data?.Income,
    Loan: 0 || data?.Loan,
    reason: "" || data?.reason,
    aboardsponsoring: "" || data?.aboardsponsoring,
    isEducationLoan: false || data?.isEducationLoan,
    isRefusedVisa: false || data?.isRefusedVisa,
    isRelativeAboard: false || data?.isRelativeAboard,
  });
  const [isEducationLoan, setIsEducationLoan] = useState({});
  const [isRefusedVisa, setIsRefusedVisa] = useState(0);
  const [isRelativeAboard, setIsRelativeAboard] = useState(0);
  const loanRegex = /^(?:(?!0+$)\d+)?$/;
  const propertyRegex = /^(?:[A-Za-z]+(?:\s[A-Za-z]+)*)?$/;

  const [error, setError] = useState({
    Amount: "",
    Property: "",
    Income: "",
    Loan: "",
    reason: "",
    aboardsponsoring: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log("====>", typeof event.target.value, parseInt(value));

    if (name == "reason") {
      if (propertyRegex.test(value)) {
        setUser((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        setError((err) => ({
          ...err,
          reason: "",
        }));
      } else {
        setError((err) => ({
          ...err,
          reason: "Error",
        }));
      }
    }
    if (name == "aboardsponsoring") {
      if (propertyRegex.test(value)) {
        setUser((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        setError((err) => ({
          ...err,
          aboardsponsoring: "",
        }));
      } else {
        setError((err) => ({
          ...err,
          aboardsponsoring: "Error",
        }));
      }
    }
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const saveNumericalValue = (event) => {
    const { name, value } = event.target;
    console.log("====>", typeof event.target.value, parseInt(value));
    if (name === "Amount") {
      if (loanRegex.test(value)) {
        setUser((prevState) => ({
          ...prevState,
          [name]: parseInt(value),
        }));
        setError((err) => ({
          ...err,
          Amount: "",
        }));
      } else {
        setError((err) => ({
          ...err,
          Amount: "Error",
        }));
      }
    }
    if (name === "Property") {
      if (loanRegex.test(value)) {
        setUser((prevState) => ({
          ...prevState,
          [name]: parseInt(value),
        }));
        setError((err) => ({
          ...err,
          Property: "",
        }));
      } else {
        setError((err) => ({
          ...err,
          Property: "Error",
        }));
      }
    }
    if (name === "Income") {
      if (loanRegex.test(value)) {
        setUser((prevState) => ({
          ...prevState,
          [name]: parseInt(value),
        }));
        setError((err) => ({
          ...err,
          Income: "",
        }));
      } else {
        setError((err) => ({
          ...err,
          Income: "Error",
        }));
      }
    }
    if (name === "Loan") {
      if (loanRegex.test(value)) {
        setUser((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        setError((err) => ({
          ...err,
          Loan: "",
        }));
      } else {
        setError((err) => ({
          ...err,
          Loan: "Error",
        }));
      }
    } else {
      setUser((prevState) => ({
        ...prevState,
        [name]: parseInt(value),
      }));
    }
  };
  const saveBooleanValue = (event) => {
    const { name, value } = event.target;
    console.log("====>", typeof event.target, value);
  };
  console.log("-=-=-=-=-=-=", user);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (
      error.Amount === "Error" ||
      error.Property === "Error" ||
      error.Income === "Error"
      // user.Amount === undefined ||
      // user.Income === undefined ||
      // user.Property === undefined
    ) {
      alert("Please fill correct value in the fields");
      // } else if (
      //   user.isEducationLoan === undefined ||
      //   user.isRefusedVisa === undefined ||
      //   user.isRelativeAboard === undefined
      // ) {
      //   alert("Please select option feilds");
    } else if (
      (user.isEducationLoan && user.Loan === undefined) ||
      (user.isRefusedVisa && user.reason === undefined) ||
      (user.isRelativeAboard && user.aboardsponsoring === undefined)
    ) {
      alert("If you choose yes ,please specify the value....");
    } else {
      console.log("-=-=-=-=-=-=", user);
      dispatch(saveVisaDetail(user));
      navigate("/Submitapplication");
    }
    // Send the user data to the server here
  };
  const token = JSON.parse(localStorage.getItem("token"));
  console.log(token);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);
  const backFunction = (e) => {
    navigate("/Education");
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
                  <p>Funds at your disposal(Amount in Rs.):</p>
                </Grid>

                <Grid item sx={{ display: "flex", gap: 1, mt: 3 }}>
                  <Grid item xs={8} sx={{ flex: 1 }}>
                    <TextField
                      error={error.Amount}
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      fullWidth
                      label="Liquid Amount"
                      name="Amount"
                      value={user?.Amount || "" || data?.Amount}
                      onChange={saveNumericalValue}
                      helperText={
                        error.Amount ? "Please enter valid amount" : ""
                      }
                    />
                    {/* )} */}
                  </Grid>
                  <Grid item xs={8} sx={{ flex: 1 }}>
                    <TextField
                      error={error.Property}
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      fullWidth
                      name="Property"
                      label="Property"
                      onChange={saveNumericalValue}
                      value={user?.Property || "" || data?.Property}
                      helperText={
                        error.Property ? "Please enter valid property" : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={8} sx={{ flex: 1 }}>
                    <TextField
                      error={error.Income}
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      fullWidth
                      name="Income"
                      label="Annual Income"
                      onChange={saveNumericalValue}
                      value={user?.Income || "" || data?.Income}
                      helperText={
                        error.Income ? "Please enter valid Income" : ""
                      }
                    />
                  </Grid>
                </Grid>

                <Grid
                  item
                  sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 5 }}
                >
                  <Grid item sx={{ flex: 1 }}>
                    <Grid item sx={{ display: "flex" }}>
                      <p>Do you need any Education Loan ?</p>
                    </Grid>
                    <Grid
                      item
                      sx={{ display: "flex", alignItems: "center", mt: 2 }}
                    >
                      <Checkbox
                        {...label}
                        onChange={() =>
                          setUser({ ...user, isEducationLoan: true })
                        }
                        checked={user?.isEducationLoan ? true : false}
                        name="Yesloan"
                        // name="isEducationLoan"
                      />

                      <p>Yes</p>
                      <Checkbox
                        {...label}
                        onChange={() =>
                          setUser({ ...user, isEducationLoan: false })
                        }
                        checked={user?.isEducationLoan ? false : true}
                        name="Noloan"
                        // name="isEducationLoan"
                      />
                      <p>No</p>
                    </Grid>

                    <Grid
                      style={{
                        display: user.isEducationLoan ? "flex" : "none",
                      }}
                    >
                      <TextField
                        error={error.Loan}
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{ mt: 1 }}
                        label="Loan Amount in Rs."
                        onChange={saveNumericalValue}
                        value={user?.Loan || "" || data?.Loan}
                        name="Loan"
                        helperText={
                          error.Loan ? "Please provide valid loam amount" : ""
                        }
                      />
                      {/* )} */}
                    </Grid>
                  </Grid>

                  <Grid item sx={{ flex: 1 }}>
                    <Grid item sx={{ display: "flex" }}>
                      <p>Have you been refused visa earlier?</p>
                    </Grid>
                    <Grid
                      item
                      sx={{ display: "flex", alignItems: "center", mt: 2 }}
                    >
                      <Checkbox
                        {...label}
                        onChange={() =>
                          setUser({ ...user, isRefusedVisa: true })
                        }
                        checked={user?.isRefusedVisa ? true : false}
                        name="yesvisa"
                      />
                      <p>Yes</p>
                      <Checkbox
                        {...label}
                        onChange={() =>
                          setUser({ ...user, isRefusedVisa: false })
                        }
                        checked={user?.isRefusedVisa ? false : true}
                        name="novisa"
                      />
                      <p>No</p>
                    </Grid>

                    <Grid>
                      <Grid
                        style={{
                          display: user.isRefusedVisa ? "flex" : "none",
                        }}
                      >
                        <TextField
                          id="outlined-basic"
                          error={error.reason}
                          variant="outlined"
                          size="small"
                          fullWidth
                          name="reason"
                          sx={{ mt: 1 }}
                          label="If yes,specify reason...."
                          onChange={handleInputChange}
                          value={user?.reason || "" || data?.reason}
                          helperText={
                            error.reason ? "Please enter a valid reason" : ""
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item sx={{ flex: 1 }}>
                    <Grid item sx={{ display: "flex" }}>
                      <p>Do you have relatives aboard?</p>
                    </Grid>

                    <Grid
                      item
                      sx={{ display: "flex", alignItems: "center", mt: 2 }}
                    >
                      <Checkbox
                        {...label}
                        onChange={() =>
                          setUser({ ...user, isRelativeAboard: true })
                        }
                        checked={user?.isRelativeAboard ? true : false}
                        name="yesaboard"
                      />
                      <p>Yes</p>
                      <Checkbox
                        {...label}
                        onChange={() =>
                          setUser({ ...user, isRelativeAboard: false })
                        }
                        checked={user?.isRelativeAboard ? false : true}
                        name="noaboard"
                      />
                      <p>No</p>
                    </Grid>

                    <Grid
                      style={{
                        display: user.isRelativeAboard ? "flex" : "none",
                      }}
                    >
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        fullWidth
                        error={error.aboardsponsoring}
                        name="aboardsponsoring"
                        sx={{ mt: 1 }}
                        label="If yes,whether they are sponsoring you?"
                        onChange={handleInputChange}
                        value={user?.aboardsponsoring}
                        helperText={
                          error.aboardsponsoring
                            ? "Please provide valid relative name "
                            : ""
                        }
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
export default VisaDetails;
