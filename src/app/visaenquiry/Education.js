import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import "./Education.css";
import Paper from "@mui/material/Paper";
import {
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import styles from "./VisaEnquiry.module.css";
import Steppers from "./Stepper";
import { useDispatch, useSelector } from "react-redux";
import { saveEducationWorkDetail } from "../redux/action/Action";
import { useNavigate } from "react-router-dom";

const Education = () => {
  let userDetail = useSelector((state) => state.saveEducationWorkDetails);
  let data = userDetail.educationWorkDetail;

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const StudyRegex = /^(?!.*\s{2,})[a-zA-Z\s]{0,50}$/;
  const interestregex = /^(?!.*\s{2,})[a-zA-Z\s]{0,50}$/;
  const qualificationregex = /^(?:([A-Za-z0-9.,-]+[\s]){0,1}([A-Za-z0-9.,-])+)?$/;
  const percentregex = /^(?:\d+(?:\.\d+)?)?$/;
  const scoreregex = /^(?:\d+)?$/;
  const [able, setAble] = useState(true);
  const [able1, setAble1] = useState(true);
  const [showScore, setShowScore] = useState(null);

  const currentYear = new Date().getFullYear();
  const startYear = 1990;
  const years = [];

  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
  }

  const currentYear1 = 30;
  const startYear1 = 0;
  const years1 = [];

  for (let monthyear = startYear1; monthyear <= currentYear1; monthyear++) {
    years1.push(monthyear);
  }

  const totalmonth = 12;
  const particularmonth = 0;
  const months = [];

  for (let month = particularmonth; month <= totalmonth; month++) {
    months.push(month);
  }
  const [error, setError] = useState({
    fieldOfStudy: "",
    InterestedInstitute: "",
    Year: "",
    qualification: "",
    percentage: "",
    institutionName: "",
    University: "",
    Information: "",
    Month: "",
    employer: "",
    designation: "",
    Industry: "",
    Time: "",
    readScore:"",
    writeScore:"",
    speakingScore:"",
    listeningScore:"",
    overallScore:"",
  });
  const [addmore, setAddmore] = useState([
    {
      year: "",
      qualification: "",
      percentage: "",
      institutionName: "",
      board: "",
      regular: "",
    },
  ]); //DEGREE?

  const [workaddmore, setWorkAddmore] = useState([
    {
      years: "",
      months: "",
      employer: "",
      designation: "",
      industryType: "",
      workSchedule: "",
    },
  ]);
  const handleServiceAdd = () => {
    setAddmore([
      ...addmore,
      {
        year: "",
        qualification: "",
        percentage: "",
        institutionName: "",
        board: "",
        regular: "",
      },
    ]);
  };

  const handleServiceAddWork = () => {
    setWorkAddmore([
      ...workaddmore,
      {
        years: "",
        months: "",
        employer: "",
        designation: "",
        industryType: "",
        workSchedule: "",
      },
    ]);
  };
  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...addmore];
    console.log(list, "===");
    list[index][name] = value;
    setAddmore(list);
  };
  const handleServiceChange1 = (e, index) => {
    const { name, value } = e.target;
    const list = [...workaddmore];
    console.log(list, "===");
    list[index][name] = value;
    setWorkAddmore(list);
  };

  const handleServiceRemove = (index) => {
    const list = [...addmore];
    list.splice(index, 1);
    setAddmore(list);
  };
  const handleServiceRemove1 = (index) => {
    const list = [...workaddmore];
    list.splice(index, 1);
    setWorkAddmore(list);
  };

 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const backFunction = (e) => {
    navigate("/UploadImages");
  };

  const [user, setUser] = useState({
    isApplicable: null,
    testName: "",
    readScore: 0,
    writeScore: 0,
    speakingScore: 0,
    listeningScore: 0,
    overallScore: 0,
    fieldOfStudy: "",
    instituteOfInterest: "",
  });
  const handleInputChange = (event, index) => {
    let addMoreNewvalue = [...addmore];
    const { name, value } = event.target;

    if (name === "regular") {
      if (value === "Regular") {
        addMoreNewvalue[index][name] = true;
        setAddmore(addMoreNewvalue);
      } else if (value === "Distance") {
        addMoreNewvalue[index][name] = false;
        setAddmore(addMoreNewvalue);
      }
    } else if (name === "qualification") {
      // console.log("qualificationregex.test(value)",qualificationregex.test(value))
      if (qualificationregex.test(value)) {
        addMoreNewvalue[index][name] = value;
        setAddmore(addMoreNewvalue);

        setError((err) => ({
          ...err,
          qualification: "",
        }));
      } else {
        setError((err) => ({
          ...err,
          qualification: "Error",
        }));
      }
    }
    if (name === "percentage") {
      // console.log("qualificationregex.test(value)",qualificationregex.test(value))
      if (percentregex.test(value)) {
        addMoreNewvalue[index][name] = value;
        setAddmore(addMoreNewvalue);

        setError((err) => ({
          ...err,
          percentage: "",
        }));
      } else {
        setError((err) => ({
          ...err,
          percentage: "Error",
        }));
      }
    }
    if (name === "institutionName") {
      // console.log("qualificationregex.test(value)",qualificationregex.test(value))
      if (StudyRegex.test(value)) {
        addMoreNewvalue[index][name] = value;
        setAddmore(addMoreNewvalue);

        setError((err) => ({
          ...err,
          institutionName: "",
        }));
      } else {
        setError((err) => ({
          ...err,
          institutionName: "Error",
        }));
      }
    }
    if (name === "board") {
      // console.log("qualificationregex.test(value)",qualificationregex.test(value))
      if (StudyRegex.test(value)) {
        addMoreNewvalue[index][name] = value;
        setAddmore(addMoreNewvalue);

        setError((err) => ({
          ...err,
          board: "",
        }));
      } else {
        setError((err) => ({
          ...err,
          board: "Error",
        }));
      }
    } if (name === "regular") {
      if(value=="Regular"){
        addMoreNewvalue[index][name] = true;
      }else{
        addMoreNewvalue[index][name] = false;
      }
      setAddmore(addMoreNewvalue);

    } else {
      addMoreNewvalue[index][name] = value;
      setAddmore(addMoreNewvalue);
    }
    // console.log("====>", name, value);
  };

  const handleInputChangeforWork = (event, index) => {
    const { name, value } = event.target;
    let workaddMoreValue = [...workaddmore];
    if(name==="employer"){
      if (StudyRegex.test(value)) {
        workaddMoreValue[index][name] = value;
        setWorkAddmore(workaddMoreValue);

        setError((err) => ({
          ...err,
          employer: "",
        }));
      } else {
        setError((err) => ({
          ...err,
          employer: "Error",
        }));
      }
    }
    if(name==="designation"){
      if (StudyRegex.test(value)) {
        workaddMoreValue[index][name] = value;
        setWorkAddmore(workaddMoreValue);

        setError((err) => ({
          ...err,
          designation: "",
        }));
      } else {
        setError((err) => ({
          ...err,
          designation: "Error",
        }));
      }
    }else{
    workaddMoreValue[index][name] = value;
        setWorkAddmore(workaddMoreValue);
    }
  };

  const handleOnCheckforIELTS = (event) => {
    const { name, value } = event.target;
    setAble(!event.target.checked);

    setUser((prevState) => ({
      ...prevState,
      ["testName"]: event.target.checked,
    }));
  };

  const handleTestTaken = (event) => {
    const { name, value } = event.target;
    if (name == "fieldOfStudy") {
      if (StudyRegex.test(value)) {
        setUser((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        setError((err) => ({
          ...err,
          fieldOfStudy: "",
        }));
      } else {
        setError((err) => ({
          ...err,
          fieldOfStudy: "Error",
        }));
      }
    }
    if (name == "instituteOfInterest") {
      if (interestregex.test(value)) {
        setUser((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        setError((err) => ({
          ...err,
          instituteOfInterest: "",
        }));
      } else {
        setError((err) => ({
          ...err,
          instituteOfInterest: "Error",
        }));
      }
    }
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleOnCheckTest = (event) => {
    setShowScore(true);
    // console.log(event.target.value);
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      testName: value,
      isApplicable: true,
    }));
    // setUser((e) => (e.isApplicable = false));
  };

  const handleOnCheckforNotApplicable = (event) => {
    setShowScore(false);
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: event.target.checked,
      isApplicable: false,
      // testName: "NONE"
    }));
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (
      user.fieldOfStudy === undefined ||
      user.instituteOfInterest === undefined
    ) {
      alert("Please fill all the feilds");
    } else if (
      user.readScore === (undefined || "") ||
      user.writeScore === (undefined || "") ||
      user.listeningScore === (undefined || "") ||
      user.speakingScore === (undefined || "") ||
      user.overallScore === (undefined || "")
    ) {
      alert("Please fill all feilds of test taken");
    } else if (
      addmore[0].year === (undefined || "") ||
      addmore[0].qualification === (undefined || "") ||
      addmore[0].board === (undefined || "") ||
      addmore[0].percentage === (undefined || "") ||
      addmore[0].regular === (undefined || "") ||
      addmore[0].institutionName === (undefined || "")
    ) {
      alert("please add education qualification");
    } else if (
      user?.isApplicable === null &&
      user?.testName === (undefined || "")
    ) {
      alert("please select test Taken");
    } else {
      let testtaken = {};
      if (user?.isApplicable === false) {
        testtaken = {
          isApplicable: user?.isApplicable,
          testName: "NONE",
          readScore: 0,
          writeScore: 0,
          speakingScore: 0,
          listeningScore: 0,
          overallScore: 0,
          fieldOfStudy: user?.fieldOfStudy,
          instituteOfInterest: user?.instituteOfInterest,
        };
      } else {
        testtaken = {
          isApplicable: user?.isApplicable,
          testName: user?.testName,
          readScore: user?.readScore,
          writeScore: user?.writeScore,
          speakingScore: user?.speakingScore,
          listeningScore: user?.listeningScore,
          overallScore: user?.overallScore,
          fieldOfStudy: user?.fieldOfStudy,
          instituteOfInterest: user?.instituteOfInterest,
        };
      }
      let data = {
        addmore,
        workaddmore,
        testScore: testtaken,
      };
      console.log("=====================");
      console.log(data);
      console.log("=====================");
      dispatch(saveEducationWorkDetail(data));
      navigate("/VisaDetails");
    }
  };
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    if (data.addmore) {
      setAddmore(data.addmore);
    }
    if (data.workaddmore) {
      setWorkAddmore(data.workaddmore);
    }
    if (data.testScore) {
      setUser(data.testScore);
    }
  }, []);
  console.log("dataeducation", data);
  return (
    <Container maxWidth="mx" className={styles.containerFix}>
      <Grid item sx={{ flexWrap: "wrap" }}>
        <Box className={styles.breadcrumFix}>
          <Breadcrumbs maxItems={2} aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>

            <Typography color="text.primary">Enquiry</Typography>
          </Breadcrumbs>
        </Box>
        <Box>
          <Steppers activeSteps={2}></Steppers>
        </Box>

        <Grid item>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                mb: 3,
                ml: 8,
                mr: 8,
                mt: 5,
                width: "-webkit-fill-available",
              },
            }}
          >
            <Paper elevation={3}>
              <Grid item mt={2}>
                <p className="Educational">Education</p>
              </Grid>
              {/* <div className="Education"> */}
              <Grid
                item
                sx={{
                  pl: 8,
                  pr: 8,
                  flexWrap: "wrap",
                  flex: 1,
                }}
              >
                {addmore?.map((singleService, index) => (
                  <Grid
                    item
                    sx={{ display: "flex", gap: 1, p: 1, flexWrap: "wrap" }}
                  >
                    <Grid item sx={{ flex: 1 }}>
                      <FormControl
                        sx={{ textAlign: "left" }}
                        size="small"
                        fullWidth
                      >
                        <InputLabel id="demo-simple-select-helper-label">
                          Year
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="outlined-required"
                          label="Year"
                          name="year"
                          required
                          defaultValue=""
                          onChange={(event) => handleInputChange(event, index)}
                          value={singleService?.year}
                        >
                          {console.log("Addmore", singleService?.year)}
                          {years?.map((items) => {
                            return <MenuItem value={items}>{items}</MenuItem>;
                          })}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item sx={{ flex: 1 }}>
                      <TextField
                        error={error.qualification}
                        size="small"
                        required
                        id="outlined-required"
                        label="Qualification"
                        name="qualification"
                        value={
                          singleService?.qualification ||
                          "" ||
                          data?.qualification
                        }
                        onChange={(event) => handleInputChange(event, index)}
                        helperText={
                          error.qualification ? "Invalid qualification" : ""
                        }
                      />
                    </Grid>
                    <Grid item sx={{ flex: 1 }}>
                      <TextField
                        error={error.percentage}
                        size="small"
                        required
                        id="outlined-required"
                        label="Percentage"
                        name="percentage"
                        value={
                          singleService?.percentage || "" || data?.percentage
                        }
                        onChange={(event) => handleInputChange(event, index)}
                        helperText={
                          error.percentage ? "Invalid percentage" : ""
                        }
                      />
                    </Grid>
                    <Grid item sx={{ flex: 1 }}>
                      <TextField
                        error={error.institutionName}
                        size="small"
                        required
                        id="outlined-required"
                        label="Institute Name"
                        name="institutionName"
                        onChange={(event) => handleInputChange(event, index)}
                        value={
                          singleService?.institutionName ||
                          "" ||
                          data?.institutionName
                        }
                        helperText={error.institutionName ? "Invalid Institute name" : ""}
                      />
                    </Grid>
                    <Grid item sx={{ flex: 1 }}>
                      <TextField
                        error={error.board}
                        size="small"
                        required
                        id="outlined-required"
                        label="Board/University"
                        name="board"
                        onChange={(event) => handleInputChange(event, index)}
                        value={singleService?.board || "" || data?.board}
                        helperText={
                          error.board ? "Invalid Board/University" : ""
                        }
                      />
                    </Grid>
                    <Grid item sx={{ flex: 1 }}>
                      <FormControl
                        sx={{ textAlign: "left" }}
                        size="small"
                        fullWidth
                      >
                        <InputLabel id="demo-simple-select-helper-label">
                          Regular/Distance
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="outlined-required"
                          label="Regular/Distance"
                          name="regular"
                          required
                          defaultValue=""
                          value={
                            singleService?.regular === ""
                              ? ""
                              : singleService?.regular
                              ? "Regular"
                              : "Distance"
                          }
                          onChange={(event) => handleInputChange(event, index)}
                        >
                          <MenuItem value="Regular">Regular</MenuItem>
                          <MenuItem value="Distance">Distance</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                ))}
                <Grid item sx={{ display: "flex", gap: 1, ml: 1 }}>
                  {addmore.length <= 9 && (
                    <Grid item sx={{ pt: 2 }}>
                      <Button variant="contained" onClick={handleServiceAdd}>
                        Add More
                      </Button>
                    </Grid>
                  )}
                  <Grid item>
                    {addmore.length !== 1 && (
                      <Grid sx={{ pt: 2 }}>
                        <Button
                          variant="outlined"
                          onClick={(index) => handleServiceRemove(index)}
                        >
                          Delete
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              {/* </div> */}
              <Grid mt={1}>
                <p className="Educational">Work Experience</p>
              </Grid>
              <Grid>
                {workaddmore.map((Service, index, event) => (
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      gap: 1,
                      pl: 9,
                      pr: 9,
                      pt: 2,
                      flexWrap: "wrap",
                    }}
                  >
                    <Grid item sx={{ flex: 1 }}>
                      {/* <TextField
                        size="small"
                        id="outlined-required"
                        label="Year"
                        name="years"
                        onChange={(event) =>
                          handleInputChangeforWork(event, index)
                        }
                        value={Service?.years || "" || data?.years}
                      /> */}
                      <FormControl
                        sx={{ textAlign: "left" }}
                        size="small"
                        fullWidth
                      >
                        <InputLabel id="demo-simple-select-helper-label">
                          Year
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="outlined-required"
                          label="Year"
                          name="years"
                          required
                          defaultValue=""
                          onChange={(event) =>
                            handleInputChangeforWork(event, index)
                          }
                          value={Service?.years}
                        >
                          {/* {console.log("Addmore", singleService?.year)} */}
                          {years1?.map((items) => {
                            return <MenuItem value={items}>{items}</MenuItem>;
                          })}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item sx={{ flex: 1 }}>
                      {/* <TextField
                        size="small"
                        id="outlined-required"
                        label="Month"
                        name="months"
                        onChange={(event) =>
                          handleInputChangeforWork(event, index)
                        }
                        value={Service?.months || "" || data?.months}
                      /> */}
                      <FormControl
                        sx={{ textAlign: "left" }}
                        size="small"
                        fullWidth
                      >
                        <InputLabel id="demo-simple-select-helper-label">
                        Month
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="outlined-required"
                          label="Month"
                          name="months"
                          required
                          defaultValue=""
                          onChange={(event) =>
                            handleInputChangeforWork(event, index)
                          }
                          value={Service?.months}
                        >
                          {/* {console.log("Addmore", singleService?.year)} */}
                          {months?.map((items) => {
                            return <MenuItem value={items}>{items}</MenuItem>;
                          })}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item sx={{ flex: 1 }}>
                      <TextField
                      error={error.employer}
                        size="small"
                        id="outlined-required"
                        label="Employer"
                        name="employer"
                        onChange={(event) =>
                          handleInputChangeforWork(event, index)
                        }
                        value={Service?.employer || "" || data?.employer}
                        helperText={error.employer?"Invalid employer":""}
                      />
                    </Grid>
                    <Grid item sx={{ flex: 1 }}>
                      <TextField
                      error={error.designation}
                        size="small"
                        id="outlined-required"
                        label="Designation"
                        name="designation"
                        onChange={(event) =>
                          handleInputChangeforWork(event, index)
                        }
                        value={Service?.designation || "" || data?.designation}
                        helperText={error.designation?"Invalid Designation":""}
                      />
                    </Grid>

                    <Grid item sx={{ flex: 1 }}>
                      <FormControl
                        sx={{ textAlign: "left" }}
                        size="small"
                        fullWidth
                      >
                        <InputLabel id="demo-simple-select-helper-label">
                          Industry
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="outlined-required"
                          label="Industry"
                          name="industryType"
                          defaultValue=""
                          value={Service?.industryType}
                          onChange={(event) =>
                            handleInputChangeforWork(event, index)
                          }
                        >
                          <MenuItem value="Information Technology">
                            Information Technology
                          </MenuItem>
                          <MenuItem value="Finance and Accounting">
                            Finance and Accounting
                          </MenuItem>
                          <MenuItem value="Healthcare">Healthcare</MenuItem>
                          <MenuItem value="Education">Education</MenuItem>
                          <MenuItem value="Hospitality and Tourism">
                            Hospitality and tourism
                          </MenuItem>
                          <MenuItem value="Retail and Sales">
                            Retail and Sales
                          </MenuItem>
                          <MenuItem value="Manufacturing">
                            Manufacturing
                          </MenuItem>
                          <MenuItem value="Construction and Engineering">
                            Construction and engineering
                          </MenuItem>
                          <MenuItem value="Government and Public Administration">
                            Government and public administration
                          </MenuItem>
                          <MenuItem value="Marketing and Advertising.">
                            Marketing and advertising.
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item sx={{ flex: 1 }}>
                      <Grid item sx={{ flex: 1 }}>
                        <FormControl
                          sx={{ textAlign: "left" }}
                          size="small"
                          fullWidth
                        >
                          <InputLabel id="demo-simple-select-helper-label">
                            Full/Part Time
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-helper-label"
                            id="outlined-required"
                            label="Full/Part Time"
                            name="workSchedule"
                            defaultValue=""
                            value={Service?.workSchedule}
                            onChange={(event) =>
                              handleInputChangeforWork(event, index)
                            }
                          >
                            <MenuItem value="Full">Full Time</MenuItem>
                            <MenuItem value="Part">Part Time</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
                <Grid item sx={{ display: "flex", gap: 1, pl: 9, pt: 2 }}>
                  {workaddmore.length <= 9 && (
                    <Grid item sx={{ pt: 1 }}>
                      <Button
                        variant="contained"
                        onClick={handleServiceAddWork}
                      >
                        Add More
                      </Button>
                    </Grid>
                  )}
                  <Grid item>
                    {workaddmore.length !== 1 && (
                      <Grid item sx={{ pt: 1 }}>
                        <Button
                          variant="outlined"
                          onClick={(index) => handleServiceRemove1(index)}
                        >
                          Delete
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
                <Grid sx={{ display: "flex", pl: 9, pr: 9, gap: 1 }}>
                  <Grid sx={{ width: "-webkit-fill-available" }}>
                    <Grid item mt={3} sx={{ width: "fit-Content" }}>
                      <p>Test Taken</p>
                    </Grid>
                    <Grid item sx={{ display: "flex", width: "fit-content" }}>
                      <FormControl>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                        >
                          <FormControlLabel
                            checked={
                              user?.isApplicable === true &&
                              user?.testName === "IELTS"
                                ? true
                                : false
                            }
                            value="IELTS"
                            name="testName"
                            onChange={handleOnCheckTest}
                            control={<Radio />}
                            label="IELTS"
                          />
                          <FormControlLabel
                            checked={
                              user?.isApplicable === true &&
                              user?.testName === "PTE"
                                ? true
                                : false
                            }
                            value="PTE"
                            name="testName"
                            onChange={handleOnCheckTest}
                            control={<Radio />}
                            label="PTE"
                          />
                          <FormControlLabel
                            checked={user?.isApplicable == false ? true : false}
                            name="isApplicable"
                            onChange={handleOnCheckforNotApplicable}
                            control={<Radio />}
                            label="Not Required"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    {user?.isApplicable === true && (
                      <div className="Reading_Writing_Feild">
                        <Grid sx={{ flex: 1 }}>
                          <TextField
                            id="outlined-size-small"
                            size="small"
                            fullWidth
                            label="Reading"
                            name="readScore"
                            type="number"
                            onChange={handleTestTaken}
                            value={user?.readScore}
                          />
                        </Grid>
                        <Grid sx={{ flex: 1 }}>
                          <Grid disabled={able}>
                            {/* <p className="Writing">Writing</p> */}
                          </Grid>
                          <TextField
                            id="outlined-size-small"
                            size="small"
                            fullWidth
                            // disabled={able}
                            label="Writing"
                            type="number"
                            name="writeScore"
                            onChange={handleTestTaken}
                            value={user?.writeScore}
                          />
                        </Grid>
                        <Grid sx={{ flex: 1 }}>
                          <Grid disabled={able}>
                            {/* <p className="Speaking">Speaking</p> */}
                          </Grid>
                          <TextField
                            id="outlined-size-small"
                            size="small"
                            fullWidth
                            // disabled={able}
                            label="Speaking"
                            name="speakingScore"
                            type="number"
                            onChange={handleTestTaken}
                            value={user?.speakingScore}
                          />
                        </Grid>
                        <Grid sx={{ flex: 1 }}>
                          <Grid disabled={able}>
                            {/* <p className="Listening">Listening</p> */}
                          </Grid>
                          <TextField
                            id="outlined-size-small"
                            size="small"
                            fullWidth
                            // disabled={able}
                            label="Listening"
                            name="listeningScore"
                            type="number"
                            onChange={handleTestTaken}
                            value={user?.listeningScore}
                          />
                        </Grid>
                        <Grid item sx={{ flex: 1 }}>
                          <TextField
                            size="small"
                            required
                            fullWidth
                            id="outlined-required"
                            label="Overall Score"
                            name="overallScore"
                            type="number"
                            onChange={handleTestTaken}
                            value={user?.overallScore}
                          />
                        </Grid>
                      </div>
                    )}
                  </Grid>
                </Grid>
                <Grid item sx={{ display: "flex", pl: 9, pr: 9, gap: 1 }}>
                  <Grid sx={{ width: "-webkit-fill-available", mt: 2 }}>
                    <p className="Study">Intended Field of Study</p>

                    <TextField
                      error={error.fieldOfStudy}
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      fullWidth
                      name="fieldOfStudy"
                      onChange={handleTestTaken}
                      value={user?.fieldOfStudy}
                      helperText={
                        error.fieldOfStudy
                          ? "Please fill valid feild of study"
                          : ""
                      }
                      // label="Intended Feild of Study"
                    />
                  </Grid>
                  <Grid sx={{ width: "-webkit-fill-available", mt: 2 }}>
                    <p className="Institute">Institute of Interest</p>

                    <TextField
                      error={error.instituteOfInterest}
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      fullWidth
                      name="instituteOfInterest"
                      onChange={handleTestTaken}
                      value={user?.instituteOfInterest}
                      helperText={
                        error.instituteOfInterest
                          ? "Please fill valid Institute of Interest"
                          : ""
                      }
                      // label="Intended Feild of Study"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                sx={{ gap: 1, justifyContent: "center", display: "flex", p: 2 }}
              >
                <Grid>
                  <Button variant="outlined" onClick={backFunction}>
                    Back
                  </Button>
                </Grid>
                <Grid>
                  <Button variant="outlined" onClick={handleOnSubmit}>
                    Next
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
export default Education;
