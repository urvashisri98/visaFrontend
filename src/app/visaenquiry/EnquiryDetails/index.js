import React, { useEffect, useState } from "react";
import "./EnquiryDetails.css";
import Grid from "@mui/material/Grid";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Select from "react-select";
import Box from "@mui/material/Box";
import { margin } from "@mui/system";
import MenuItem from '@mui/material/MenuItem';
import DummyProfilePic from "./../../../images/dummy-profile-pic.png";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { VISA_URL } from "../../../constant/constants";

export const EnquiryDetails = () => {

  const [previewData, setPreviewData] = useState();
  const [education, setEducation] = useState([]);
  const [workExperience, setWorkExperience] = useState([]);
  const [status, setStatus] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [uploadedImages, setuploadedImages] = useState([
    { imageName: "", imageUrl: "" },
  ]);
  const navigate = useNavigate();
  const location = useLocation();
  // const [displayHistory, setDisplayHistory] = useState(false);
  // const [recentComment, setRecentComment] = useState('');
  // const [countryList, setCountryList] = useState();
  // const [country, setCountry] = useState('');
  // const [univ, setUniv] = useState('');
  // const [universityList, setUniversityList] = useState();

  const token = JSON.parse(localStorage.getItem("token"));
  


  useEffect(() => {
    console.log(location.state);
    console.log(location.state.Data);
   
    setPreviewData(location.state.Data);
    if (location.state.Data.education)
      setEducation(location.state.Data.education);
    if (location.state.Data.workExperience)
      setWorkExperience(location.state.Data.workExperience);
    if (location.state.Data?.images) {
      console.log("location.state.Data?.images", location.state.Data?.images);
      setuploadedImages(location.state.Data?.images);
    }
    if (!token) {
      navigate("/login");
    }
   
    //all data sets on (preveiwData) state
  }, []);


  console.log("previewData ", location.state.Data?.images);
  const onBack = () => {
    navigate("/submitapplication");
  };
  return (
    <div className="main-container-enquiry-details">
      <div style={{ marginBottom: "10px", paddingLeft: 50, paddingRight: 50, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <h4 style={{ textAlign: "left", color: "#3b7eeb" }}>Preview Form</h4>
        <Button style={{ float: 'right' }} variant="outlined" onClick={onBack}>
          Back
        </Button>
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
              <Grid item xs={3} style={{ textAlign: "left" }}>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Name</p>
                  <p>{previewData?.name}</p>
                </div>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>DOB</p>
                  <p>{previewData?.dob}</p>
                </div>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Father Name</p>
                  <p>{previewData?.fatherName}</p>
                </div>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Aadhar card number</p>
                  <p>{previewData?.aadharNo}</p>
                </div>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Address</p>
                  <p>{previewData?.address}</p>
                </div>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Country</p>
                  <p>{previewData?.country}</p>
                </div>
              </Grid>
              <Grid item xs={3} style={{ textAlign: "left" }}>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Passport Number</p>
                  <p>{previewData?.passportNo}</p>
                </div>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Mobile Number</p>
                  <p>{previewData?.mobileNo}</p>
                </div>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Pan card number</p>
                  <p>{previewData?.panNo}</p>
                </div>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Email</p>
                  <p>{previewData?.email}</p>
                </div>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Visa type</p>
                  <p>{previewData?.visaType}</p>
                </div>
                
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>University</p>
                  <p>{previewData?.university}</p>
                </div>
              </Grid>
              <Grid
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
                {uploadedImages?.map((items) => {
                  return (
                    <Grid
                      item
                      xs={3}
                      sm={5}
                      p={1}
                    >
                      {console.log("items", items.imageName)}
                      <span className="imageHeading">{items.imageName}</span>
                      <div>
                        <img
                          className="imageStyle"
                          src={items.imageUrl}
                          //   src="https://etimg.etb2bimg.com/thumb/msid-78488887,width-1200,resizemode-4/.jpg"
                          alt={items.imageName}
                        ></img>
                      </div>
                    </Grid>
                  );
                })}
                {/* <Grid item xs={3} sm={5} p={1}>
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
                </Grid> */}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <h3 style={{ textAlign: "left" }}>Educational Details</h3>
            <hr style={{ marginBottom: 20 }}></hr>
            {education.map((item) => (
              <Grid container spacing={2}>
                <Grid item xs={1} style={{ textAlign: "Center" }}>
                  <div style={{ marginBottom: 40 }}>
                    <p style={{ color: "#8a9099" }}>Year</p>
                    <p>{item.year}</p>
                  </div>
                </Grid>
                <Grid item xs={2} style={{ textAlign: "Center" }}>
                  <div style={{ marginBottom: 40 }}>
                    <p style={{ color: "#8a9099" }}>Qualification</p>
                    <p>{item.qualification}</p>
                  </div>
                </Grid>
                <Grid item xs={1} style={{ textAlign: "Center" }}>
                  <div style={{ marginBottom: 40 }}>
                    <p style={{ color: "#8a9099" }}>Percentage</p>
                    <p>{item.percentage}</p>
                  </div>
                </Grid>
                <Grid item xs={3} style={{ textAlign: "Center" }}>
                  <div style={{ marginBottom: 40 }}>
                    <p style={{ color: "#8a9099" }}>Institute</p>
                    <p>{item.institutionName}</p>
                  </div>
                </Grid>
                <Grid item xs={3} style={{ textAlign: "Center" }}>
                  <div style={{ marginBottom: 40 }}>
                    <p style={{ color: "#8a9099" }}>Board University</p>
                    <p>{item.board}</p>
                  </div>
                </Grid>
                <Grid item xs={1} style={{ textAlign: "Center" }}>
                  <div style={{ marginBottom: 40 }}>
                    <p style={{ color: "#8a9099" }}>Regular</p>
                    <p>{item?.regular === true ? "True" : "False"}</p>
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
                    <p>{item.years}</p>
                  </div>
                </Grid>
                <Grid item xs={1} style={{ textAlign: "Center" }}>
                  <div style={{ marginBottom: 40 }}>
                    <p style={{ color: "#8a9099" }}>Month</p>
                    <p>{item.months}</p>
                  </div>
                </Grid>
                <Grid item xs={4} style={{ textAlign: "Center" }}>
                  <div style={{ marginBottom: 40 }}>
                    <p style={{ color: "#8a9099" }}>
                      Name and Address <br /> of the employer
                    </p>
                    <p>{item.employer}</p>
                  </div>
                </Grid>
                <Grid item xs={2} style={{ textAlign: "Center" }}>
                  <div style={{ marginBottom: 40 }}>
                    <p style={{ color: "#8a9099" }}>Designation</p>
                    <p>{item.designation}</p>
                  </div>
                </Grid>
                <Grid item xs={2} style={{ textAlign: "Center" }}>
                  <div style={{ marginBottom: 40 }}>
                    <p style={{ color: "#8a9099" }}>Industry type</p>
                    <p>{item.industryType}</p>
                  </div>
                </Grid>
                <Grid item xs={2} style={{ textAlign: "Center" }}>
                  <div style={{ marginBottom: 40 }}>
                    <p style={{ color: "#8a9099" }}>Full/Part Type</p>
                    <p>{item.workSchedule}</p>
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
                   
                    {previewData?.testTaken?.isApplicable === false ?previewData?.testTaken?.testName:"NA"}
                  </p>
                </div>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Overall Score</p>
                  <p>
                    {previewData?.testTaken?.overallScore?previewData?.testTaken?.overallScore:"-"}
                  </p>
                </div>
              </Grid>
              <Grid item xs={6} style={{ textAlign: "left" }}>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Intended field of study</p>
                  <p>{previewData?.testTaken?.fieldOfStudy}</p>
                </div>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Institute of interest</p>
                  <p>{previewData?.testTaken?.instituteOfInterest}</p>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <h3 style={{ textAlign: "left" }}>Visa detail and finance</h3>
            <hr style={{ marginBottom: 20 }}></hr>
            <Grid container spacing={2}>
              <Grid item xs={6} style={{ textAlign: "left" }}>
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
              <Grid item xs={6} style={{ textAlign: "left" }}>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Relatives abroad</p>
                  <p>{previewData?.relativesAbroad ? "Yes" : "No"}</p>
                </div>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Loan amount</p>
                  <p>
                    {previewData?.needEducationLoan
                      ? previewData?.loanAmountRs
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
                <p>{previewData?.declaration}</p>
              </Grid>
              <Grid item xs={6} style={{ textAlign: "left" }}>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ color: "#8a9099" }}>Mode of contact</p>
                  <div style={{ marginBottom: 40, display: "flex", gap: 5 }}>
                    <p>{previewData?.newspaper === true ? "Newspaper" : ""}</p>
                    <p>{previewData?.magazine === true ? "Magzine" : ""}</p>

                    <p>{previewData?.seminar === true ? "Seminar" : ""}</p>
                    <p>{previewData?.friends === true ? "Friends" : ""}</p>
                    <p>{previewData?.internet === true ? "Internet" : ""}</p>
                    <p>{previewData?.radio === true ? "Radio" : ""}</p>
                    <p>{previewData?.others}</p>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        
         
        {/* <Link href="/Submitapplication" underline="none"> */}
        {/* </Link> */}
      </div>
    </div>
  );
};
