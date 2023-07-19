import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import "../visaenquiry/Education.css";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
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
import styles from "../visaenquiry/VisaEnquiry.module.css";
import Steppers from "../visaenquiry/Stepper";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from "react-redux";
import { saveEducationWorkDetail, saveUserInfo } from "../redux/action/Action";
import { useNavigate } from "react-router-dom";
import { months } from "moment";

const EducationEdit = () => {
  let userDetail = useSelector((state) => state.saveEducationWorkDetails);
  let temp = useSelector((state) => state.saveUserInfo);
  const dispatch = useDispatch();

  let workExperience = temp.userInfo.workExperience;
  let education = temp.userInfo.education;
  let testTaken = temp.userInfo.testTaken;
  console.log(temp.userInfo);
  const navigate = useNavigate();

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const StudyRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
  const [able, setAble] = useState(true);
  const [showScore, setShowScore] = useState(false);
//   const [showAlert, setShowAlert] = React.useState(false);
  const [educationData, setEducationData] = useState(education);
  const [educationRow, setEducationRow] = useState({});
  const [mandatory, setMandatory] = useState("isApplicable");
  const [workExperienceData, setWorkExperienceData] = useState(workExperience);
  const [testTakenData, setTestTakenData] = useState(testTaken);
  const currentYear = new Date().getFullYear();
  const startYear = 1990;
  const years = [];

  //setTestTakenData(temp.userInfo.testTaken)

  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
  }

  

  // const [error, setError] = useState({
  //     fieldOfStudy: "",
  //     interestedInstitute: "",
  //     year: "",
  //     qualification: "",
  //     percent: "",
  //     institute: "",
  //     university: "",
  //     information: "",
  //     month: "",
  //     employer: "",
  //     designation: "",
  //     industry: "",
  //     time: ""
  // });

  // const [education, setEducation] = useState([
  //     {
  //         year: "",
  //         qualification: "",
  //         percentage: "",
  //         institutionName: "",
  //         board: "",
  //         regular: "",
  //     },
  // ]);

  // const [workExperience, setWorkExperience] = useState([
  //     {
  //         years: "",
  //         months: "",
  //         employer: "",
  //         designation: "",
  //         industryType: "",
  //         workSchedule: "",
  //     },
  // ]);

  const handleEducationAdd = () => {
    setEducationData([
      ...educationData,
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
    setWorkExperienceData([
      ...workExperienceData,
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

  const handleEducationRemove = (index) => {
    console.log(index);
    const educatioinArray = [...educationData];
    educatioinArray.splice(index, 1);
    setEducationData(educatioinArray);
  };

  const handleExperinceRemove = (index) => {
    console.log(index);
    const workExperinceArray = [...workExperienceData];
    workExperinceArray.splice(index, 1);
    setWorkExperienceData(workExperinceArray);
  };

  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  const backFunction = (e) => {
    navigate("/documentEdit");
  };

  // const [user, setUser] = useState({
  //     isApplicable: false || data?.testScore?.isApplicable,
  //     testName: data?.testScore?.testName,
  //     readScore: data?.testScore?.readScore,
  //     writeScore: data?.testScore?.writeScore,
  //     speakingScore: data?.testScore?.speakingScore,
  //     listeningScore: data?.testScore?.listeningScore,
  //     overallScore: data?.testScore?.overallScore,
  //     fieldOfStudy: data?.testScore?.fieldOfStudy,
  //     instituteOfInterest: data?.testScore?.instituteOfInterest
  // });

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    let educationArray = [...educationData];
    if (value === "Regular") {
      educationArray[index][name] = true;
      //setEducation(addMoreNewvalue);
    } else if (value === "Distance") {
      educationArray[index][name] = false;
      //setEducation(addMoreNewvalue);
    } else {
      educationArray[index][name] = value;
      //setEducation(addMoreNewvalue);
    }
    setEducationData(educationArray);
    console.log(educationData);
  };
  const handleInputChangeforWorkExperience = (event, index) => {
    const { name, value } = event.target;
    let workExperinceArray = [...workExperienceData];
    workExperinceArray[index][name] = value;
    setWorkExperienceData(workExperinceArray);
    console.log(workExperienceData);
  };

  const handleOnCheckTestTaken = (event) => {
    const { name, value } = event.target;
    let tests = testTakenData;
    if (value !== "isApplicable") {
      setShowScore(true);
      setTestTakenData((prevState) => ({
        ...prevState,
        [name]: value,
        isApplicable: true,
      }));
      setMandatory(value);
    } else {
      setShowScore(false);
      setTestTakenData((prevState) => ({
        ...prevState,
        isApplicable: false,
      }));
      setMandatory(value);
    }
  };
  const handleOnCheckforNotApplicable = (event) => {
    const { name, value } = event.target;
    // setUser((prevState) => ({
    //     ...prevState,
    //     [name]: event.target.checked,
    // }));
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (
      testTaken.fieldOfStudy === undefined ||
      testTaken.instituteOfInterest === undefined
    ) {
      alert("Please fill all the feilds");
    } else if (
      testTaken.readScore === (undefined || "") ||
      testTaken.writeScore === (undefined || "") ||
      testTaken.listeningScore === (undefined || "") ||
      testTaken.speakingScore === (undefined || "") ||
      testTaken.overallScore === (undefined || "")
    ) {
      alert("Please fill all feilds of test taken");
    } else if (
      educationData[0].year === (undefined || "") ||
      educationData[0].qualification === (undefined || "") ||
      educationData[0].board === (undefined || "") ||
      educationData[0].percentage === (undefined || "") ||
      educationData[0].regular === (undefined || "") ||
      educationData[0].institutionName === (undefined || "")
    ) {
      alert("please add education qualification");
    } else {
      let userInfo = temp.userInfo;
      delete userInfo["_id"];

      let education = educationData;
      let workExperience = workExperienceData;
      let t = education.forEach(function (v) {
        delete v._id;
      });
      // let newArr = education.map(({ _id, ...rest }) => {
      //     return rest;
      // });

      // let newWorkExpArray = workExperience.map(({ _id, ...rest }) => {
      //     return rest;
      // });
      userInfo.education = education;
      userInfo.workExperience = workExperience;
      userInfo.education = education;
      //let t =update(userInfo, education);
      console.log(userInfo);
      dispatch(saveUserInfo);
      navigate("/visaEdit");

      //dispatch(savePersonalDetail(user));

      // let data = {
      //     educationData,
      //     workExperienceData,
      //     testScore: {
      //         isApplicable: false || user?.isApplicable,
      //         testName: user?.testName,
      //         readScore: user?.readScore,
      //         writeScore: user?.writeScore,
      //         speakingScore: user?.speakingScore,
      //         listeningScore: user?.listeningScore,
      //         overallScore: user?.overallScore,
      //         fieldOfStudy: user?.fieldOfStudy,
      //         instituteOfInterest: user?.fieldOfStudy
      //     },
      // };

      //dispatch(saveEducationWorkDetail(data));
      //navigate("/VisaDetails");
    }
  };
  // const token = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    setMandatory(testTaken.testName);
    if (testTaken.testName == "IELTS" || testTaken.testName == "PTE") {
      setShowScore(true);
    }
  }, []);

  function removeValuesWithKey(key, array) {
    array.map((item) => {
      if (Object.keys(item).includes(key)) {
        delete item[key];
      } else {
        Object.keys(item).map((itemKey) => {
          if (Array.isArray(item[itemKey])) {
            removeValuesWithKey(key, item[itemKey]);
          }
        });
      }
    });
  }

  // useEffect(() => {
  //     if (!token) {
  //         navigate("/login");
  //     }
  //     if (data.education) {
  //         setEducation(data.education);
  //     }
  //     if (data.workaddmore) {
  //         setWorkAddmore(data.workaddmore);
  //     }
  // }, []);

  function update(target, src) {
    const res = {};
    Object.keys(target).forEach((k) => (res[k] = src[k] ?? target[k]));
    return res;
  }

  return (
    <Container maxWidth="mx" className={styles.containerFix}>
        {/* <Dialog
        fullScreen={fullScreen}
        open={showAlert}
        onClose={() => setShowAlert(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Are you sure you want to delete?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            variant="contained"
            onClick={() => setShowAlert(false)}
          >
            Cancel
          </Button>
          <Button
            autoFocus
            variant="contained"
            onClick={(e) => handleDeleteId(e)}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog> */}
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
                m: 8,

                width: "-webkit-fill-available",
              },
            }}
          >
            <Paper elevation={3}>
              <Grid item mt={1} mb={2}>
                Education
              </Grid>
              {/* <div className="Education"> */}
              <Grid
                item
                sx={{
                  pl: 2,
                  pr: 2,
                  flexWrap: "wrap",
                  flex: 1,
                }}
              >
                {educationData.map((educationItem, index) => (
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
                          value={educationItem?.year}
                        >
                          {years?.map((year) => {
                            return <MenuItem value={year}>{year}</MenuItem>;
                          })}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item sx={{ flex: 1 }}>
                      <TextField
                        size="small"
                        required
                        InputLabelProps={{ shrink: true }}
                        id="outlined-required"
                        label="Qualification"
                        name="qualification"
                        onChange={(event) => handleInputChange(event, index)}
                        value={educationItem?.qualification}
                      />
                    </Grid>
                    <Grid item sx={{ flex: 1 }}>
                      <TextField
                        size="small"
                        required
                        InputLabelProps={{ shrink: true }}
                        id="outlined-required"
                        label="Percent"
                        name="percentage"
                        onChange={(event) => handleInputChange(event, index)}
                        value={educationItem?.percentage}
                      />
                    </Grid>
                    <Grid item sx={{ flex: 1 }}>
                      <TextField
                        size="small"
                        required
                        InputLabelProps={{ shrink: true }}
                        id="outlined-required"
                        label="Institute Name"
                        name="institutionName"
                        onChange={(event) => handleInputChange(event, index)}
                        value={educationItem?.institutionName}
                      />
                    </Grid>
                    <Grid item sx={{ flex: 1 }}>
                      <TextField
                        size="small"
                        required
                        InputLabelProps={{ shrink: true }}
                        id="outlined-required"
                        label="Board/University"
                        name="board"
                        onChange={(event) => handleInputChange(event, index)}
                        value={educationItem?.board}
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
                          InputLabelProps={{ shrink: true }}
                          defaultValue=""
                          value={
                            educationItem?.regular ? "Regular" : "Distance"
                          }
                          onChange={(event) => handleInputChange(event, index)}
                        >
                          <MenuItem value="Regular">Regular</MenuItem>
                          <MenuItem value="Distance">Distance</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item sx={{ flex: 0, pr: 2, mt: 1 }}>
                      <ClearIcon onClick={() => handleEducationRemove(index)} />
                    </Grid>
                  </Grid>
                ))}
                <Grid item sx={{ display: "flex", gap: 1, ml: 1 }}>
                  <Grid item sx={{ pt: 2 }}>
                    {/* <AddIcon onClick={handleEducationAdd} /> */}
                    <Button variant="contained" onClick={handleEducationAdd}>
                      Add More
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid sx={{ width: "-webkit-fill-available" }}>
                Work Experience
              </Grid>
              <Grid>
                {workExperienceData.map((workExperienceItem, index) => (
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      gap: 1,
                      pl: 3,
                      pr: 3,
                      pt: 3,
                      flexWrap: "wrap",
                    }}
                  >
                    <Grid item sx={{ flex: 1 }}>
                      <TextField
                        size="small"
                        id="outlined-required"
                        label="Year"
                        name="years"
                        InputLabelProps={{ shrink: true }}
                        onChange={(event) =>
                          handleInputChangeforWorkExperience(event, index)
                        }
                        value={workExperienceItem?.years}
                      />
                    </Grid>
                    <Grid item sx={{ flex: 1 }}>
                      <TextField
                        size="small"
                        id="outlined-required"
                        label="Month"
                        name="months"
                        InputLabelProps={{ shrink: true }}
                        onChange={(event) =>
                          handleInputChangeforWorkExperience(event, index)
                        }
                        value={workExperienceItem?.months}
                      />
                    </Grid>
                    <Grid item sx={{ flex: 1 }}>
                      <TextField
                        size="small"
                        id="outlined-required"
                        label="Employeer"
                        name="employer"
                        InputLabelProps={{ shrink: true }}
                        onChange={(event) =>
                          handleInputChangeforWorkExperience(event, index)
                        }
                        value={workExperienceItem?.employer}
                      />
                    </Grid>
                    <Grid item sx={{ flex: 1 }}>
                      <TextField
                        size="small"
                        id="outlined-required"
                        label="Designation"
                        name="designation"
                        InputLabelProps={{ shrink: true }}
                        onChange={(event) =>
                          handleInputChangeforWorkExperience(event, index)
                        }
                        value={workExperienceItem?.designation}
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
                          value={workExperienceItem?.industryType}
                          onChange={(event) =>
                            handleInputChangeforWorkExperience(event, index)
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
                          <MenuItem value="Marketing and Advertising.">
                            Busines.
                          </MenuItem>
                          <MenuItem value="Marketing and Advertising.">
                            Agriculture.
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
                            value={workExperienceItem?.workSchedule}
                            onChange={(event) =>
                              handleInputChangeforWorkExperience(event, index)
                            }
                          >
                            <MenuItem value="Full">Full Time</MenuItem>
                            <MenuItem value="Part">Part Time</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid item sx={{ flex: 0, pr: 2, mt: 1 }}>
                      <ClearIcon onClick={() => handleExperinceRemove(index)} />
                    </Grid>
                  </Grid>
                ))}
                <Grid item sx={{ display: "flex", gap: 1, pl: 3, pt: 2 }}>
                  <Grid item sx={{ pt: 1 }}>
                    {/* <AddIcon onClick={handleServiceAddWork} /> */}
                    <Button variant="contained" onClick={handleServiceAddWork}>
                      Add More
                    </Button>
                  </Grid>
                </Grid>
                <Grid sx={{ display: "flex", pl: 3, pr: 3, gap: 1 }}>
                  <Grid sx={{ width: "-webkit-fill-available" }}>
                    <Grid item mt={1}>
                      Test Taken
                    </Grid>
                    <Grid item sx={{ display: "flex", width: "fit-content" }}>
                      <FormControl>
                        <RadioGroup
                          row
                          value={mandatory}
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                        >
                          <FormControlLabel
                            value={"IELTS"}
                            name="testName"
                            onChange={handleOnCheckTestTaken}
                            control={<Radio />}
                            label="IELTS"
                          />
                          <FormControlLabel
                            value={"PTE"}
                            name="testName"
                            onChange={handleOnCheckTestTaken}
                            control={<Radio />}
                            label="PTE"
                          />
                          <FormControlLabel
                            value="isApplicable"
                            name="isApplicable"
                            onChange={handleOnCheckTestTaken}
                            control={<Radio />}
                            label="Not Required"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    {showScore && testTakenData.isApplicable && (
                      <div className="Reading_Writing_Feild">
                        <Grid sx={{ flex: 1 }}>
                          <TextField
                            id="outlined-size-small"
                            size="small"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            label="Reading"
                            name="readScore"
                            type="number"
                            onChange={handleOnCheckTestTaken}
                            value={testTakenData?.readScore}
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
                            InputLabelProps={{ shrink: true }}
                            // disabled={able}
                            label="Writing"
                            type="number"
                            name="writeScore"
                            onChange={handleOnCheckTestTaken}
                            value={testTakenData?.writeScore}
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
                            InputLabelProps={{ shrink: true }}
                            // disabled={able}
                            label="Speaking"
                            name="speakingScore"
                            type="number"
                            onChange={handleOnCheckTestTaken}
                            value={testTakenData?.speakingScore}
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
                            InputLabelProps={{ shrink: true }}
                            // disabled={able}
                            label="Listening"
                            name="listeningScore"
                            type="number"
                            onChange={handleOnCheckTestTaken}
                            value={testTakenData?.listeningScore}
                          />
                        </Grid>
                        <Grid item sx={{ flex: 1 }}>
                          <TextField
                            size="small"
                            required
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            id="outlined-required"
                            label="Overall Score"
                            name="overallScore"
                            type="number"
                            onChange={handleOnCheckTestTaken}
                            value={testTakenData?.overallScore}
                          />
                        </Grid>
                      </div>
                    )}
                  </Grid>
                </Grid>
                <Grid item sx={{ display: "flex", pl: 3, pr: 3, gap: 1 }}>
                  <Grid sx={{ width: "-webkit-fill-available", mt: 2 }}>
                    <p className="Study">Intended Field of Study</p>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      fullWidth
                      name="fieldOfStudy"
                      onChange={handleInputChange}
                      InputLabelProps={{ shrink: true }}
                      // label="Intended Feild of Study"
                      value={testTakenData?.fieldOfStudy}
                    />
                  </Grid>
                  <Grid sx={{ width: "-webkit-fill-available", mt: 2 }}>
                    <p className="Institute">Institue of Interest</p>

                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      fullWidth
                      name="instituteOfInterest"
                      InputLabelProps={{ shrink: true }}
                      // onChange={handleInputChange}
                      value={testTakenData?.instituteOfInterest}
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
export default EducationEdit;
