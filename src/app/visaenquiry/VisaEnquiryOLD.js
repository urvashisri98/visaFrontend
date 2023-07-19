import React, { useState } from "react";
import ReactDOM from "react-dom";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import "./VisaEnquiry.css";
import Paper from "@mui/material/Paper";
import { Link, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
//  import { Formik, Form, Field } from 'formik';
//  import * as Yup from 'yup';
 
//  const SignupSchema = Yup.object().shape({
//    firstName: Yup.string()
//      .min(2, 'Too Short!')
//      .max(50, 'Too Long!')
//      .required('Required'),
//    lastName: Yup.string()
//      .min(2, 'Too Short!')
//      .max(50, 'Too Long!')
//      .required('Required'),
//    email: Yup.string().email('Invalid email').required('Required'),
//  });
const VisaEnquiry = () => {
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [image5, setImage5] = useState("");
  const [image6, setImage6] = useState("");
  const [salutation, setSalutation] = useState("Mr");
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [address, setAddress] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [aadharCard, setAadharCard] = useState("");
  const [passport, setPassport] = useState("");
  const [pancard, setPancard] = useState("");
  const [visatype, setVisatype] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState(false);

//   function validateMobileNumber(mobileNo) {
//     const mobileNumberRegex = /^\+91[0-9]{10}$/;
//     return mobileNumberRegex.test(mobileNo);
//   }
  const CHARACTER_LIMIT = 12;
  const steps = [
    "Personal Details ",
    "Education & Work Experience",
    "Visa Detail & Finance",
    "Submit Application",
  ];
  const frontAadharImage = (e) => {
    console.log(e.target.files);
    setImage1(e.target.files[0]);
  };
  const backAadharImage = (e) => {
    console.log(e.target.files);
    setImage2(e.target.files[0]);
  };
  const frontpancard = (e) => {
    console.log(e.target.files);
    setImage3(e.target.files[0]);
  };
  const backpancard = (e) => {
    console.log(e.target.files);
    setImage4(e.target.files[0]);
  };
  const frontpassport = (e) => {
    console.log(e.target.files);
    setImage5(e.target.files[0]);
  };
  const backpassport = (e) => {
    console.log(e.target.files);
    setImage6(e.target.files[0]);
  };

  const handleChange = (event) => {
    console.log("<======>", event.target.value);
    setSalutation(event.target.value);
  };
  const handleChange1 = (event) => {
    setVisatype(event.target.value);
  };
//   function mobileValidation(mobileNo)
// {

//   var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
//   if(mobileNo.target.value.match(phoneno))
//         {
//       return true;
//         }
//       else
//         {
//         alert("message");
//         return false;
//         }
// }
  const handleOnClick = (
    salutation,
    name,
    fatherName,
    address,
    mobileNo,
    dob,
    email,
    aadharCard,
    passport,
    pancard,
    visatype,
    image1,
    image2
  ) => {
    console.log(
      "All",
      salutation,
      name,
      fatherName,
      address,
      mobileNo,
      dob,
      email,
      aadharCard,
      passport,
      pancard,
      visatype,
      image1,
      image2
    );
    // Make function for Api
    // const newMobileNumber = mobileNo;
    // setMobileNo(newMobileNumber);
    // const isMobileNumberValid = validateMobileNumber(newMobileNumber);
    // setMobileNumberError(!isMobileNumberValid);
    fetch("https://example.com/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: salutation + name,
        fatherName: fatherName,
        address: address,
        mobileNo: mobileNo,
        dob: dob,
        email,
        email,
        aadharCard: aadharCard,
        passport: passport,
        pancard: pancard,
        visatype: visatype,
        aadharCardFront: image1,
        aadharCardBack: image2,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (<>
  </>
    // <div className="Visa_enquiry_Container">
    //   <div className="Stepper">
    //     <Box sx={{ width: "100%" }}>
    //       <Stepper activeStep={0} alternativeLabel>
    //         {steps.map((label) => (
    //           <Step key={label}>
    //             <StepLabel>{label}</StepLabel>
    //           </Step>
    //         ))}
    //       </Stepper>
    //     </Box>
    //   </div>
    //   <div className="Personal_Detail">
    //     <Box
    //       sx={{
    //         display: "flex",
    //         flexWrap: "wrap",
    //         "& > :not(style)": {
    //           m: 8,
    //           width: 1300,
    //           height: 620,
    //         },
    //       }}
    //     >
    //       <Paper elevation={3}>
    //         <div>
    //           <h4 className="personal">Personal Details</h4>
    //         </div>
    //         <div className="Feilds">
    //           <div className="First_Feild">
    //             <div className="Mr_Name">
    //               <div className="Mr">
    //                 <div className="Mr_heading">
    //                   <p className="Name_Mr">Mr/Mrs.</p>
    //                 </div>
    //                 <FormControl sx={{ minWidth: 40 }} size="small">
    //                   <Select
    //                     value={salutation}
    //                     onChange={(e) => handleChange(e)}
    //                     inputProps={{ "aria-label": "Without label" }}
    //                   >
    //                     <MenuItem value="Mr">Mr</MenuItem>
    //                     <MenuItem value="Mrs">Mrs</MenuItem>
    //                   </Select>
    //                 </FormControl>
    //               </div>
    //               <div className="Name">
    //                 <p className="Name_Mr">Name</p>
    //                 <TextField
    //                   id="outlined-size-small"
    //                   placeholder="Enter your name"
    //                   size="small"
    //                   value={name}
    //                   onChange={(e) => {
    //                     setName(e.target.value);
    //                   }}
    //                 />
    //               </div>
    //             </div>
    //             <div className="Name">
    //               <p className="Name_Mr">Father Name</p>
    //               <TextField
    //                 id="outlined-size-small"
    //                 placeholder="Enter your Father name"
    //                 size="small"
    //                 value={fatherName}
    //                 onChange={(e) => {
    //                   setFatherName(e.target.value);
    //                 }}
    //               />
    //             </div>
    //             <div className="Name">
    //               <p className="Name_Mr">Address</p>

    //               <TextField
    //                 id="outlined-size-small"
    //                 placeholder="Enter your address"
    //                 size="small"
    //                 value={address}
    //                 onChange={(e) => {
    //                   setAddress(e.target.value);
    //                 }}
    //               />
    //             </div>
    //             <div className="Name">
    //               <p className="Name_Mr">Mobile No.</p>

    //               <TextField
    //                 id="outlined-size-small"
    //                 placeholder="Enter your Mobile no."
    //                 size="small"
    //                 type="number"
    //                 // maxLength={10}
    //                 // error={mobileNumberError}
    //                 // helperText={
    //                 //   mobileNumberError ? "Invalid mobile number" : ""
    //                 // }
    //                 value={mobileNo}
    //                 onChange={(e) => {
    //                     // mobileValidation(e)
    //                   setMobileNo(e.target.value);
    //                 }}
    //                 onInput = {(e) =>{
    //                     e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
    //                 }}
    //               />
    //             </div>
    //             <div className="Name">
    //               <p className="Name_Mr"> Email</p>

    //               <TextField
    //                 id="outlined-size-small"
    //                 placeholder="Enter your email"
    //                 size="small"
    //                 value={email}
    //                 onChange={(e) => {
    //                   setEmail(e.target.value);
    //                 }}
    //               /> 
    //               {/* {errors.email && touched.email ? <div>{errors.email}</div> : null}/ */}
    //             </div>
    //           </div>
    //           <div className="Second_Feild">
    //             <div className="Name">
    //               <p className="Name_Mr"> DOB</p>

    //               <TextField
    //                 id="outlined-size-small"
    //                 placeholder="Enter your dob"
    //                 size="small"
    //                 value={dob}
    //                 onChange={(e) => {
    //                   setDob(e.target.value);
    //                 }}
    //               />
    //             </div>
    //             <div className="Name">
    //               <p className="Name_Mr"> Aadhar Card No. </p>

    //               <TextField
    //                 id="outlined-size-small"
    //                 required={true}
    //                 type="number"
    //                 placeholder="Enter your adhar card"
    //                 size="small"
    //                 value={aadharCard}
    //                 onChange={(e) => {
    //                     setAadharCard(e.target.value);
    //                 }}
    //                 // inputProps={{ max:  CHARACTER_LIMIT }}
    //                 onInput = {(e) =>{
    //                     e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,12)
    //                 }}
    //               />
    //             </div>
    //             <div className="Name">
    //               <p className="Name_Mr"> Passport No.</p>

    //               <TextField
    //                 id="outlined-size-small"
    //                 placeholder="Enter your passport no."
    //                 size="small"
    //                 value={passport}
    //                 onChange={(e) => {
    //                   setPassport(e.target.value);
    //                 }}
                  
    //               />
    //             </div>
    //             <div className="Name">
    //               <p className="Name_Mr"> Pan Card No.</p>

    //               <TextField
    //                 id="outlined-size-small"
    //                 placeholder="Enter your pan card no."
    //                 size="small"
    //                 value={pancard}
    //                 onChange={(e) => {
    //                   setPancard(e.target.value);
    //                 }}
                    
    //               />
    //             </div>
    //             <div className="Visa_type">
    //               <p className="Visa_type_name">Visa Type</p>
    //               <FormControl
    //                 sx={{ minWidth: 325, textAlign: "left" }}
    //                 size="small"
    //               >
    //                 <Select
    //                   value={visatype}
    //                   onChange={handleChange1}
    //                   displayEmpty
    //                   //   inputProps={{ 'aria-label': 'Without label' }}
    //                 >
    //                   <MenuItem value="">
    //                     <em>Select Visa Type</em>
    //                   </MenuItem>
    //                   <MenuItem value="VISA">Visa</MenuItem>
    //                   <MenuItem value="MasterCard">Master Card</MenuItem>
    //                   <MenuItem value="Rupay Card">Rupay Card</MenuItem>
    //                 </Select>
    //               </FormControl>
    //             </div>
    //           </div>
    //           <div className="Third_Feild">
    //             <div className="Name">
    //               <p className="Name_Mr"> Upload Aadhar Card</p>
    //               <div className="Upload_aadhar">
    //                 <div className="aadhar1">
    //                   <p className="Adhar_Front">Aadhar front image</p>
    //                   <input
    //                     type="file"
    //                     name="file"
    //                     onChange={frontAadharImage}
    //                   />
    //                 </div>
    //                 <div className="aadhar1">
    //                   <p className="Adhar_Front">Aadhar back image</p>
    //                   <input
    //                     type="file"
    //                     name="file"
    //                     onChange={backAadharImage}
    //                   />
    //                 </div>
    //               </div>
    //               <div className="Name">
    //                 <p className="Name_Mr"> Upload Pan Card</p>
    //                 <div className="Upload_aadhar">
    //                   <div className="aadhar1">
    //                     <p className="Adhar_Front">Pan front image</p>
    //                     <input
    //                       type="file"
    //                       name="file"
    //                       onChange={frontpancard}
    //                     />
    //                   </div>
    //                   <div className="aadhar1">
    //                     <p className="Adhar_Front">Pan back image</p>
    //                     <input type="file" name="file" onChange={backpancard} />
    //                   </div>
    //                 </div>
    //               </div>
    //               <div className="Name">
    //                 <p className="Name_Mr"> Upload Passport</p>
    //                 <div className="Upload_aadhar">
    //                   <div className="aadhar1">
    //                     <p className="Adhar_Front">passport front image</p>
    //                     <input
    //                       type="file"
    //                       name="file"
    //                       onChange={frontpassport}
    //                     />
    //                   </div>
    //                   <div className="aadhar1">
    //                     <p className="Adhar_Front">passport back image</p>
    //                     <input
    //                       type="file"
    //                       name="file"
    //                       onChange={backpassport}
    //                     />
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="Button_Visa_next">
    //           <Link href="/Education" underline="none">
    //             <Button
    //               variant="contained"
    //               onClick={() =>
    //                 handleOnClick(
    //                   salutation,
    //                   name,
    //                   fatherName,
    //                   address,
    //                   mobileNo,
    //                   dob,
    //                   email,
    //                   aadharCard,
    //                   passport,
    //                   pancard,
    //                   visatype,
    //                   image1,
    //                   image2
    //                 )
    //               }
    //             >
    //               Next
    //             </Button>
    //           </Link>
    //         </div>
    //       </Paper>
    //     </Box>
    //   </div>
    // </div>
  );
};
export default VisaEnquiry;
