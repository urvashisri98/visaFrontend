import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { connect } from "react-redux";
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
import styles from "../visaenquiry/VisaEnquiry.module.css";

import Steppers from "../visaenquiry/Stepper";
import { savePersonalDetail , saveUserInfo} from "../redux/action/Action";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { VISA_URL } from "../../constant/constants";
import { dateFormatter } from "../../utils/helper";
import {useLocation} from 'react-router-dom';

const PersonalEdit = () => {
  const [salutation, setSalutation] = React.useState("Salutation");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  let userDetail = useSelector((state) => state.savePersonalDetails);
  let data = userDetail.personalDetail;

  let temp = useSelector((state) => state.saveUserInfo);
  let userInfo = temp.userInfo;

  const phoneRegex =
    /^(\+1)?[-.\s]?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/;
  const mobileRegex = /^[6789]\d{9}$/;
  const nameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
  const pancardRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passpostRegex = /^[A-Z0-9<]{6,15}$/;
  const adharcardRegex = /^\d{4}\d{4}\d{4}$/;
  const [error, setError] = useState({
    studentId:"",
    aadharNo:"",
    address:"",
    dob:"",
    email:"",
    fatherName:"",
    gender:"",
    name:"",
    maritalStatus:"",
    mobileNo:"",
    passportNo:"",
    panNo:"",
    salutation:"",
    visaType:"",
    country:"",
    university:""
  });
  const [countryList, setCountryList] = useState();
  const [country, setCountry] = useState('');
  const [univ, setUniv] = useState('');
  const [universityList, setUniversityList] = useState();
  const [user, setUser] = useState({
    mobileNo: "" || data?.mobileNo,
    name: "" || data?.name,
    fatherName: "" || data?.fatherName,
    panNo: "" || data?.panNo,
    email: "" || data?.Email,
    passportNo: "" || data?.PassportNo,
    aadharNo: "" || data?.aadharNo,
    dob: "" || data?.dob,
    address: "" || data?.address,
    salutation: "" || data?.salutation,
    visaType: "" || data?.visaType,
    gender: "" || data?.gender,
    maritalStatus: "" || data?.maritalStatus,
    country: "" || data?.country,
    university: "" || data?.university,
  });
  const token = JSON.parse(localStorage.getItem("token"));

  const handleInputChange = (event) => {
    const { name, value } = event.target;
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
    if (name == "mobileNo") {
      if (mobileRegex.test(value)) {
        setUser((prevState) => ({
          ...prevState,
          [name]: parseInt(value),
        }));
        setError((err) => ({
          ...err,
          mobileNo: "",
        }));
      } else {
        setError((err) => ({
          ...err,
          mobileNo: "Error",
        }));
      }
    }
    if (name == "name") {
      if (nameRegex.test(value)) {
        setUser((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        setError((err) => ({
          ...err,
          name: "",
        }));
      } else {
        setError((err) => ({
          ...err,
          name: "Error",
        }));
      }
    }
    if (name == "fatherName") {
      if (nameRegex.test(value)) {
        setUser((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        setError((err) => ({
          ...err,
          fatherName: "",
        }));
      } else {
        setError((err) => ({
          ...err,
          fatherName: "Error",
        }));
      }
    }
    if (name == "panNo") {
      if (pancardRegex.test(value)) {
        setUser((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        setError((err) => ({
          ...err,
          panNo: "",
        }));
      } else {
        setError((err) => ({
          ...err,
          panNo: "Error",
        }));
      }
    }
    if (name == "email") {
      if (emailRegex.test(value)) {
        setUser((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        setError((err) => ({
          ...err,
          email: "",
        }));
      } else {
        setError((err) => ({
          ...err,
          email: "Error",
        }));
      }
    }
    if (name == "passportNo") {
      if (passpostRegex.test(value)) {
        setUser((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        setError((err) => ({
          ...err,
          passportNo: "",
        }));
      } else {
        setError((err) => ({
          ...err,
          passportNo: "Error",
        }));
      }
    }
    if (name == "aadharNo") {
      if (adharcardRegex.test(value)) {
        setUser((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        setError((err) => ({
          ...err,
          aadharNo: "",
        }));
      } else {
        setError((err) => ({
          ...err,
          aadharNo: "Error",
        }));
      }
    }
    if (name === "dob") {
      setUser((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    if (name === "country") {
      let countryName = countryList.find(o => o._id === value);
      setCountry(countryName.country);
      setUser((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    if (name === "country") {
      let countryName = countryList.find(o => o._id === value);
      setCountry(countryName.country);
      setUser((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    if (name === "university") {
      console.log(value)

      let univName = universityList?.find(o => o._id === value);
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
      error.mobileNo === "Error" ||
      error.aadharNo === "Error" ||
      error.address === "Error" ||
      error.email === "Error" ||
      error.fatherName === "Error" ||
      error.mobileNo === "Error" ||
      error.name === "Error" ||
      error.panNo === "Error" ||
      error.passportNo === "Error" ||
      user.aadharNo === undefined ||
      user.address === undefined ||
      user.dob === undefined ||
      user.email === undefined ||
      user.fatherName === undefined ||
      user.gender === undefined ||
      user.maritalStatus === undefined ||
      user.mobileNo === undefined ||
      user.name === undefined ||
      user.panNo === undefined ||
      user.passportNo === undefined ||
      user.salutation === undefined ||
      user.visaType === undefined
    ) {
      alert("Please fill all the fields");
    } else {


      //dispatch(saveUserInfo(result?.data?.data));
      userInfo.address=user.address;
      userInfo.studentId=location.state.studentId;
      delete userInfo["_id"];

      let t =update(userInfo, user);  
      console.log(t)

      dispatch(savePersonalDetail(user));
      dispatch(saveUserInfo(t));
      navigate("/documentEdit");
    }
  };

  function update(target, src) {
    const res = {};
    Object.keys(target)
          .forEach(k => res[k] = (src[k] ?? target[k]));
    return res;
  }
  

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
    console.log(universityList)

  };
  useEffect(() => {
    selectCountry();
    selectUniversity();
    if (!token) {
      navigate("/login");
    }
    if(location.state && location.state.studentId){
      console.log("geting for" ,location.state.studentId)
      studentsData(location.state.studentId);
    }

  }, [


  ]);

  const studentsData = async (studentId) => {
    const result = await axios.get(
      `${VISA_URL}/users/getStudent?studentId=${studentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (result?.data?.data) {
    
      let data = {
        aadharNo:result?.data?.data.aadharNo,
        address : result?.data?.data.address,
        dob :  result?.data?.data.dob,
        email : result?.data?.data.email,
        fatherName :  result?.data?.data.fatherName,
        gender :  result?.data?.data.gender,
        maritalStatus :  result?.data?.data.maritalStatus,
        mobileNo :  result?.data?.data.mobileNo,
        name:  result?.data?.data.name,
        panNo :  result?.data?.data.panNo,
        passportNo :  result?.data?.data.passportNo,
        salutation :  result?.data?.data.salutation,
        country:  result?.data?.data.country._id,
        university: result?.data?.data.university._id,
        visaType: result?.data?.data.visaType
      }
        setCountry(result?.data?.data.country._id);

        setUser(data);
        dispatch(saveUserInfo(result?.data?.data));
        console.log(userInfo);
        
        
      // setPreviewData(result?.data?.apiRes);
      // setWorkExperience(result?.data?.apiRes.workExperience);
      // setEducation(result?.data?.apiRes.education);
      // console.log("education", education);
    }
    
  };
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
              <h5 style={{ width: "fit-content", marginLeft: "70px" }}>
                Personal detail
              </h5>
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
                      name="salutation"
                      fullWidth
                      defaultValue=""
                      value={user?.Salutation || "" }
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
                  
                    <TextField
                      size="small"
                      required
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      id="outlined-required"
                      label="Name"
                      name="name"
                      value={user?.name}
                      onChange={handleInputChange}
                    />
                 
                </Grid>
                <Grid item xs={12} sm={4} p={2}>
                 
                    <TextField
                      required
                      InputLabelProps={{ shrink: true }}

                      size="small"
                      id="outlined-required"
                      fullWidth
                      label="Father Name"
                      name="fatherName"
                      value={user?.fatherName }
                      onChange={handleInputChange}
                    />
                
                </Grid>
                <Grid item xs={12} sm={4} p={2}>
                 
                    <TextField
                      required
                      InputLabelProps={{ shrink: true }}
                      size="small"
                      id="outlined-required"
                      label="Address"
                      fullWidth
                      name="address"
                      value={user?.address || "" || data?.Address}
                      onChange={handleInputChange}
                    />
              
                </Grid>
                <Grid item xs={12} sm={4} p={2}>
                  
                    <TextField
                      required
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      size="small"
                      id="outlined-required"
                      label="Mobile Number"
                      name="mobileNo"
                      value={user?.mobileNo}
                      onChange={handleInputChange}
                    />
                </Grid>

                <Grid item xs={12} sm={4} p={2}>
                  
                    <TextField
                      required
                      InputLabelProps={{ shrink: true }}
                      size="small"
                      fullWidth
                      id="outlined-required"
                      label="Email"
                      name="email"
                      value={user?.email || data?.Email}
                      onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={4} p={2}>
                  
                    <TextField
                      required
                      InputLabelProps={{ shrink: true }}
                      size="small"
                      id="outlined-required"
                      label="Aadhar"
                      name="aadharNo"
                      fullWidth
                      value={user?.aadharNo}
                      onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={4} p={2}>
                  
                    <TextField
                      required
                      InputLabelProps={{ shrink: true }}
                      size="small"
                      fullWidth
                      id="outlined-required"
                      label="Passport"
                      name="passport"
                      value={user?.passportNo}
                      onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={4} p={2}>
                 
                    <TextField
                      required
                      InputLabelProps={{ shrink: true }}
                      size="small"
                      fullWidth
                      id="outlined-required"
                      label="Pancard"
                      name="panNo"
                      value={user?.panNo }
                      onChange={handleInputChange}
                    />
                  
                </Grid>
                <Grid item xs={12} sm={4} p={2}>

                  <TextField
                    label="DOB"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    name="dob"
                    value={user?.dob}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4} p={2}>
                  {user.visaType &&
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
                      name="visaType"
                      defaultValue=""
                      value={user?.visaType}
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
}
                </Grid>
                <Grid item xs={12} sm={4} p={2}>
                  {user.gender &&
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
                      // value={'VisaType'}
                      label="Gender"
                      defaultValue={user?.gender}
                      // onChange={handleChange}
                      name="gender"
                      value={user?.gender}
                      onChange={handleInputChange}
                    >
                      <MenuItem value={"Male"}>Male</MenuItem>
                      <MenuItem value={"Female"}>Female</MenuItem>
                      <MenuItem value={"Other"}>Other</MenuItem>
                    </Select>
                  </FormControl>
}
                </Grid>
                <Grid item xs={12} sm={4} p={2}>
                  {user?.maritalStatus &&
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
                      // value={'VisaType'}
                      label="Marital Status"
                      // onChange={handleChange}
                      name="maritalStatus"
                      defaultValue=""
                      value={user?.maritalStatus}
                      onChange={handleInputChange}
                    >
                      <MenuItem value={"Married"}>Married</MenuItem>
                      <MenuItem value={"Unmarried"}>Unmarried</MenuItem>
                    </Select>
                  </FormControl>

}
                </Grid>
                <Grid item xs={12} sm={4} p={2}>
                {user.country &&  
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
                      value={user?.country}
                      onChange={handleInputChange}

                    >
                      {countryList?.map((items) => {
                        return <MenuItem value={items._id}>{items.country}</MenuItem>;
                      })}
                    </Select>
                  </FormControl>
}
                </Grid>
                <Grid item xs={12} sm={4} p={2}>
                {user.university &&  
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
                      value={user?.university}
                      onChange={handleInputChange}

                    >
                      {universityList?.map((items) => {
                        return <MenuItem value={items._id}>{items.name}</MenuItem>;
                      })}
                    </Select>
                  </FormControl>
}
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

export default PersonalEdit;


