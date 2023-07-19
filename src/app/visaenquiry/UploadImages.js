import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import "./UploadImages.css";
import Paper from "@mui/material/Paper";
import {
  Breadcrumbs,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  LinearProgress
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
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { saveUploadImages, saveVisaDetail } from "../redux/action/Action";
import { useNavigate } from "react-router-dom";
import {
  AddModeratorRounded,
  Image,
  SettingsSystemDaydream,
} from "@mui/icons-material";
import { upload } from "@testing-library/user-event/dist/upload";
import Webcam from "react-webcam";
import axios from "axios";
import AWS from "aws-sdk";
import useMediaQuery from "@mui/material/useMediaQuery";

const UploadImages = () => {
  const steps = [
    "Personal Details ",
    "Education & Work Experience",
    "Visa Detail & Finance",
    "Submit Application",
  ];
  const theme = useTheme();
  const [showAlert, setShowAlert] = React.useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const config = {
    accessKeyId: "AKIAREBXG45DTSWA434H",
    secretAccessKey: "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",
    region: "us-east-1s",
    bucketName: "microdemand-dev",
    albumName: "photos",
  };

  const s3 = new AWS.S3(config);

  async function uploadImageToS3(imageData) {
    console.log("uploadImageToS3", imageData);
    const params = {
      Bucket: config.bucketName,
      Key: imageData.name,
      Body: imageData,
      ContentType: imageData.type,
      ACL: "public-read",
    };
    return await s3.upload(params).promise();
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let UploadImages = useSelector((state) => state.saveUploadedImages);
  let imageData = UploadImages.uploadImages;
  console.log("data from redux", imageData);
  const [imagebyCamera, setImagebyCamera] = useState("");
  const [aadharImage, setAadharImage] = useState({
    frontURL: imageData.aadharFront || "",
    backURL: imageData.aadharBack || "",
    frontFile: null,
    backFile: null,
  });
  const [pancardImage, setPancardImage] = useState({
    frontURL: imageData.panFront || "",
    backURL: imageData.panBack || "",
    frontFile: null,
    backFile: null,
  });
  const [passportImage, setPassportImage] = useState({
    frontURL: imageData.passportFront || "",
    backURL: imageData.passportBack || "",
    frontFile: null,
    backFile: null,
  });
  const [dialogProps, setDailogProps] = useState({});
  const [user, setUser] = useState({});
  const [isEducationLoan, setIsEducationLoan] = useState(0);
  const [isRefusedVisa, setIsRefusedVisa] = useState(0);
  const [isRelativeAboard, setIsRelativeAboard] = useState(0);
  const [cameraon, setCameraon] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [fileName, setFileName] = useState('');

  // const token = localStorage.getItem('token');
  const token = JSON.parse(localStorage.getItem("token"));
  const backFunction = (e) => {
    navigate("/VisaEnquiry");
  };
  const [addmore, setAddmore] = useState([
    {
      imageName: "",
      imageUrl: "",
      file: null,
    },
  ]);
  const handleServiceAdd = () => {
    console.log("size", addmore.length);
    console.log("addmore[0].imageUrl", addmore[0].imageUrl);
    let sizeofArray = addmore.length;
    if (
      addmore[sizeofArray - 1].imageName === "" ||
      addmore[sizeofArray - 1].imageUrl === ""
    ) {
      alert("please provide file name and file");
    } else {
      setAddmore([
        ...addmore,
        {
          imageName: "",
          imageUrl: "",
        },
      ]);
    }
  };
  const handleServiceRemove = (index) => {
    const list = [...addmore];
    list.splice(index, 1);
    console.log("index", index);
    setAddmore(list);
  };
  const onUploadadharfrontimage = (event) => {
    setAadharImage((prevState) => ({
      ...prevState,
      frontURL: URL.createObjectURL(event.target.files[0]),
      frontFile: event.target.files[0],
    }));
    // setImage1(event.target.files[0])
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const handleOnSubmit = (e) => {
    if (
      addmore[0].imageName === (undefined || "") ||
      addmore[0].imageUrl === (undefined || "") ||
      imagebyCamera === ""
    ) {
      alert("please upload Images");
    } else {
      let dataTosend = { addmore, imagebyCamera };
      console.log("dataTosend", dataTosend);
      dispatch(saveUploadImages(dataTosend));
      navigate("/Education");
    }
  };
  const webcamRef = React.useRef(null);
  const onClickPhoto = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    const blob = dataURItoBlob(imageSrc);
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T'); 
    const file = new File([blob], `Imagebycamera_${formattedDate}.jpeg`, { type: "image/jpeg" });
   
    uploadImageToS3(file)
      .then((response) => {
        console.log("uploadImageToS3 Success", response);
        alert("Profile Image added Successfully");

        setImagebyCamera(response.Location);
      })

      .catch((error) => console.log("uploadImageToS3 error", error));
    setCameraon(false);
  }, [webcamRef]);

  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: "image/jpeg" });
  }

  const handleCamera = () => {
    setCameraon(true);
  };
  const handleInputChange = (event, index) => {
    const file = event.target.files[0];
    setShowAlert(true);
    setDailogProps({
      index: index,
      file: event.target.files[0],
    });
  };

  const uploadonClick = async () => {
    const file = dialogProps?.file;
    const index = dialogProps?.index;

    await uploadImageToS3(file)
      .then((response) => {
        console.log("uploadImageToS3 Success", response);
        const updatedItems = [...addmore];
        updatedItems[index] = {
          ...updatedItems[index],
          imageUrl: response?.Location,
          file: file,
        };
        setAddmore(updatedItems);

        setShowAlert(false);
        console.log("setAddmore", addmore);
      })
      .catch((error) => console.log("uploadImageToS3 error", error));
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    if (imageData?.imagebyCamera) {
      setImagebyCamera(imageData.imagebyCamera);
    }
    if (imageData?.addmore) {
      setAddmore(imageData?.addmore);
    }
  }, []);

  const handleFileName = (e) => {
    setFileName(e.target.value);
}

  return (
    <>
      <Container maxWidth="mx" className={styles.containerFix}>
      <Dialog
                    fullScreen={fullScreen}
                    open={showAlert}
                    onClose={() => setShowAlert(false)}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {"Are you sure you want to upload image?"}
                    </DialogTitle>
                    <DialogContent>
                        {showProgress && (
                            <LinearProgress />
                        )}
                        <p>File Name:</p>
                        <TextField
                            type="text"
                            id="fname"
                            size="small"
                            name="imageName"
                            value={fileName}
                            onChange={(e) => handleFileName(e)}
                        />
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
                            onClick={(e) => uploadonClick(e)}>
                            Upload
                        </Button>
                    </DialogActions>
                </Dialog>
        <Dialog
          fullScreen={fullScreen}
          open={showAlert}
          onClose={() => setShowAlert(false)}
          aria-labelledby="responsive-dialog-title"
          // file={file}
          // index={index}
        >
          <DialogTitle id="responsive-dialog-title">
            {"Are you sure you want to upload image?"}
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
              onClick={(e) => uploadonClick(e)}
            >
              Upload
            </Button>
          </DialogActions>
        </Dialog>
        <Container maxWidth="mx" className={styles.containerFix}>
          <Grid item>
            <Grid item sx={{ flexWrap: "wrap" }}>
              <Box className={styles.breadcrumFix}>
                <Breadcrumbs maxItems={2} aria-label="breadcrumb">
                  <Link underline="hover" color="inherit" href="/">
                    Home
                  </Link>

                  <Typography color="text.primary">Documents</Typography>
                </Breadcrumbs>
              </Box>
              <Box sx={{ width: "100%" }}>
                <Steppers activeSteps={1}></Steppers>
              </Box>
            </Grid>
            <Grid item sx={{ pb: 5 }}>
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
                  <Grid item sx={{ pl: 10, pr: 10, flexWrap: "wrap" }}>
                    <Grid
                      container
                      spacing={0}
                      sx={{ justifyContent: "center", margin: "56px 0px" }}
                    >
                      <Grid item sx={{ display: "flex"}}>
                        <Grid>
                          {cameraon ? (
                            <Grid sx={{ mt: 4, display: "grid" }}>
                              <Webcam
                                audio={false}
                                height={220}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                width={220}
                                borderRadius={14}
                              />
                              <button onClick={onClickPhoto}>
                                Capture photo
                              </button>
                            </Grid>
                          ) : (
                            <Grid
                              sx={{
                                backgroundColor: "#DCDCDC",
                                width: 200,
                                height: 200,
                                borderRadius: 28,
                                cursor: "pointer",
                              }}
                            >
                              {imagebyCamera === "" ? (
                                <PersonOutlineIcon
                                  sx={{ fontSize: 200, p: 1 }}
                                />
                              ) : (
                                <Grid
                                  sx={{
                                    width: "200px",
                                    height: "200px",
                                    borderRadius: "100px",
                                    backgroundColor: "gray",
                                  }}
                                >
                                  <img
                                    src={imagebyCamera}
                                    className="camera_css"
                                  />
                                </Grid>
                              )}
                              <button
                                type="camera"
                                onClick={() => handleCamera()}
                                className="Button_function"
                              >
                                Camera On
                              </button>
                            </Grid>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      spacing={0}
                      sx={{ justifyContent: "center" }}
                    >
                      <Grid container>
                        {" "}
                        {addmore?.map((singleService, index) => (
                          <Grid
                            item
                            xs={12}
                            sx={{
                              display: "flex",
                              mt: 3,
                              gap: "15px",
                              justifyContent: "space-around",
                            }}
                          >
                            <Grid item xs={4}>
                              <p className="widthContent"> File Name</p>
                              <TextField
                                type="text"
                                id="fname"
                                size="small"
                                name="imageName"
                                fullWidth
                                sx={{
                                  mt: 1,
                                }}
                                value={addmore[index]?.imageName}
                                onChange={(e) => {
                                  const updatedItems = [...addmore];
                                  updatedItems[index] = {
                                    ...updatedItems[index],
                                    imageName: e.target.value,
                                  };
                                  setAddmore(updatedItems);
                                }}
                              />
                            </Grid>
                            <Grid
                              items
                              xs={5}
                              sx={{ display: "flex", flexDirection: "column" }}
                            >
                              <p className="widthContent">Upload file</p>
                              {addmore[index]?.imageUrl ? (
                                <Grid xs={8} className="widthContent" >
                                  <img
                                    style={{ height: "80px", width: "120px" }}
                                    src={addmore[index]?.imageUrl}
                                    alt="image"
                                  />
                                </Grid>
                              ) : (
                                <Grid className="widthContent">
                                  <input
                                    type="file"
                                    id="fname"
                                    name="imageUrl"
                                    value=""
                                    className="Input_box"
                                    onChange={(e) =>
                                      handleInputChange(e, index)
                                    }
                                  />
                                </Grid>
                              )}
                            </Grid>

                            {addmore.length !== 1 && (
                              <Grid sx={{pt:1}}>
                              <Button
                                variant="text"
                                size="small"
                                onClick={() => handleServiceRemove(index)}
                                style={{ height: "40px",color:"red" }}
                              >
                                Delete
                              </Button>
                              </Grid>
                            )}
                          </Grid>
                        ))}
                      </Grid>
                      <Grid container sx={{ justifyContent: "right" }}>
                        {addmore.length <= 9 && (
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={handleServiceAdd}
                            style={{ height: "40px" }}
                          >
                            Add More
                          </Button>
                        )}
                      </Grid>
                    </Grid>

                    <Grid
                      item
                      xs={1}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 1,
                        p: 2,
                      }}
                    >
                      <Grid item xs={1}>
                        <Button variant="outlined" onClick={backFunction}>
                          Back
                        </Button>
                      </Grid>
                      <Grid item xs={1}>
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
      </Container>
    </>
  );
};

export default UploadImages;
