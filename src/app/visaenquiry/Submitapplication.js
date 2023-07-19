import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import "./Submitapplication.css";
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
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styles from "./VisaEnquiry.module.css";
import Steppers from "./Stepper";
import { useNavigate } from "react-router-dom";
import PreviewForm from "./EnquiryDetails/index";
import { useDispatch, useSelector } from "react-redux";
import { saveSubmitDetail } from "../redux/action/Action";
import { VISA_URL } from "./../../constant/constants";
// import {Circles} from 'react-loader-spinner';
const Submitapplication = () => {
  const steps = [
    "Personal Details ",
    "Education & Work Experience",
    "Visa Detail & Finance",
    "Submit Application",
  ];
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));
  const token = JSON.parse(localStorage.getItem("token"));
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [open, setOpen] = React.useState(false);
  const [openPreview, setOpenPreview] = React.useState(false);
  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }
  const handleClose = () => {
    setOpen(false);
    setOpenPreview(false);
    // navigate("/Submitapplication");
  };
  const handleClickOpenPreview = () => {
    setOpen(true);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    Information: "",
    Other: "Other",
    reference: " ",
  });
  const [knowAboutUs, setKnowAboutUs] = useState({
    Newspaper: false,
    Magazine: false,
    Radio: false,
    Seminar: false,
    Friends: false,
    Internet: false,
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const checkFunction = (event) => {
    const { name, value } = event.target;
    setKnowAboutUs((prevState) => ({
      ...prevState,
      [name]: event.target.checked,
    }));
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (user.Information == "") {
      alert("Please filled all the feilds");
    } else {
      let newArray = imageData?.addmore?.map(({ imageName, imageUrl }) => ({
        imageName,
        imageUrl,
      }));
      newArray.push({
        imageName: "ProfilePic",
        imageUrl: imageData?.imagebyCamera,
      });
      const userData = {
        name: personalDetailData.Salutation + " " + personalDetailData.Name,
        country: personalDetailData.country,
        university: personalDetailData.university,
        fatherName: personalDetailData.FatherName,
        gender: personalDetailData.Gender,
        maritalStatus: personalDetailData.Marital,
        address: personalDetailData.Address,
        mobileNo: personalDetailData.Mobile,
        email: personalDetailData.Email,
        dob: personalDetailData.DOB,
        passportNo: personalDetailData.Passport,
        aadharNo: personalDetailData.Aadhar,
        panNo: personalDetailData.Pancard,
        visaType: personalDetailData.Visa,
        education: Educationdata?.addmore,
        workExperience: Educationdata?.workaddmore,
        testTaken: {
          isApplicable: Educationdata.testScore.isApplicable,
        testName: Educationdata.testScore?.testName,
        readScore: Educationdata.testScore?.readScore,
        writeScore: Educationdata.testScore?.writeScore,
        speakingScore: Educationdata.testScore?.speakingScore,
        listeningScore: Educationdata.testScore?.listeningScore,
        overallScore: Educationdata.testScore?.overallScore,
        fieldOfStudy: Educationdata.testScore?.fieldOfStudy,
        instituteOfInterest: Educationdata.testScore?.instituteOfInterest
        },
       
        fundsAsLiquidAmt: VisaData.Amount,
        fundsAsProperty: VisaData.Property,
        fundsAsAnnualIncome: VisaData.Income,
        needEducationLoan: VisaData.isEducationLoan,
        loanAmount: VisaData.Loan,
        visaEarlierRefused: VisaData.isRefusedVisa,
        visaRefusalReason: VisaData.reason,
        relativesAbroad: VisaData.isRelativeAboard,
        relativeSponsorReason: VisaData.aboardsponsoring,
        newspaper: knowAboutUs.Newspaper,
        magazine: knowAboutUs.Magazine,
        radio: knowAboutUs.Radio,
        seminar: knowAboutUs.Seminar,
        friends: knowAboutUs.Friends,
        internet: knowAboutUs.Internet,
        others: user.Other,
        // enquiryStatus: "pending",
        declaration: user.Information,
        reference: user.reference,

        images: newArray,
      };

   
      console.log("Data before calling Api", userData);
      setOpen(true);
      // API implementation of Visa enquiry
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      axios
        .post(`${VISA_URL}/users/submitFormDetails`, userData, config)
        .then((response) => {
          if (response?.data?.response == "success") {
            // setLoading(false);
            alert(response?.data?.message);

            navigate("/EnquiriesList");
          } else {
            alert(response?.data.error + " --" + response?.data.errordesc);
          }
        })
        .catch((error) => {
          console.log(error);
        });

      // navigate("/");
      // Send the user data to the server here
    }
  };
  const popUp = () => {
    setOpen(true);
  };

  let userDetail = useSelector((state) => state.saveSubmitDetails);
  let data = userDetail.submitDetail;
  let Details = useSelector((state) => state.savePersonalDetails);
  console.log("Details",Details);
  let personalDetailData = Details.personalDetail;
  console.log("personalDetailData",personalDetailData);
  let Visa = useSelector((state) => state.saveVisaDetails);
  let VisaData = Visa.visaDetail;
  let Education = useSelector((state) => state.saveEducationWorkDetails);
  let Educationdata = Education.educationWorkDetail;
  let UploadImages = useSelector((state) => state.saveUploadedImages);
  let imageData = UploadImages.uploadImages;
  console.log("Educa", Educationdata);

  const backFunction = (e) => {
    navigate("/VisaDetails");
  };
  const dataPreview = (e) => {
    setOpen(true);

    let dataTosend = {
      user,
      knowAboutUs,
    };
    dispatch(saveSubmitDetail(dataTosend));
    let newArray = imageData?.addmore?.map(({ imageName, imageUrl }) => ({
      imageName,
      imageUrl,
    }));
    newArray.push({
      imageName: "ProfilePic",
      imageUrl: imageData?.imagebyCamera,
    });
    const userData = {
      name: personalDetailData.Salutation + " " + personalDetailData.Name,
      fatherName: personalDetailData.FatherName,
      gender: personalDetailData.Gender,
      maritalStatus: personalDetailData.Marital,
      address: personalDetailData.Address,
      country: personalDetailData.country,
      university: personalDetailData.university,
      mobileNo: personalDetailData.Mobile,
      email: personalDetailData.Email,
      dob: personalDetailData.DOB,
      passportNo: personalDetailData.Passport,
      aadharNo: personalDetailData.Aadhar,
      panNo: personalDetailData.Pancard,
      visaType: personalDetailData.Visa,
      education: Educationdata?.addmore,
      workExperience: Educationdata.workaddmore,
      testTaken: {
        isApplicable: Educationdata.testScore.isApplicable,
        testName: Educationdata.testScore?.testName,
        readScore: Educationdata.testScore?.readScore,
        writeScore: Educationdata.testScore?.writeScore,
        speakingScore: Educationdata.testScore?.speakingScore,
        listeningScore: Educationdata.testScore?.listeningScore,
        overallScore: Educationdata.testScore?.overallScore,
        fieldOfStudy: Educationdata.testScore?.fieldOfStudy,
        instituteOfInterest: Educationdata.testScore?.instituteOfInterest
       
      },
      
      fundsAsLiquidAmt: VisaData.Amount,
      fundsAsProperty: VisaData.Property,
      fundsAsAnnualIncome: VisaData.Income,
      needEducationLoan: VisaData.isEducationLoan,
      loanAmount: VisaData.Loan,
      visaEarlierRefused: VisaData.isRefusedVisa,
      visaRefusalReason: VisaData.reason,
      relativesAbroad: VisaData.isRelativeAboard,
      relativeSponsorReason: VisaData.aboardsponsoring,
      newspaper: knowAboutUs.Newspaper,
      magazine: knowAboutUs.Magazine,
      radio: knowAboutUs.Radio,
      seminar: knowAboutUs.Seminar,
      friends: knowAboutUs.Friends,
      internet: knowAboutUs.Internet,
      others: user.Other,
      declaration: user.Information,
      images: newArray,
      reference: user.reference,
    };
    navigate("/EnquiryDetails", {
      state: {
        Data: userData,
      },
    });
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    if (data.knowAboutUs) setKnowAboutUs(data.knowAboutUs);
    if (data.user) setUser(data.user);
  }, []);

  // if (loading) {
  //   return (
  //     <div className="loader-container">
  //       <Circles type="Puff" color="#3081E8" height={100} width={100} />
  //     </div>
  //   );
  // }
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
              <Grid container spacing={2} sx={{ pl: 10 ,pt:3}}>
                <Grid item xs={8}>
                  <p className="Information">Reference</p>
                   <Grid sx={{pt:1}}>
                  <TextField
                    id="outlined-size-small"
                    size="normal"
                    fullWidth
                    required
                    name="reference"
                    onChange={handleInputChange}
                    value={user?.reference}
                  />
                  </Grid>
                </Grid>
                <Grid item xs={8}>
                  <p className="Information">
                    Any Other Information you want to declare?
                  </p>
                  <Grid sx={{pt:1}}>
                  <TextField
                    id="outlined-size-small"
                    size="normal"
                    fullWidth
                    required
                    name="Information"
                    onChange={handleInputChange}
                    value={user?.Information}
                  />
                  </Grid>
                </Grid>
                <Grid item xs={8}>
                  <p className="Information">
                    How did you come to know about us?
                  </p>

                  <Grid sx={{ display: "flex", flexWrap: "wrap",alignItems:"center",pt:2}}>
                    <Checkbox
                      {...label}
                      name="Newspaper"
                      onChange={checkFunction}
                      checked={knowAboutUs?.Newspaper}
                    />
                    <p>Newspaper</p>
                    <Checkbox
                      {...label}
                      name="Magazine"
                      onChange={checkFunction}
                      checked={knowAboutUs?.Magazine}
                    />
                    <p>Magazine</p>
                    <Checkbox
                      {...label}
                      name="Radio"
                      onChange={checkFunction}
                      checked={knowAboutUs?.Radio}
                    />
                    <p>Radio</p>
                    <Checkbox
                      {...label}
                      name="Seminar"
                      onChange={checkFunction}
                      checked={knowAboutUs?.Seminar}
                    />
                    <p>Seminar</p>
                    <Checkbox
                      {...label}
                      name="Friends"
                      onChange={checkFunction}
                      checked={knowAboutUs?.Friends}
                    />
                    <p>Friends</p>
                    <Checkbox
                      {...label}
                      name="Internet"
                      onChange={checkFunction}
                      checked={knowAboutUs?.Internet}
                    />
                    <p>Internet</p>
                  </Grid>
                  <Grid item sx={{ mt: 3 }}>
                    <TextField
                      id="outlined-size-small"
                      size="normal"
                      fullWidth
                      label="Other(Please specify)"
                      name="Other"
                      onChange={handleInputChange}
                      value={user?.Other}
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
                    
                    <Button variant="outlined" onClick={dataPreview}>
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
                  <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                  >
                    <BootstrapDialogTitle
                      id="customized-dialog-title"
                      onClose={handleClose}
                    >
                      Are you sure you want to submit the form?
                    </BootstrapDialogTitle>
                    {/* <DialogTitle id="alert-dialog-title">
                      {"Are you sure you want to submit the form?"}
                    </DialogTitle> */}
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Please take a moment to review your entries before
                        submitting the form. This will help ensure that all the
                        information provided is accurate and complete.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      {/* <Link href="/EnquiryDetails" underline="none"> */}
                      <Button onClick={dataPreview}>Preview</Button>
                      {/* </Link> */}
                      {/* <Link href="/" underline="none"> */}
                      <Button onClick={handleOnSubmit} autoFocus>
                        Submit
                      </Button>
                      {/* </Link> */}
                    </DialogActions>
                  </BootstrapDialog>
                </Dialog>
              </Grid>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
export default Submitapplication;
