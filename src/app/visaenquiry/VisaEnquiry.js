import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import {
  Link,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Paper,
} from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import styles from "./VisaEnquiry.module.css";
import Steppers from "./Stepper";
import { savePersonalDetail } from "../redux/action/Action";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { VISA_URL } from "../../constant/constants";
import { dateFormatter } from "../../utils/helper";
import { useLocation } from "react-router-dom";

const VisaEnquiry = () => {
  const [salutation, setSalutation] = React.useState("Salutation");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  let userDetail = useSelector((state) => state.savePersonalDetails);
  let data = userDetail.personalDetail;
  console.log(data.DOB)

  const phoneRegex =
    /^(\+1)?[-.\s]?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/;
  const mobileRegex = /^(?:[6789]\d{9})?$/;
  const nameRegex = /^(?!.*\s{2,})[a-zA-Z\s]{0,50}$/;
  const pancardRegex = /^(?:[A-Z]{5}[0-9]{4}[A-Z])?$/;
  const passpostRegex = /^(?:[A-Z]\d{7})?$/;
  const emailRegex = /^(?:[^\s@]+@[^\s@]+\.[^\s@]+)?$/;
  const adharcardRegex = /^(?:(?!0{12}$)\d{12})?$/;
  const addressRegex = /^(?:(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\s/,]{0,100})?$/;
  const [error, setError] = useState({
    Mobile: "",
    Name: "",
    FatherName: "",
    Pancard: "",
    Email: "",
    Passport: "",
    Aadhar: "",
    DOB: "",
    Address: "",
  });
  const [countryList, setCountryList] = useState();
  const [country, setCountry] = useState("");
  const [univ, setUniv] = useState("");
  const [universityList, setUniversityList] = useState();
  const [user, setUser] = useState({
    Mobile: "",
    Name: "",
    FatherName: "",
    Pancard: "",
    Email: "",
    Passport: "",
    Aadhar: "",
    DOB: "",
    Address: "",
    Salutation: "",
    Visa: "",
    Gender: "" || data?.Gender,
    Marital: "" || data?.Marital,
    country: "" || data?.country,
    university: "" || data?.university,
  });
  const token = JSON.parse(localStorage.getItem("token"));

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name);
    console.log(value);
    if (name == "Phone") {
      if (phoneRegex.test(value)) {
        setUser((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        setError((err) => ({
          ...err,
          Phone: "",
        }));
      } else {
        setError((err) => ({
          ...err,
          Phone: "Error",
        }));
      }
    }
    if (name == "Mobile") {
      if (mobileRegex.test(value)) {
        setUser((prevState) => ({
          ...prevState,
          [name]: parseInt(value),
        }));

        setError((err) => ({
          ...err,
          Mobile: "",
        }));
      } else {
        setError((err) => ({
          ...err,
          Mobile: "Error",
        }));
      }
    }

    if (name === "Name") {
      if (nameRegex.test(value)) {
        setUser((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        setError((err) => ({
          ...err,
          Name: "",
        }));
      } else {
        setError((err) => ({
          ...err,
          Name: "Error",
        }));
      }
    }
    if (name === "FatherName") {
      if (nameRegex.test(value)) {
        setUser((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        setError((err) => ({
          ...err,
          FatherName: "",
        }));
      } else {
        setError((err) => ({
          ...err,
          FatherName: "Error",
        }));
      }
    }
    if (name == "Pancard") {
      if (pancardRegex.test(value)) {
        setUser((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        setError((err) => ({
          ...err,
          Pancard: "",
        }));
      } else {
        setError((err) => ({
          ...err,
          Pancard: "Error",
        }));
      }
    }
    if (name == "Email") {
      if (emailRegex.test(value)) {
        setUser((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        setError((err) => ({
          ...err,
          Email: "",
        }));
      } else {
        setError((err) => ({
          ...err,
          Email: "Error",
        }));
      }
    }
    if (name == "Passport") {
      if (passpostRegex.test(value)) {
        setUser((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        setError((err) => ({
          ...err,
          Passport: "",
        }));
      } else {
        setError((err) => ({
          ...err,
          Passport: "Error",
        }));
      }
    }
    if (name == "Aadhar") {
      if (adharcardRegex.test(value)) {
        setUser((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        setError((err) => ({
          ...err,
          Aadhar: "",
        }));
      } else {
        setError((err) => ({
          ...err,
          Aadhar: "Error",
        }));
      }
    }
    if (name == "Address") {
      //if (addressRegex.test(value)) {
        if (value.length<200) {
        setUser((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        setError((err) => ({
          ...err,
          Address: "",
        }));
      } else {
        setError((err) => ({
          ...err,
          Address: "Error",
        }));
      }
    }
    if (name === "DOB") {
      setUser((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    if (name === "country") {
      let countryName = countryList.find((o) => o._id === value);
      setCountry(countryName.country);
      setUser((prevState) => ({
        ...prevState,
        [name]: value,
        countryname: countryName.country,
      }));
    }
    if (name === "university") {
      console.log("UNIVERSITY", value);

      let univName = universityList?.find((o) => o._id === value);
      console.log("univName", univName.name);
      setUniv(univName.name);

      setUser((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (
      error.Phone === "Error" ||
      error.Aadhar === "Error" ||
      error.Address === "Error" ||
      error.Email === "Error" ||
      error.FatherName === "Error" ||
      error.Mobile === "Error" ||
      error.Name === "Error" ||
      error.Pancard === "Error" ||
      error.Passport === "Error" ||
      user.Aadhar === undefined ||
      user.Address === undefined ||
      user.DOB === undefined ||
      user.Email === undefined ||
      user.FatherName === undefined ||
      user.Gender === undefined ||
      user.Marital === undefined ||
      user.Mobile === undefined ||
      user.Name === undefined ||
      user.Pancard === undefined ||
      user.Passport === undefined ||
      user.Salutation === undefined ||
      user.Visa === undefined ||
      user.country === undefined ||
      user.university === undefined
    ) {
      alert("Please fill all the fields");
    } else {
      dispatch(savePersonalDetail(user));
      console.log("user", user);
      navigate("/UploadImages");
    }
  };

  const selectCountry = async () => {
    let userArray = [];
    const countryList = await axios.post(
      `${VISA_URL}/users/getCountries`,
      {
        country: "",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(countryList?.data?.counrtries);
    setCountryList(countryList?.data?.counrtries);
  };

  const selectUniversity = async () => {
    let userArray = [];
    const universityList = await axios.get(
      `${VISA_URL}/users/getUniversities`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    setUniversityList(universityList?.data?.apiRes);
    console.log(universityList);
  };
  useEffect(() => {
    selectCountry();
    selectUniversity();
    if (data) setUser(data);
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <Container maxWidth="mx" sx={{ padding: "12px" }}>
      <Grid item>
        <Box className={styles.breadcrumFix}>
          <Breadcrumbs maxItems={2} aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Typography color="text.primary">Personal</Typography>
          </Breadcrumbs>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Steppers activeSteps={0}></Steppers>
        </Box>
        <Grid>
          <Box
            sx={{
              display: "flex",
              //   flexWrap: "wrap",
              "& > :not(style)": {
                mt: 8,
                ml: 8,
                mr: 8,
                width: "-webkit-fill-available",
                pb: 2,
              },
            }}
          >
            <Paper elevation={3}>
              <Grid sx={{ width: "fit-content",pt:3,pl:10 }}>
              <p>
                Personal detail
              </p></Grid>
              <Grid container spacing={1} pl={8} pr={8}>
                <Grid item xs={12} sm={4} p={2}>
                  <FormControl
                    sx={{ textAlign: "left" }}
                    size="small"
                    fullWidth
                  >
                    <InputLabel id="demo-simple-select-helper-label">
                      Salutation
                    </InputLabel>
                    <Select
                      shrink={true}
                      labelId="demo-simple-select-helper-label"
                      id="outlined-required"
                      label="Salutation"
                      name="Salutation"
                      fullWidth
                      defaultValue=""
                      value={user?.Salutation || "" || data?.Salutation}
                      onChange={handleInputChange}
                    >
                      <MenuItem value={"Mr"}>Mr</MenuItem>
                      <MenuItem value={"Mrs"}>Mrs</MenuItem>
                      <MenuItem value={"Miss"}>Miss</MenuItem>
                    </Select>
                  </FormControl>
                  {/* </TextField> */}
                </Grid>
                <Grid item xs={12} sm={4} p={2}>
                  {/* {error.Name ? ( */}
                  <TextField
                    error={error.Name}
                    // shrink={true}
                    size="small"
                    required
                    fullWidth
                    id="outlined-required"
                    label="Name"
                    name="Name"
                    value={user?.Name}
                    onChange={handleInputChange}
                    helperText={error.Name ? "Please enter a valid name." : ""}
                  />
                </Grid>
                <Grid item xs={12} sm={4} p={2}>
                  {/* {error.FatherName ? ( */}
                  <TextField
                    error={error.FatherName}
                    required
                    size="small"
                    fullWidth
                    id="outlined-required"
                    label="Father Name"
                    name="FatherName"
                    value={user?.FatherName}
                    onChange={handleInputChange}
                    helperText={
                      error.FatherName ? "Please enter a valid name." : ""
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={4} p={2}>
                  {/* {error.Address ? ( */}
                  <TextField
                    error={error.Address}
                    required
                    size="small"
                    fullWidth
                    id="outlined-required"
                    label="Address"
                    name="Address"
                    value={user?.Address }
                    onChange={handleInputChange}
                    helperText={
                      error.Address ? "Please provide a valid address" : ""
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={4} p={2}>
             
                  <TextField
                    error={error.Mobile}
                    required
                    fullWidth
                    size="small"
                    id="outlined-required"
                   
                    label="Mobile Number"
                    name="Mobile"
                    value={user?.Mobile}
                    onChange={handleInputChange}
                    inputProps={{
                      maxLength: 10
                    }}
                    helperText={
                      error.Mobile ? "Please provide valid Mobile Number" : ""
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={4} p={2}>
                 
                  <TextField
                    error={error.Email}
                    required
                    fullWidth
                    size="small"
                    id="outlined-required"
                    label="Email"
                    name="Email"
                    value={user?.Email}
                    onChange={handleInputChange}
                    helperText={
                      error.Email ? "Please provide a valid email address" : ""
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={4} p={2}>
                  {/* {error.Aadhar ? ( */}
                  <TextField
                    error={error.Aadhar}
                    required
                    size="small"
                    fullWidth
                    id="outlined-required"
                    label="Aadhar Number"
                    name="Aadhar"
                    inputProps={{
                      maxLength: 12
                    }}
                    value={user?.Aadhar}
                    onChange={handleInputChange}
                    helperText={
                      error.Aadhar
                        ? "Please provide a valid Aadhar Number 123445677890"
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={4} p={2}>
                  {/* {error.Passport ? ( */}
                  <TextField
                    error={error.Passport}
                    required
                    fullWidth
                    size="small"
                    id="outlined-required"
                    label="Passport Number"
                    name="Passport"
                    inputProps={{
                      maxLength: 8
                    }}
                    value={user?.Passport}
                    onChange={handleInputChange}
                    helperText={
                      error.Passport
                        ? "Enter the valid passport  A1234567"
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={4} p={2}>
                  {/* {error.Pancard ? ( */}
                  <TextField
                    error={error.Pancard}
                    required
                    size="small"
                    fullWidth
                    id="outlined-required"
                    label="Pancard Number"
                    name="Pancard"
                    value={user?.Pancard}
                    onChange={handleInputChange}
                    helperText={
                      error.Pancard ? "Enter the valid pancard ABCDE12" : ""
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={4} p={2}>
                  <TextField
                    label="DOB"
                    type="date"
                    fullWidth
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="DOB"
                    value={user?.DOB }
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4} p={2}>
                  <FormControl
                    sx={{ textAlign: "left" }}
                    size="small"
                    fullWidth
                  >
                    <InputLabel id="demo-simple-select-helper-label">
                      Visa Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="outlined-required"
                      label="Salutation"
                      name="Visa"
                      defaultValue=""
                      value={user?.Visa}
                      onChange={handleInputChange}
                    >
                      <MenuItem value={"Tourist"}>Tourist</MenuItem>
                      <MenuItem value={"Study"}>Study</MenuItem>
                      <MenuItem value={"Work"}>Work</MenuItem>
                      <MenuItem value={"Business"}>Business</MenuItem>
                      <MenuItem value={"PR"}>PR(Permanent Resident)</MenuItem>
                      <MenuItem value={"Onshore"}>OnShore</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} p={2}>
                  <FormControl
                    sx={{ textAlign: "left" }}
                    size="small"
                    fullWidth
                  >
                    <InputLabel id="demo-simple-select-helper-label">
                      Gender
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="outlined-required"
                      label="Gender"
                      defaultValue=""
                      name="Gender"
                      value={user?.Gender}
                      onChange={handleInputChange}
                    >
                      <MenuItem value={"Male"}>Male</MenuItem>
                      <MenuItem value={"Female"}>Female</MenuItem>
                      <MenuItem value={"Other"}>Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} p={2}>
                  <FormControl
                    sx={{ textAlign: "left" }}
                    size="small"
                    fullWidth
                  >
                    <InputLabel id="demo-simple-select-helper-label">
                      Marital Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="outlined-required"
                      label="Marital Status"
                      name="Marital"
                      defaultValue=""
                      value={user?.Marital}
                      onChange={handleInputChange}
                    >
                      <MenuItem value={"Married"}>Married</MenuItem>
                      <MenuItem value={"Unmarried"}>Unmarried</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} p={2}>
                  <FormControl
                    sx={{ textAlign: "left" }}
                    size="small"
                    fullWidth
                  >
                    <InputLabel
                      id="demo-simple-select-helper-label"
                      sx={{ fontSize: 16 }}
                    >
                      Country
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="outlined-required"
                      label="Country"
                      name="country"
                      fullWidth
                      defaultValue=""
                      value={user?.country || country}
                      onChange={handleInputChange}
                    >
                      {console.log("country", user?.country)}
                      {countryList?.map((items) => {
                        return (
                          <MenuItem value={items._id}>{items.country}</MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} p={2}>
                  <FormControl
                    sx={{ textAlign: "left" }}
                    size="small"
                    fullWidth
                  >
                    <InputLabel
                      id="demo-simple-select-helper-label"
                      sx={{ fontSize: 16 }}
                    >
                      University
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="outlined-required"
                      label="University"
                      name="university"
                      fullWidth
                      defaultValue=""
                      value={user?.university || univ}
                      onChange={handleInputChange}
                    >
                      {universityList?.map((items) => {
                        return (
                          <MenuItem value={items._id}>{items.name}</MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} p={2}>
                  <Grid container spacing={1} sx={{ justifyContent: "center" }}>
                    <Grid item xs={12} sm={6} p={1}>
                      <Button variant="outlined" onClick={handleOnSubmit}>
                        Next
                      </Button>
                    </Grid>
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

export default VisaEnquiry;
