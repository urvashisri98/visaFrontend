import React, { useEffect, useState, useRef } from "react";
import "./EnquiryDetails.css";
import Grid from "@mui/material/Grid";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Breadcrumbs,
  Link,
  Typography,
  Container,
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import moment from "moment";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import AlignItemsList from "./Comments.js";
import axios from "axios";
import { VISA_URL } from "../../../constant/constants";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ImageIcon from "@mui/icons-material/Image";
import { AddComment } from "@mui/icons-material";
import CircularJSON from "circular-json";
import { Circles } from "react-loader-spinner";

export const Viewenquirylist = () => {
  const theme = useTheme();
  const childRef = useRef();
  const [currentChannelData, setCurrentChannelData] = useState([]);

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [previewData, setPreviewData] = useState();
  const [newChannelValue, setNewChannelValue] = useState("");
  const [newChannelName, setNewChannelName] = useState("");
  const [education, setEducation] = useState([]);
  const [workExperience, setWorkExperience] = useState([]);
  const [testTaken, setTestTaken] = useState([]);
  const [comment, setComment] = useState("");
  const [channelsData, setChannelsData] = useState("");
  const [comments, setComments] = useState([]);
  const [status, setStatus] = useState("");
  const [editable, setEditable] = useState(false);
  const [assignedTo, setAssignedTo] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [addChannelDialog, showAddChannelDialog] = useState(false);
  const [userList, setUserList] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));
  const [visaApprovedDialog, showVisaApprovedDialog] = useState(false);
  const [visaApprovalDate, setVisaApprovalDate] = useState();
  const [visaApprovalStudentId, setVisaApprovalStudentId] =
    React.useState(null);
  const [intakeValue, setIntakeValue] = useState(null);
  const [channelValue, setChannelValue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [channelList, setChannelList] = React.useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

    if (result?.data) {
      setLoading(false);
      console.log(result?.data);
      setPreviewData(result?.data?.data);
      let tempChannelsdata = "";
      result?.data?.data?.channel.map((items) => {
        tempChannelsdata = tempChannelsdata + items + "  ,";
      });

      console.log(result?.data?.data.channel);
      setChannelsData(tempChannelsdata);
      setWorkExperience(result?.data?.data?.workExperience);
      setEducation(result?.data?.data?.education);
      setTestTaken(result?.data?.data?.testTaken);
      console.log(result?.data?.data?.comments);
      if (result?.data?.data?.comments) {
        childRef.current.showComments(result?.data?.data?.comments);
      }
    }

    setStatus(result?.data?.data?.applicationStatus);
    setAssignedTo(result?.data?.data?.assignee?._id);
    console.log(status);
  };

  const intakeChangeHandler = (e) => {
    setIntakeValue(e.target.value);
  };

  const submitVisaApprovedDialog = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .post(
        `${VISA_URL}/users/addApprovedChannel`,
        {
          intakeDate: visaApprovalDate,
          intake: intakeValue,
          channelId: channelValue,
          studentId: visaApprovalStudentId,
        },
        config
      )
      .then((response) => {
        setLoading(false);
        console.log("Res ==> ", response);
        showVisaApprovedDialog(false);
        // fetchData();
      })
      .catch((error) => {
        console.log("Error ==> ", error);
      });
  };

  const getUsersListData = async () => {
    const result = await axios.get(`${VISA_URL}/users/getUsers`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    setLoading(false);
    setUserList(result);
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    getUsersListData();
    if (location.state.studentId) {
      studentsData(location.state.studentId);
      //setEditable(editable);
    }
    getChannelList();
    //getComents(location.state.studentId);
  }, []);

  const assignedToOnClick = async (event) => {
    const result = await axios.put(
      `${VISA_URL}/users/assignUser`,
      { userId: event.target.value, studentId: location.state.studentId },
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("result assignUser", result);
    setLoading(false);
    setAssignedTo(event.target.value);
  };

  const onBack = () => {
    navigate("/EnquiriesList");
  };

  const edit = () => {
    console.log("edit");
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const addComents = async (studentId) => {
    const result = await axios.post(
      `${VISA_URL}/users/addComments`,
      CircularJSON.stringify({
        student: location.state.studentId,
        text: comment,
      }),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (result?.data?.response == "success") {
      console.log(result?.data);
      studentsData(location.state.studentId);
      setLoading(false);
    }
    setOpen(false);
  };

  const getChannelListForStudent = async (stuId) => {
    const result = await axios.get(
      `${VISA_URL}/users/getChannel?studentId=${stuId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    setLoading(false);
    setCurrentChannelData(result?.data?.channels);
  };

  const getChannelList = async (stuId) => {
    const result = await axios.get(
      `${VISA_URL}/users/getChannel`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    setLoading(false);
    console.log(result?.data?.channels);
    setChannelList(result?.data?.channels);
    channelList?.map((items) => {
      console.log(items.channelId);
    });
  };

  const onChannelChanhge = async (event) => {
    const { name, value } = event.target;
    console.log("++++++++++++++");
    console.log(name);
    setNewChannelValue(value);
    setNewChannelName(name);
  };

  const onStatus = async (data) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    if (data.target.value == "visaApproved") {
      showVisaApprovedDialog(true);
      setVisaApprovalStudentId(location.state.studentId);
      getChannelListForStudent(location.state.studentId);
    }
    setStatus(data.target.value);

    axios
      .post(
        `${VISA_URL}/users/addStudentApplicationStatus?studentId=${location.state.studentId}`,
        {
          // studentId: Id,
          status: data.target.value,
          // status: selectedOption,
        },
        config
      )
      .then((response) => {
        setLoading(false);
        console.log("Res ==> ", data.target.value);
        setComment(data.target.value);
        addComents(location.state.studentId);
      })
      .catch((error) => {
        console.log("Error ==> ", error);
      });
  };

  const addChannelHandler = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    await axios
      .post(
        `${VISA_URL}/users/assignStudentChannel`,
        {
          channel: newChannelName,
          studentId: location.state.studentId,
          channelId: newChannelValue,
        },
        config
      )
      .then((response) => {
        setLoading(false);
        console.log("Res ==> ", response);
        showAddChannelDialog(false);
        if (response?.data?.response == "success") {
          //setNewChannelValue("");
          studentsData(location.state.studentId);
        }
      })
      .catch((error) => {
        console.log("Error ==> ", error);
      });
  };

  const getComents = async (studentId) => {
    const result = await axios.get(
      `${VISA_URL}/users/getComments?studentId=${studentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (result?.data?.comments) {
      setLoading(false);
      childRef.current.showComments(result?.data?.comments);
    }
    //getComents(location.state.studentId);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setComment(value);
  };
  if (loading) {
    return (
      <div className="loader-container">
        <Circles type="Puff" color="#3081E8" height={100} width={100} />
      </div>
    );
  }
  return (
    <>
      <Container>
        <Dialog
          fullScreen={fullScreen}
          open={addChannelDialog}
          onClose={() => showAddChannelDialog(false)}
        >
          <DialogTitle id="responsive-dialog-title">
            {"Please select the channel name:"}
          </DialogTitle>
          <DialogContent>
            <Grid container>
              <Grid item>
                <FormControl sx={{ m: 1, minWidth: 220 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Channel
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={newChannelValue}
                    fullWidth
                    onChange={(e) => onChannelChanhge(e)}
                  >
                    {" "}
                    {channelList?.map((items) => {
                      return (
                        <MenuItem value={items?.channelId}>
                          {items?.channel}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              variant="contained"
              onClick={() => addChannelHandler()}
              size="small"
            >
              Submit
            </Button>
            <Button
              autoFocus
              variant="contained"
              onClick={() => showAddChannelDialog(false)}
              size="small"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <Grid
          container
          maxWidth="lg"
          direction="column"
          justify="flex-end"
          spacing={4}
        >
          <Grid item m={1}>
            <Box>
              <Breadcrumbs maxItems={2} aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                  Home
                </Link>
                <Typography color="text.primary">Countries</Typography>
              </Breadcrumbs>
            </Box>
          </Grid>
        </Grid>
        <Accordion disabled>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Container maxWidth="lg">
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                marginBottom={2}
                marginTop={2}
              >
                <Grid item></Grid>
                <Grid item>
                  <b>Status : </b>
                  {previewData?.applicationStatus
                    .replace(/([A-Z])/g, " $1")
                    .trim()
                    .replace(/\w\S*/g, function (txt) {
                      return (
                        txt.charAt(0).toUpperCase() +
                        txt.substr(1).toLowerCase()
                      );
                    })}
                </Grid>
              </Grid>
            </Container>
          </AccordionSummary>
          <AccordionDetails></AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Personal </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container maxWidth="lg">
              <Grid container maxWidth="lg" spacing={1}>
                <Grid item md={4}>
                  <Box display="flex" justifyContent="flex-start">
                    <b>Name : </b>
                    {previewData?.name}
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Box display="flex" justifyContent="flex-start">
                    <b>DOB : </b>
                    {previewData?.dob}
                  </Box>
                </Grid>

                <Grid item md={4}>
                  <Box display="flex" justifyContent="flex-start">
                    <b>Father Name : </b>
                    {previewData?.fatherName}
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Box display="flex" justifyContent="flex-start">
                    <b>Aadhar No : </b>
                    {previewData?.aadharNo}
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Box display="flex" justifyContent="flex-start">
                    <b>Pan No : </b>
                    {previewData?.panNo}
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Box display="flex" justifyContent="flex-start">
                    <b>Passport Reference Number</b>
                    {previewData?.passportNo}
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Box display="flex" justifyContent="flex-start">
                    <b>Email : </b>
                    {previewData?.email}
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Box display="flex" justifyContent="flex-start">
                    <b>Visa Type : </b>
                    {previewData?.visaType}
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Box display="flex" justifyContent="flex-start">
                    <b>Marital Status: </b>
                    {previewData?.maritalStatus}
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Box display="flex" justifyContent="flex-start">
                    <b>Address: </b>
                    {previewData?.address}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Education</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {education?.map((item) => (
              <Grid container maxWidth="lg">
                <Grid container maxWidth="lg" spacing={1}>
                  <Grid item md={4}>
                    <Box display="flex" justifyContent="flex-start">
                      <b>Degree : </b>
                      {item?.qualification}
                    </Box>
                  </Grid>
                  <Grid item md={4}>
                    <Box display="flex" justifyContent="flex-start">
                      <b>Institute/University : </b>
                      {item?.institutionName}
                    </Box>
                  </Grid>
                  <Grid item md={4}>
                    <Box display="flex" justifyContent="flex-start">
                      <b>Year : </b>
                      {item?.year}
                    </Box>
                  </Grid>
                  <Grid item md={4}>
                    <Box display="flex" justifyContent="flex-start">
                      <b>Board : </b>
                      {item?.board}
                    </Box>
                  </Grid>
                  <Grid item md={4}>
                    <Box display="flex" justifyContent="flex-start">
                      <b>Regular/Distance : </b>
                      {item?.regular ? "Regular" : "Distance"}
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>Work Experince</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {workExperience?.map((item) => (
              <Grid container maxWidth="lg">
                <Grid container maxWidth="lg" spacing={1}>
                  <Grid item md={4}>
                    <Box display="flex" justifyContent="flex-start">
                      <b>Years : </b>
                      {item?.years}
                    </Box>
                  </Grid>
                  <Grid item md={4}>
                    <Box display="flex" justifyContent="flex-start">
                      <b>Months : </b>
                      {item?.months}
                    </Box>
                  </Grid>
                  <Grid item md={4}>
                    <Box display="flex" justifyContent="flex-start">
                      <b>Designation : </b>
                      {item?.designation}
                    </Box>
                  </Grid>
                  <Grid item md={4}>
                    <Box display="flex" justifyContent="flex-start">
                      <b>IndustryType : </b>
                      {item?.industryType}
                    </Box>
                  </Grid>
                  <Grid item md={4}>
                    <Box display="flex" justifyContent="flex-start">
                      <b>WorkSchedule : </b>
                      {item?.workSchedule}
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>Test Taken</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container maxWidth="lg">
              <Grid container maxWidth="lg" spacing={1}>
                <Grid item md={4}>
                  <Box display="flex" justifyContent="flex-start">
                    <b>Test : </b>
                    {previewData?.testTaken?.testName
                      ? previewData?.testTaken?.testName
                      : "NA"}
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Box display="flex" justifyContent="flex-start">
                    <b>Reading : </b>
                    {previewData?.testTaken?.readScore
                      ? previewData?.testTaken?.readScore
                      : "NA"}
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Box display="flex" justifyContent="flex-start">
                    <b>Writing : </b>
                    {previewData?.testTaken?.writeScore
                      ? previewData?.testTaken?.writeScore
                      : "NA"}
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Box display="flex" justifyContent="flex-start">
                    <b>Speaking : </b>
                    {previewData?.testTaken?.speakingScore
                      ? previewData?.testTaken?.speakingScore
                      : "NA"}
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Box display="flex" justifyContent="flex-start">
                    <b>Listening : </b>
                    {previewData?.testTaken?.listeningScore
                      ? previewData?.testTaken?.listeningScore
                      : "NA"}
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Box display="flex" justifyContent="flex-start">
                    <b>IELTS Overall : </b>
                    {previewData?.testTaken?.overallScore
                      ? previewData?.testTaken?.overallScore
                      : "NA"}
                  </Box>
                </Grid>

                <Grid item md={4}>
                  <Box display="flex" justifyContent="flex-start">
                    <b>Field of Study : </b>
                    {previewData?.testTaken?.fieldOfStudy}
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Box display="flex" justifyContent="flex-start">
                    <b>Institute of interest : </b>
                    {previewData?.testTaken?.instituteOfInterest}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>Financial</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container maxWidth="lg">
              <Grid container maxWidth="lg" spacing={1}>
                <Grid item md={4}>
                  <Box display="flex" justifyContent="flex-start">
                    <b>Funds as Liqidity : </b>
                    {previewData?.fundsAsLiquidAmt}
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Box display="flex" justifyContent="flex-start">
                    <b>Funds as peoperty : </b>
                    {previewData?.fundsAsProperty}
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Box display="flex" justifyContent="flex-start">
                    <b>Funds as Annual Income : </b>
                    {previewData?.fundsAsAnnualIncome}
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Box display="flex" justifyContent="flex-start">
                    <b>Education loan : </b>
                    {previewData?.needEducationLoan ? "Yes" : "No"}
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Box display="flex" justifyContent="flex-start">
                    <b>Loan Amount : </b>
                    {previewData?.loanAmount}
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Box display="flex" justifyContent="flex-start">
                    <b>Earlier Visa refusal : </b>
                    {previewData?.visaEarlierRefused ? "Yes" : "No"}
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Box display="flex" justifyContent="flex-start">
                    <b>Visa Refusal Reason : </b>
                    {previewData?.visaRefusalReason}
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Box display="flex" justifyContent="flex-start">
                    <b>Relatives Abroad : </b>
                    {previewData?.relativesAbroad ? "Yes" : "No"}
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Box display="flex" justifyContent="flex-start">
                    <b>Relative Sponsor Visa : </b>
                    {previewData?.relativeSponsorReason}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>Visa</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container maxWidth="lg">
              <Grid container maxWidth="lg" spacing={1}>
                {/* <Grid item md={4} >
                  <Box display="flex" justifyContent="flex-start">
                    <b>Funds as Liqidity : </b>{previewData?.visaEarlierRefused}
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Box display="flex" justifyContent="flex-start">
                    <b>Visa Refusal Reason : </b>{previewData?.visaRefusalReason}
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Box display="flex" justifyContent="flex-start">
                    <b>Relatives Abroad : </b>{previewData?.relativesAbroad}
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Box display="flex" justifyContent="flex-start">
                    <b>Relative Sponsor Reason : </b>{previewData?.relativeSponsorReason}
                  </Box>
                </Grid> */}
                <Grid item md={8}>
                  <Box display="flex" justifyContent="flex-start" gap="10px">
                    <b>How you came to know : </b>
                    <p>{previewData?.newspaper === true ? "Newspaper " : ""}</p>
                    <p>{previewData?.magazine === true ? "Magzine " : ""}</p>

                    <p>{previewData?.seminar === true ? "Seminar " : ""}</p>
                    <p>{previewData?.friends === true ? "Friends " : ""}</p>
                    <p>{previewData?.internet === true ? "Internet " : ""}</p>
                    <p>{previewData?.radio === true ? "Radio " : ""}</p>
                    <p>{previewData?.others}</p>
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Box display="flex" justifyContent="flex-start">
                    <b>Reference : </b>
                    {previewData?.reference}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>Documents</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container maxWidth="lg" style={{ display: "flex" }}>
              <Grid
                item
                xs={8}
                maxWidth="lg"
                spacing={1}
                style={{ display: "flex" }}
              >
                <Grid item xs={4} style={{ display: "flex" }}>
                  {previewData?.images.map((item) => (
                    <Box
                      display="flex"
                      justifyContent={"flex-start"}
                      alignItems={"flex-start"}
                      flexDirection={"column"}
                    >
                      {item.imageName !== "ProfilePic" ? (
                        <>
                          <Typography
                            style={{
                              fontSize: 20,
                              marginBottom: 10,
                              fontWeight: "500",
                            }}
                          >
                            {item?.imageName}
                          </Typography>
                          <img
                            className="imageStyle"
                            src={item?.imageUrl}
                            alt={item?.imageUrl}
                          />
                        </>
                      ) : (
                        ""
                      )}
                    </Box>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={4}>
                {previewData?.images.map((item) => (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems={"flex-start"}
                  >
                    {item.imageName === "ProfilePic" && (
                      <Box>
                        <Typography
                          style={{
                            fontSize: 25,
                            marginBottom: 10,
                            fontWeight: "500",
                          }}
                        >
                          Profile Pic
                        </Typography>
                        <img src={item?.imageUrl} />
                      </Box>
                    )}
                  </Box>
                ))}
              </Grid>
            </Grid>

            <Typography style={{ textAlign: "left", marginTop: 30 }}>
              <b>Channels : </b>
              {channelsData}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Container maxWidth="lg">
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={2}
            marginTop={2}
          >
            <Grid item>
              <Button variant="contained" onClick={showAddChannelDialog}>
                <AddIcon sx={{ fontSize: 18 }} />
                Add Channel{" "}
              </Button>
            </Grid>

            <Grid item>
              <FormControl sx={{ textAlign: "left" }} size="small" fullWidth>
                <InputLabel
                  id="demo-simple-select-helper-label"
                  sx={{ fontSize: 13 }}
                >
                  Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="outlined-required"
                  label="Status"
                  name="status"
                  fullWidth
                  defaultValue={status}
                  value={status}
                  onChange={(value) => onStatus(value)}
                >
                  <MenuItem value={"incompleteDocuments"}>
                    Incomplete documents
                  </MenuItem>
                  <MenuItem value={"applicationOnAssessment"}>
                    Application on assessment
                  </MenuItem>
                  <MenuItem value={"offerApplied"}>Offer Applied</MenuItem>
                  <MenuItem value={"offerReceived"}>Offer Received</MenuItem>
                  <MenuItem value={"fileLogged"}>File Logged</MenuItem>
                  <MenuItem value={"visaApproved"}>Visa Approved</MenuItem>
                  <MenuItem value={"visaDecline"}>Visa Decline</MenuItem>
                  <MenuItem value={"onshore"}>Onshore</MenuItem>
                  <MenuItem value={"refund"}>Refund</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl sx={{ textAlign: "left" }} size="small" fullWidth>
                <InputLabel
                  id="demo-simple-select-helper-label"
                  sx={{ fontSize: 13 }}
                >
                  Assigned
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="outlined-required"
                  label="Assigned"
                  name="Assigned"
                  fullWidth
                  defaultValue=""
                  value={assignedTo}
                  onChange={(value) => assignedToOnClick(value)}
                >
                  {userList?.data?.data?.users.map((items) => {
                    return (
                      <MenuItem value={items?._id}>{items?.name}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleClickOpen}>
                <AddIcon sx={{ fontSize: 18 }} />
                Comments{" "}
              </Button>
            </Grid>
          </Grid>
        </Container>
        <AlignItemsList ref={childRef}></AlignItemsList>
      </Container>
      <Dialog
        fullScreen={false}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Enter Comments."}
        </DialogTitle>
        <DialogContent sx={{ minWidth: 350 }}>
          <TextField
            name="comment"
            fullWidth
            id="fullWidth"
            onChange={(event) => {
              handleInputChange(event);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => addComents(location.state.studentId)}
            autoFocus
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullScreen={fullScreen}
        open={visaApprovedDialog}
        onClose={() => showVisaApprovedDialog(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Please enter the following fields:"}
        </DialogTitle>
        <DialogContent>
          <TextField
            type="date"
            label="Date"
            margin={"normal"}
            size={"small"}
            defaultValue={moment().format("YYYY-MM-DD")}
            value={visaApprovalDate}
            onChange={(event) => setVisaApprovalDate(event.target.value)}
          />
          <FormControl sx={{ textAlign: "left" }} size="small" fullWidth>
            <InputLabel
              id="demo-simple-select-helper-label"
              sx={{ fontSize: 13 }}
            >
              Intake
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="outlined-required"
              label="Intake"
              name="intake"
              fullWidth
              value={intakeValue}
              onChange={(e) => intakeChangeHandler(e)}
            >
              <MenuItem value={"january"}>January</MenuItem>
              <MenuItem value={"february"}>February</MenuItem>
              <MenuItem value={"march"}>March</MenuItem>
              <MenuItem value={"april"}>April</MenuItem>
              <MenuItem value={"may"}>May</MenuItem>
              <MenuItem value={"june"}>June</MenuItem>
              <MenuItem value={"july"}>July</MenuItem>
              <MenuItem value={"august"}>August</MenuItem>
              <MenuItem value={"september"}>September</MenuItem>
              <MenuItem value={"october"}>October</MenuItem>
              <MenuItem value={"november"}>November</MenuItem>
              <MenuItem value={"december"}>December</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            sx={{ textAlign: "left" }}
            size="small"
            fullWidth
            style={{ marginTop: 8 }}
          >
            <InputLabel
              id="demo-simple-select-helper-label"
              sx={{ fontSize: 13 }}
            >
              Channel
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="outlined-required"
              label="Channel"
              name="channel"
              fullWidth
              value={channelValue}
              onChange={(e) => setChannelValue(e.target.value)}
            >
              {/* <MenuItem selected value={""}></MenuItem> */}
              {channelList?.map((item) => {
                return (
                  <MenuItem value={item.channelId}>{item.channel}</MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            variant="contained"
            onClick={() => submitVisaApprovedDialog()}
            size="small"
          >
            Submit
          </Button>
          <Button
            autoFocus
            variant="contained"
            onClick={() => showVisaApprovedDialog(false)}
            size="small"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
