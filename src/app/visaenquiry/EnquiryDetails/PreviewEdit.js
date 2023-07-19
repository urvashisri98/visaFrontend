import React, { useEffect, useState } from "react";
import "./EnquiryDetails.css";
import Grid from "@mui/material/Grid";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Box from "@mui/material/Box";
import { margin } from "@mui/system";

import DummyProfilePic from "./../../../images/dummy-profile-pic.png";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { VISA_URL } from "../../../constant/constants";
import { dateFormatter } from "../../../utils/helper";

export const PreviewEdit = () => {
  const [previewData, setPreviewData] = useState();
  const [education, setEducation] = useState([]);
  const [workExperience, setWorkExperience] = useState([]);
  const [status, setStatus] = useState("");
  const [editable, setEditable] = useState(true);
  const [assignedTo, setAssignedTo] = useState("");
  const [editStudent, setEditStudent] = useState();
  const [updateData, setUpdateData] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const [displayHistory, setDisplayHistory] = useState(false);
  const [recentComment, setRecentComment] = useState("");
  const token = JSON.parse(localStorage.getItem("token"));
  console.log(token);
  //   const options = [
  //     { value: "chocolate", label: "Chocolate" },
  //     { value: "strawberry", label: "Strawberry" },
  //     { value: "vanilla", label: "Vanilla" },
  //   ];
  const studentsData = async (studentId) => {
    console.log("===>", studentId);
    const result = await axios.get(
      `${VISA_URL}/users/getStudent?studentId=${studentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("result === ", result?.data?.apiRes);
    if (result?.data?.apiRes) {
      setPreviewData(result?.data?.apiRes);
      setWorkExperience(result?.data?.apiRes.workExperience);
      setEducation(result?.data?.apiRes.education);
      console.log("education", education);
    }
  };

  useEffect(() => {
    console.log(location.state);
    console.log("data from list", location.state.studentId);
    if (!token) {
      navigate("/login");
    }
    if (location?.state?.studentId) {
      //   studentsData(location.state.studentId);
      console.log("Student id from use effect", location?.state?.studentId);
      studentsData(location?.state?.studentId);
      setEditable(location?.state?.editable);

      //   console.log("Editable=====>",editable,location?.state?.editable)
    }
  }, []);
  const onBack = () => {
    navigate("/EnquiriesList");
  };
  const edit = () => {
    // navigate("/EnquiriesList");
    console.log("edit");
    // setEditable(false);
  };
 
  const phoneRegex =
  /^(\+1)?[-.\s]?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/;
const mobileRegex = /^[6789]\d{9}$/;
const nameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
const pancardRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passpostRegex = /^[A-Z0-9<]{6,15}$/;
const adharcardRegex = /^\d{4}\d{4}\d{4}$/;
  const [error, setError] = useState({
    mobileNo: "",
    name: "",
    FatherName: "",
    panNo: "",
    email: "",
    passportNo: "",
    aadharNo: "",
    dob: "",
    Address: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // console.log("====>", name,value,event);
    if (name == "Phone") {
      if (phoneRegex.test(value)) {
        setPreviewData((prevState) => ({
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
        setPreviewData((prevState) => ({
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
        setPreviewData((prevState) => ({
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
    if (name == "FatherName") {
      if (nameRegex.test(value)) {
        setPreviewData((prevState) => ({
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
    if (name == "panNo") {
      if (pancardRegex.test(value)) {
        setPreviewData((prevState) => ({
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
        setPreviewData((prevState) => ({
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
        setPreviewData((prevState) => ({
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
        setPreviewData((prevState) => ({
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
      setPreviewData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    setPreviewData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
 // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   console.log("====>", name, value);
  //   setPreviewData((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  //   console.log("PreviewData", previewData);
  // };

  const userData = {
    name: previewData?.name,
    country: previewData?.country[0]?.country,
    university: previewData?.university?.name,
    fatherName: previewData?.fatherName,
    gender: previewData?.gender,
    maritalStatus: previewData?.Marital,
    address: previewData?.address,
    mobileNo: previewData?.mobileNo,
    email: previewData?.email,
    dob: previewData?.dob,
    passportNo: previewData?.passportNo,
    aadharNo: previewData?.aadharNo,
    panNo: previewData?.panNo,
    visaType: previewData?.visaType,
    education: education,
    workExperience: workExperience,
    testTaken: previewData?.testTaken,
    fundsAsLiquidAmt: previewData?.fundsAsLiquidAmt,
    fundsAsProperty: previewData?.fundsAsProperty,
    fundsAsAnnualIncome: previewData?.fundsAsAnnualIncome,
    needEducationLoan: previewData?.needEducationLoan,
    loanAmountRs: previewData?.loanAmountRs,
    visaEarlierRefused: previewData?.visaEarlierRefused,
    visaRefusalReson: previewData?.visaRefusalReson,
    relativesAbroad: previewData?.relativesAbroad,
    relativeSponsorReason: previewData?.relativeSponsorReason,
    newspaper: previewData?.newspaper,
    magazine: previewData?.magazine,
    radio: previewData?.radio,
    seminar: previewData?.seminar,
    friends: previewData?.friends,
    internet: previewData?.internet,
    others: previewData?.others,
    reference: previewData?.reference,
    declaration: previewData?.declaration,
  };

  console.log("===>Idddddd", userData);
  console.log(userData?.education[0]?._id);
  const onPutAPI = async (studentId) => {
    console.log("edudation ====", education);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const result = await axios.put(
      `${VISA_URL}/users/editStudent?studentId=${studentId}`,

      userData,
      config
    );
    if (result?.data?.response === "success") {
      alert("data updated successfully");
      navigate("/EnquiriesList");
    }
    
    console.log("result ===>>>>> ", result);
    //   if (result?.data?.apiRes){ setPreviewData(result?.data?.apiRes)
    //   setWorkExperience(result?.data?.apiRes.workExperience)
    //   setEducation(result?.data?.apiRes.education)
    //   setPreviewData(result?.data?.apiRes)
  };

  console.log(
    "Mobile",
    previewData?.Mobile,
    "VIsaTYPE",
    previewData?.Visa,
    "Gender",
    previewData?.Gender
  );

  const checkFunction = (event) => {
    const { name, value } = event.target;
    console.log("====>", event.target.checked, name, value);
    setPreviewData((prevState) => ({
      ...prevState,
      [name]: event.target.checked,
    }));
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <div className="main-container-enquiry-details">
      <div
        style={{
          marginBottom: "10px",
          paddingLeft: 50,
          paddingLeft: 50,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h4 style={{ textAlign: "left", color: "#3b7eeb" }}>Preview Form</h4>
     
      </div>

      <div className="grid-container-enquiry-details">
        <Grid
          style={{ border: "1px solid #a8b0bd", borderRadius: 4, padding: 20 }}
          container
          spacing={2}
        >
          <Grid item xs={12}>
            <h3 style={{ textAlign: "left" }}>Personal Details</h3>
            <hr style={{ marginBottom: 20 }}></hr>

            <Grid container spacing={2}>
              <Grid item xs={6} style={{ textAlign: "left" }}>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Name</p>
                {error.name ? (
                  <TextField
                  error
                    size="small"
                    required
                    fullWidth
                    id="outlined-required"
                    name="name"
                    value={previewData?.name}
                    onChange={handleInputChange}
                    helperText="Enter the valid Name"
                  />):( <TextField
                    size="small"
                    required
                    fullWidth
                    id="outlined-required"
                    name="name"
                    value={previewData?.name}
                    onChange={handleInputChange}
                  />)}
                </div>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>DOB</p>
                  {error.dob ? (
                  <TextField
                    size="small"
                    error
                    required
                    fullWidth
                    id="outlined-required"
                    //   label="Name"
                    name="dob"
                    value={dateFormatter(previewData?.dob)}
                    onChange={handleInputChange}
                    helperText="Enter the valid DOB"
                  />):(<TextField
                    size="small"
                    required
                    fullWidth
                    id="outlined-required"
                    //   label="Name"
                    name="dob"
                    value={dateFormatter(previewData?.dob)}
                    onChange={handleInputChange}
                  />)}
                  
                </div>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Father Name</p>
                  {error.FatherName ? (
                  <TextField
                    size="small"
                    required
                    error
                    fullWidth
                    id="outlined-required"
                    //   label="Name"
                    name="fatherName"
                    value={previewData?.fatherName}
                    onChange={handleInputChange}
                    helperText="Enter the valid Name"
                  />):(<TextField
                    size="small"
                    required
                    fullWidth
                    id="outlined-required"
                    //   label="Name"
                    name="fatherName"
                    value={previewData?.fatherName}
                    onChange={handleInputChange}
                  />)}
                  {/* <p>{previewData?.fatherName}</p> */}
                </div>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Aadhar card number</p>
                  {error.aadharNo ? (
                  <TextField
                  error
                    size="small"
                    required
                    fullWidth
                    id="outlined-required"
                    //   label="Name"
                    name="aadharNo"
                    value={previewData?.aadharNo}
                    onChange={handleInputChange}
                    helperText="Enter the Aadhar Number"
                  />):(   <TextField
                    size="small"
                    required
                    fullWidth
                    id="outlined-required"
                    //   label="Name"
                    name="aadharNo"
                    value={previewData?.aadharNo}
                    onChange={handleInputChange}
                  />)}
                  {/* <p>{previewData?.aadharNo}</p> */}
                </div>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Address</p>
                  
                  <TextField
                    size="small"
                    required
                    fullWidth
                    id="outlined-required"
                    //   label="Name"
                    name="address"
                    value={previewData?.address}
                    onChange={handleInputChange}
                  />
                  {/* <p>{previewData?.address}</p> */}
                </div>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>University</p>
                  <TextField
                    size="small"
                    required
                    fullWidth
                    id="outlined-required"
                    //   label="Name"
                    name="university"
                    value={previewData?.university?.name}
                  />
                </div>
              </Grid>
              <Grid item xs={6} style={{ textAlign: "left" }}>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Passport Reference Number</p>
                  {error.passportNo?
                  (<TextField
                    size="small"
                    required
                    fullWidth
                    error
                    id="outlined-required"
                      // label="Name"
                    name="passportNo"
                    value={previewData?.passportNo}
                    onChange={handleInputChange}
                    helperText="Enter the Passport Reference Number"
                  />):(<TextField
                    size="small"
                    required
                    fullWidth
                    id="outlined-required"
                      // label="Name"
                    name="passportNo"
                    value={previewData?.passportNo}
                    onChange={handleInputChange}
                  />)}
                  
                  {/* <p>{previewData?.passportNo}</p> */}
                </div>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Mobile Number</p>
                  {error.mobileNo ?( <TextField
                  error
                    size="small"
                    required
                    fullWidth
                    id="outlined-required"
                   
                    name="mobileNo"
                    value={previewData?.mobileNo}
                    onChange={handleInputChange}
                    helperText="Enter the Mobile Number"
                  />):( <TextField
                    size="small"
                    required
                    fullWidth
                    id="outlined-required"
                    
                    name="mobileNo"
                    value={previewData?.mobileNo}
                    onChange={handleInputChange}
                  />)}
                    
                </div>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Pan card number</p>
                  {error.panNo?( <TextField
                    size="small"
                    error
                    required
                    fullWidth
                    id="outlined-required"
                    //   label="Name"
                    name="panNo"
                    value={previewData?.panNo}
                    onChange={handleInputChange}
                    helperText="Enter the valid Pancard Number"
                  />):( <TextField
                    size="small"
                    required
                    fullWidth
                    id="outlined-required"
                    //   label="Name"
                    name="panNo"
                    value={previewData?.panNo}
                    onChange={handleInputChange}
                  />)}
                 
                  {/* <p>{previewData?.panNo}</p> */}
                </div>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Email</p>
                {error.email?(
                  <TextField
                  error
                    size="small"
                    required
                    fullWidth
                    id="outlined-required"
                    //   label="Name"
                    name="email"
                    value={previewData?.email}
                    onChange={handleInputChange}
                    helperText="Enter the valid email"
                  />):( <TextField
                    size="small"
                    required
                    fullWidth
                    id="outlined-required"
                    //   label="Name"
                    name="email"
                    value={previewData?.email}
                    onChange={handleInputChange}
                  />)}
                  {/* <p>{previewData?.email}</p> */}
                </div>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Visa type</p>
                  <TextField
                    size="small"
                    required
                    fullWidth
                    id="outlined-required"
                    //   label="Name"
                    name="visaType"
                    value={previewData?.visaType}
                    onChange={handleInputChange}
                  />
                  {/* <p>{previewData?.visaType}</p> */}
                </div>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Country</p>
                  <TextField
                    size="small"
                    required
                    fullWidth
                    id="outlined-required"
                    //   label="Name"
                    name="country"
                    value={previewData?.country[0]?.country}
                  />
                </div>
              </Grid>
              {/* <Grid
                item
                xs={6}
                style={{
                  textAlign: "left",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 6,
                  paddingLeft: 15,
                }}
              >
                <Grid item xs={3} sm={5} p={1}>
                  <span className="imageHeading">Aadhar card Front Image</span>
                  <div>
                    <img
                      className="imageStyle"
                      src={previewData?.aadharFront}
                      //   src="https://etimg.etb2bimg.com/thumb/msid-78488887,width-1200,resizemode-4/.jpg"
                      alt="Aadhar card Front Image"
                    ></img>
                  </div>
                </Grid>
                <Grid item xs={3} sm={5} p={1}>
                  <span className="imageHeading">Aadhar Card Back Image</span>
                  <div>
                    <img
                      className="imageStyle"
                      src={previewData?.aadharBack}
                      //   src="https://etimg.etb2bimg.com/thumb/msid-78488887,width-1200,resizemode-4/.jpg"
                      alt="Aadhar Card Back Image"
                    ></img>
                  </div>
                </Grid>
                <Grid item xs={3} sm={5} p={1}>
                  <span className="imageHeading">Pan Card Front Image</span>
                  <div>
                    <img
                      className="imageStyle"
                      src={previewData?.panFront}
                      //   src="https://etimg.etb2bimg.com/thumb/msid-78488887,width-1200,resizemode-4/.jpg"
                      alt="Pan Card Front Image"
                    ></img>
                  </div>
                </Grid>
                <Grid item xs={3} sm={5} p={1}>
                  <span className="imageHeading">Pan Card Back Image</span>
                  <div>
                    <img
                      className="imageStyle"
                      src={previewData?.panBack}
                      //   src="https://etimg.etb2bimg.com/thumb/msid-78488887,width-1200,resizemode-4/.jpg"
                      alt="Pan Card Back Image"
                    ></img>
                  </div>
                </Grid>
                <Grid item xs={3} sm={5} p={1}>
                  <span className="imageHeading">Passport Front Image</span>
                  <div>
                    <img
                      className="imageStyle"
                      src={previewData?.passportFront}
                      //   src="https://etimg.etb2bimg.com/thumb/msid-78488887,width-1200,resizemode-4/.jpg"
                      alt="Passport Front Image"
                    ></img>
                  </div>
                </Grid>
                <Grid item xs={3} sm={5} p={1}>
                  <span className="imageHeading">Passport Front Image</span>
                  <div>
                    <img
                      className="imageStyle"
                      src={previewData?.passportBack}
                      //   src="https://etimg.etb2bimg.com/thumb/msid-78488887,width-1200,resizemode-4/.jpg"
                      alt="Passport Front Image"
                    ></img>
                  </div>
                </Grid>
              </Grid> */}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <h3 style={{ textAlign: "left" }}>Educational Details</h3>
            <hr style={{ marginBottom: 20 }}></hr>
            {education?.map((item) => (
              <Grid container spacing={2}>
                <Grid item xs={1} style={{ textAlign: "Center" }}>
                  <div style={{ marginBottom: 40 }}>
                    <p style={{ color: "#8a9099" }}>Year</p>
                    <TextField
                      size="small"
                      //   disabled={editable}
                      required
                      fullWidth
                      id="outlined-required"
                      //   label="Name"
                      name="year"
                      value={item.year}
                      onChange={handleInputChange}
                    />
                    {/* <p>{item.year}</p> */}
                  </div>
                </Grid>
                <Grid item xs={2} style={{ textAlign: "Center" }}>
                  <div style={{ marginBottom: 40 }}>
                    <p style={{ color: "#8a9099" }}>Qualification</p>
                    <TextField
                      size="small"
                      required
                      fullWidth
                      id="outlined-required"
                      //   label="Name"
                      name="qualification"
                      value={item.qualification}
                      onChange={handleInputChange}
                    />
                    {/* <p>{item.qualification}</p> */}
                  </div>
                </Grid>
                <Grid item xs={1} style={{ textAlign: "Center" }}>
                  <div style={{ marginBottom: 40 }}>
                    <p style={{ color: "#8a9099" }}>Percentage</p>
                    <TextField
                      size="small"
                      required
                      fullWidth
                      id="outlined-required"
                      //   label="Name"
                      name="percentage"
                      value={item.percentage}
                      onChange={handleInputChange}
                    />
                    {/* <p>{item.percentage}</p> */}
                  </div>
                </Grid>
                <Grid item xs={3} style={{ textAlign: "Center" }}>
                  <div style={{ marginBottom: 40 }}>
                    <p style={{ color: "#8a9099" }}>Institute</p>
                    <TextField
                      size="small"
                      required
                      fullWidth
                      id="outlined-required"
                      //   label="Name"
                      name="institutionName"
                      value={item.institutionName}
                      onChange={handleInputChange}
                    />
                    {/* <p>{item.institutionName}</p> */}
                  </div>
                </Grid>
                <Grid item xs={3} style={{ textAlign: "Center" }}>
                  <div style={{ marginBottom: 40 }}>
                    <p style={{ color: "#8a9099" }}>Board University</p>
                    <TextField
                      size="small"
                      required
                      fullWidth
                      id="outlined-required"
                      //   label="Name"
                      name="board"
                      value={item.board}
                      onChange={handleInputChange}
                    />
                    {/* <p>{item.board}</p> */}
                  </div>
                </Grid>
                <Grid item xs={1} style={{ textAlign: "Center" }}>
                  <div style={{ marginBottom: 40 }}>
                    <p style={{ color: "#8a9099" }}>Regular</p>
                    <TextField
                      size="small"
                      required
                      fullWidth
                      id="outlined-required"
                      //   label="Name"
                      name="regular"
                      value={item?.regular === true ? "True" : "False"}
                      onChange={handleInputChange}
                    />
                    {/* <p>{item?.regular === true ? "True" : "False"}</p> */}
                  </div>
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Grid item xs={12}>
            <h3 style={{ textAlign: "left" }}>Work Experience</h3>
            <hr style={{ marginBottom: 20 }}></hr>
            {workExperience.map((item) => (
              <Grid container spacing={2}>
                <Grid item xs={1} style={{ textAlign: "Center" }}>
                  <div style={{ marginBottom: 40 }}>
                    <p style={{ color: "#8a9099" }}>Year</p>
                    <TextField
                      size="small"
                      required
                      fullWidth
                      id="outlined-required"
                      //   label="Name"
                      name="years"
                      value={item?.years}
                      onChange={handleInputChange}
                    />
                    {/* <p>{item.years}</p> */}
                  </div>
                </Grid>
                <Grid item xs={1} style={{ textAlign: "Center" }}>
                  <div style={{ marginBottom: 40 }}>
                    <p style={{ color: "#8a9099" }}>Month</p>
                    <TextField
                      size="small"
                      required
                      fullWidth
                      id="outlined-required"
                      //   label="Name"
                      name="months"
                      value={item.months}
                      onChange={handleInputChange}
                    />
                    {/* <p>{item.months}</p> */}
                  </div>
                </Grid>
                <Grid item xs={4} style={{ textAlign: "Center" }}>
                  <div style={{ marginBottom: 40 }}>
                    <p style={{ color: "#8a9099" }}>
                      Name and Address of the employer
                    </p>
                    <TextField
                      size="small"
                      required
                      fullWidth
                      id="outlined-required"
                      //   label="Name"
                      name="employer"
                      value={item.employer}
                      onChange={handleInputChange}
                    />
                    {/* <p>{item.employer}</p> */}
                  </div>
                </Grid>
                <Grid item xs={2} style={{ textAlign: "Center" }}>
                  <div style={{ marginBottom: 40 }}>
                    <p style={{ color: "#8a9099" }}>Designation</p>
                    <TextField
                      size="small"
                      required
                      fullWidth
                      id="outlined-required"
                      //   label="Name"
                      name="designation"
                      value={item.designation}
                      onChange={handleInputChange}
                    />
                    {/* <p>{item.designation}</p> */}
                  </div>
                </Grid>
                <Grid item xs={2} style={{ textAlign: "Center" }}>
                  <div style={{ marginBottom: 40 }}>
                    <p style={{ color: "#8a9099" }}>Industry type</p>
                    <TextField
                      size="small"
                      required
                      fullWidth
                      id="outlined-required"
                      //   label="Name"
                      name="industryType"
                      value={item.industryType}
                      onChange={handleInputChange}
                    />
                    {/* <p>{item.industryType}</p> */}
                  </div>
                </Grid>
                <Grid item xs={2} style={{ textAlign: "Center" }}>
                  <div style={{ marginBottom: 40 }}>
                    <p style={{ color: "#8a9099" }}>Full/Part Type</p>
                    <TextField
                      size="small"
                      required
                      fullWidth
                      id="outlined-required"
                      //   label="Name"
                      name="workSchedule"
                      value={item.workSchedule}
                      onChange={handleInputChange}
                    />
                    {/* <p>{item.workSchedule}</p> */}
                  </div>
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Grid item xs={12}>
            <h3 style={{ textAlign: "left" }}>Test Taken</h3>
            <hr style={{ marginBottom: 20 }}></hr>
            <Grid container spacing={2}>
              <Grid item xs={6} style={{ textAlign: "left" }}>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Test Name</p>
                  <p>
                    {" "}
                    {previewData?.testTaken?.testName
                     }
                  </p>
                  {console.log("")}
                </div>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Reading Score</p>
                  <p>
                    {previewData?.testTaken?.readScore}
                  </p>
                  <p style={{ color: "#8a9099" }}>Writing Score</p>
                  <p>
                    {previewData?.testTaken?.writeScore}
                  </p>
                  <p style={{ color: "#8a9099" }}>Listening Score</p>
                  <p>
                    {previewData?.testTaken?.listeningScore}
                  </p>
                  <p style={{ color: "#8a9099" }}>Listening Score</p>
                  <p>
                    {previewData?.testTaken?.speakingScore}
                  </p>
                </div>
              </Grid>
              <Grid item xs={6} style={{ textAlign: "left" }}>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Intended field of study</p>
                  <TextField
                    size="small"
                    required
                    fullWidth
                    id="outlined-required"
                    //   label="Name"
                    name="fieldOfStudy"
                    value={previewData?.testTaken?.fieldOfStudy}
                    onChange={handleInputChange}
                  />

                  {/* <p>{previewData?.testTaken[0]?.fieldOfStudy}</p> */}
                </div>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Institute of interest</p>
                  <TextField
                    size="small"
                    required
                    fullWidth
                    id="outlined-required"
                    //   label="Name"
                    name="institueOfInterest"
                    value={previewData?.testTaken?.institueOfInterest}
                    onChange={handleInputChange}
                  />
                  {/* <p>{previewData?.testTaken[0]?.institueOfInterest}</p> */}
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <h3 style={{ textAlign: "left" }}>Visa detail and finance</h3>
            <hr style={{ marginBottom: 20 }}></hr>
            <Grid container spacing={2}>
              <Grid
                item
                xs={6}
                style={{
                  textAlign: "left",
                  display: editable ? "none" : "inline",
                }}
              >
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Liquid amount</p>
                  <TextField
                    size="small"
                    required
                    fullWidth
                    id="outlined-required"
                    //   label="Name"
                    name="fundsAsLiquidAmt"
                    value={previewData?.fundsAsLiquidAmt}
                    onChange={handleInputChange}
                  />

                  {/* <p>{previewData?.fundsAsLiquidAmt}</p> */}
                </div>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Property</p>
                  <TextField
                    size="small"
                    required
                    fullWidth
                    id="outlined-required"
                    //   label="Name"
                    name="fundsAsProperty"
                    value={previewData?.fundsAsProperty}
                    onChange={handleInputChange}
                  />
                  {/* <p>{previewData?.fundsAsProperty}</p> */}
                </div>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Annual income</p>
                  <TextField
                    size="small"
                    required
                    fullWidth
                    id="outlined-required"
                    //   label="Name"
                    name="fundsAsAnnualIncome"
                    value={previewData?.fundsAsAnnualIncome}
                    onChange={handleInputChange}
                  />
                  {/* <p>{previewData?.fundsAsAnnualIncome}</p> */}
                </div>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Study loan required</p>
                  <p>{previewData?.needEducationLoan ? "Yes" : "No"}</p>
                </div>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Earlier visa refusal</p>
                  <p>{previewData?.visaEarlierRefused ? "Yes" : "No"}</p>
                </div>
              </Grid>
              <Grid
                item
                xs={6}
                style={{
                  textAlign: "left",
                  display: editable ? "inline" : "none",
                }}
              >
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Liquid amount</p>
                  <p>{previewData?.fundsAsLiquidAmt}</p>
                </div>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Property</p>
                  <p>{previewData?.fundsAsProperty}</p>
                </div>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Annual income</p>
                  <p>{previewData?.fundsAsAnnualIncome}</p>
                </div>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Study loan required</p>
                  <p>{previewData?.needEducationLoan ? "Yes" : "No"}</p>
                </div>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Earlier visa refusal</p>
                  <p>{previewData?.visaEarlierRefused ? "Yes" : "No"}</p>
                </div>
              </Grid>
              <Grid
                item
                xs={6}
                style={{
                  textAlign: "left",
                  display: editable ? "inline" : "none",
                }}
              >
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Relatives abroad</p>
                  <p>{previewData?.relativesAbroad ? "Yes" : "No"}</p>
                </div>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Loan amount</p>
                  <p>
                    {previewData?.needEducationLoan
                      ? previewData?.loanAmount
                      : "-"}
                  </p>
                </div>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Reason</p>
                  <p>
                    {previewData?.visaEarlierRefused
                      ? previewData?.visaRefusalReason
                      : "-"}
                  </p>
                </div>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Sponsership available</p>
                  <p>
                    {previewData?.relativesAbroad
                      ? previewData?.relativeSponsorReason
                      : "-"}
                  </p>
                </div>
              </Grid>
              <Grid
                item
                xs={6}
                style={{
                  textAlign: "left",
                  display: editable ? "none" : "inline",
                }}
              >
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Relatives abroad</p>
                  <p>{previewData?.relativesAbroad ? "Yes" : "No"}</p>
                </div>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Loan amount</p>
                  <TextField
                    size="small"
                    required
                    fullWidth
                    id="outlined-required"
                    //   label="Name"
                    name="loanAmountRs"
                    value={previewData?.loanAmount}
                    onChange={handleInputChange}
                  />
                </div>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Reason</p>
                  <TextField
                    size="small"
                    required
                    fullWidth
                    id="outlined-required"
                    //   label="Name"
                    name="visaRefusalReson"
                    value={previewData?.visaRefusalReason}
                    onChange={handleInputChange}
                  />
                </div>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Sponsership available</p>
                  <TextField
                    size="small"
                    required
                    fullWidth
                    id="outlined-required"
                    //   label="Name"
                    name="relativeSponsorReason"
                    value={previewData?.relativeSponsorReason}
                    onChange={handleInputChange}
                  />
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <h3 style={{ textAlign: "left" }}>Other information</h3>
            <hr style={{ marginBottom: 20 }}></hr>
            <Grid container spacing={2}>
              <Grid item xs={6} style={{ textAlign: "left" }}>
                <p style={{ color: "#8a9099" }}>
                  Other information goes here...
                </p>
                <TextField
                  id="outlined-size-small"
                  size="normal"
                  fullWidth
                  //   label="Other(Please specify)"
                  name="declaration"
                  onChange={handleInputChange}
                  value={previewData?.declaration}
                />
                {/* <p>{previewData?.declaration}</p> */}
              </Grid>

              <Grid item xs={6} style={{ textAlign: "left" }}>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Mode of contact</p>
                  <div style={{ marginBottom: 40, display: "flex", gap: 5 }}>
                    <Grid
                      sx={{
                        display: editable ? "none" : "flex",
                        flexWrap: "wrap",
                      }}
                    >
                      <Checkbox
                        {...label}
                        name="newspaper"
                        onChange={checkFunction}
                        checked={
                          previewData?.newspaper
                            ? previewData?.newspaper
                            : false
                        }
                      />
                      <p>Newspaper</p>
                      <Checkbox
                        {...label}
                        name="magazine"
                        onChange={checkFunction}
                        checked={
                          previewData?.magazine ? previewData?.magazine : false
                        }
                      />
                      <p>Magazine</p>
                      <Checkbox
                        {...label}
                        name="radio"
                        onChange={checkFunction}
                        checked={
                          previewData?.radio ? previewData?.radio : false
                        }
                      />
                      {console.log("previewData?.radio", previewData?.radio)}
                      <p>Radio</p>
                      <Checkbox
                        {...label}
                        name="seminar"
                        onChange={checkFunction}
                        checked={
                          previewData?.seminar ? previewData?.seminar : false
                        }
                      />
                      <p>Seminar</p>
                      <Checkbox
                        {...label}
                        name="friends"
                        onChange={checkFunction}
                        checked={
                          previewData?.friends ? previewData?.friends : false
                        }
                        // checked={true}
                      />
                      <p>Friends</p>
                      <Checkbox
                        {...label}
                        name="internet"
                        onChange={checkFunction}
                        checked={
                          previewData?.internet ? previewData?.internet : false
                        }
                      />
                      <p>Internet</p>
                      {/* <Grid item sx={{ mt: 2 }}> */}
                      <TextField
                        // id="outlined-size-small"
                        size="normal"
                        fullWidth
                        // label="Other(Please specify)"
                        name="others"
                        onChange={handleInputChange}
                        value={previewData?.others}
                      />
                      {/* </Grid> */}
                    </Grid>

                    <Grid
                      sx={{
                        display: editable ? "flex" : "none",
                        flexWrap: "wrap",
                      }}
                    >
                      <p>
                        {previewData?.newspaper === true ? "Newspaper" : ""}
                      </p>
                      <p>{previewData?.magazine === true ? "Magzine" : ""}</p>

                      <p>{previewData?.seminar === true ? "Seminar" : ""}</p>
                      <p>{previewData?.friends === true ? "Friends" : ""}</p>
                      <p>{previewData?.internet === true ? "Internet" : ""}</p>
                      <p>{previewData?.radio === true ? "Radio" : ""}</p>
                      <p>{previewData?.others}</p>
                    </Grid>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid sx={{ml:2}}>
          <p style={{ color: "#8a9099",width:"fit-Content"}}>Status</p>

                    <TextField
                        // id="outlined-size-small"
                        size="normal"
                        fullWidth
                        disabled
                        // label="Other(Please specify)"
                        name="others"
                        onChange={handleInputChange}
                        value={previewData?.others}
                      />
                      </Grid> */}
          {/* <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box style={{ width: "50%", height: 200, margin: "auto" }}>
              <Select
                labelId="demo-simple-select-label2"
                id="demo-simple-select2"
                value={assignedTo}
                label="Application Status"
                onChange={(e) => setAssignedTo(e.target.value)}
                style={{ width: "50%", height: 40 }}
                defaultValue={"Incomplete documents"}
              >
                <MenuItem value={"incomplete-documents"}>
                  Incomplete documents
                </MenuItem>
                <MenuItem value={"admin"}>Admin</MenuItem>
                <MenuItem value={"sub-admin"}>Sub Admin</MenuItem>
              </Select>
            </Box>
            <h4>Comments</h4>
            <TextField
              margin={"normal"}
              size={"small"}
              style={{ width: "50%", marginBottom: 30 }}
              onKeyDown={(ev) => {
                console.log(`Pressed keyCode ${ev.key}`);
                if (ev.key === "Enter") {
                  setRecentComment(ev.target.value);
                  ev.preventDefault();
                }
              }}
            />
            <div style={{ paddingLeft: 30 }}>
              {recentComment && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <img
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      marginRight: 5,
                    }}
                    src={DummyProfilePic}
                  />
                  <p>Piyush Aggarwal : </p>
                  <p style={{ marginLeft: 5, color: "grey" }}>
                    {recentComment}
                  </p>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <img
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    marginRight: 5,
                  }}
                  src={DummyProfilePic}
                />
                <p>Baldev Rampal : </p>
                <p style={{ marginLeft: 5, color: "grey" }}>Comment 1</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <img
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    marginRight: 5,
                  }}
                  src={DummyProfilePic}
                />
                <p>Vishal Deep : </p>
                <p style={{ marginLeft: 5, color: "grey" }}>Comment 2</p>
              </div>
            </div>
          </Grid> */}
        </Grid>
        {/* <Grid container spacing={2} style={{ marginTop: 50, marginBottom: 50 }}> */}
        {/* <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          style={{ borderRight: "1px solid black" }}
        >
          <Box style={{ width: "50%", height: 200, margin: "auto" }}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="Role"
              onChange={(e) => setStatus(e.target.value)}
              style={{ width: "50%", height: 40 }}
              defaultValue={"incomplete-documents"}
            >
              <MenuItem disabled value="">
                <em>Application Status</em>
              </MenuItem>
              <MenuItem value={"incomplete-documents"}>
                Incomplete documents
              </MenuItem>
              <MenuItem value={"application-on-assessment"}>
                Application on assessment
              </MenuItem>
              <MenuItem value={"offer-applied"}>Offer applied</MenuItem>
              <MenuItem value={"offer-received"}>Offer received</MenuItem>
              <MenuItem value={"file-logged"}>File logged</MenuItem>
              <MenuItem value={"visa-approved"}>Visa approved</MenuItem>
              <MenuItem value={"visa-decline"}>Visa decline</MenuItem>
              <MenuItem value={"onshore"}>Onshore</MenuItem>
              <MenuItem value={"refund"}>Refund</MenuItem>
            </Select>
          </Box> */}
        {/* <Button
            style={{
              backgroundColor: displayHistory ? "lightgray" : "white",
              width: "30%",
              height: 40,
              marginBottom: 30,
            }}
            onClick={() => {
              setDisplayHistory(!displayHistory);
            }}
          >
            <h4 style={{ marginBottom: 0 }}>History</h4>
          </Button> */}
        {/* {displayHistory && (
            <Box>
              <div style={{ marginBottom: 20 }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      marginRight: 5,
                    }}
                    src={DummyProfilePic}
                  />
                  <p>Harpreet Singh</p>
                  <p style={{ color: "grey", marginLeft: 5, marginRight: 5 }}>
                    assigned the enquiry to
                  </p>
                  <img
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      marginRight: 5,
                    }}
                    src={DummyProfilePic}
                  />
                  <p>Vishal Deep on</p>
                  <p style={{ marginLeft: 5 }}>(23-06-2023)</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 10,
                  }}
                >
                  <h4>Harpreet Singh</h4>
                  <p style={{ marginLeft: 5, marginRight: 5 }}> -</p>
                  <h4>Vishal Deep</h4>
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      marginRight: 5,
                    }}
                    src={DummyProfilePic}
                  />
                  <p>Kulwinder Singh</p>
                  <p style={{ color: "grey", marginLeft: 5, marginRight: 5 }}>
                    assigned the enquiry to
                  </p>
                  <img
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      marginRight: 5,
                    }}
                    src={DummyProfilePic}
                  />
                  <p>Baldev Rampal</p>
                  <p style={{ marginLeft: 5 }}>(23-09-2023)</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 10,
                  }}
                >
                  <h4>Kulwinder Singh</h4>
                  <p style={{ marginLeft: 5, marginRight: 5 }}> -</p>
                  <h4>Baldev Rampal</h4>
                </div>
              </div>
            </Box>
          )} */}
        {/* </Grid> */}
        {/* <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box style={{ width: "50%", height: 200, margin: "auto" }}>
            <Select
              labelId="demo-simple-select-label2"
              id="demo-simple-select2"
              value={assignedTo}
              label="Application Status"
              onChange={(e) => setAssignedTo(e.target.value)}
              style={{ width: "50%", height: 40 }}
              defaultValue={"Incomplete documents"}
            >
              <MenuItem value={"incomplete-documents"}>
                Incomplete documents
              </MenuItem>
              <MenuItem value={"admin"}>Admin</MenuItem>
              <MenuItem value={"sub-admin"}>Sub Admin</MenuItem>
            </Select>
          </Box>
          <h4>Comments</h4>
          <TextField
            margin={"normal"}
            size={"small"}
            style={{ width: "50%", marginBottom: 30 }}
            onKeyDown={(ev) => {
              console.log(`Pressed keyCode ${ev.key}`);
              if (ev.key === "Enter") {
                setRecentComment(ev.target.value);
                ev.preventDefault();
              }
            }}
          />
          <div style={{ paddingLeft: 30 }}>
            {recentComment && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <img
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    marginRight: 5,
                  }}
                  src={DummyProfilePic}
                />
                <p>Piyush Aggarwal : </p>
                <p style={{ marginLeft: 5, color: "grey" }}>{recentComment}</p>
              </div>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <img
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  marginRight: 5,
                }}
                src={DummyProfilePic}
              />
              <p>Baldev Rampal : </p>
              <p style={{ marginLeft: 5, color: "grey" }}>Comment 1</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <img
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  marginRight: 5,
                }}
                src={DummyProfilePic}
              />
              <p>Vishal Deep : </p>
              <p style={{ marginLeft: 5, color: "grey" }}>Comment 2</p>
            </div>
          </div>
        </Grid> */}
        {/* </Grid> */}
        <Button variant="outlined" sx={{ mt: 5 }} onClick={onBack}>
          Back
        </Button>
        <Button
          variant="outlined"
          sx={{ mt: 5, ml: 2 }}
          onClick={() => onPutAPI(previewData?._id)}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
