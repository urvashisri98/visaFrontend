import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import "../edit/documents.css";
import Paper from "@mui/material/Paper";
import {
  Breadcrumbs,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  LinearProgress,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Checkbox from "@mui/material/Checkbox";
import styles from "../visaenquiry/VisaEnquiry.module.css";
import Steppers from "../visaenquiry/Stepper";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import {
  saveUploadImages,
  saveVisaDetail,
  saveUserInfo,
} from "../redux/action/Action";
import { useNavigate } from "react-router-dom";
import { upload } from "@testing-library/user-event/dist/upload";
import Webcam from "react-webcam";
import axios from "axios";
import AWS from "aws-sdk";
import useMediaQuery from "@mui/material/useMediaQuery";

const EditDocument = () => {
  const theme = useTheme();
  const [showAlert, setShowAlert] = React.useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dialogProps, setDailogProps] = useState({});
  const [cameraon, setCameraon] = useState(false);
  const [fileName, setFileName] = useState("");
  const [showProgress, setShowProgress] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));
  const [imagebyCamera, setImagebyCamera] = useState("");
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [addmore, setAddmore] = useState([]);
  const backFunction = (e) => {
    navigate("/personalEdit");
  };
  let temp = useSelector((state) => state.saveUserInfo);
  var userInfo = temp.userInfo;
  var upload = userInfo; //useSelector((state) => state.saveUploadedImages);
  let imageData = upload.images;
  const webcamRef = React.useRef(null);
  //setAddmore(imageData);
  const steps = [
    "Personal Details ",
    "Education & Work Experience",
    "Visa Detail & Finance",
    "Submit Application",
  ];

  const config = {
    accessKeyId: "AKIAREBXG45DTSWA434H",
    secretAccessKey: "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",
    region: "us-east-1s",
    bucketName: "microdemand-dev",
    albumName: "photos",
  };

  const s3 = new AWS.S3(config);
  async function uploadImageToS3(imageData) {
    const params = {
      Bucket: config.bucketName,
      Key: imageData.name,
      Body: imageData,
      ContentType: imageData.type,
      ACL: "public-read",
    };
    return await s3.upload(params).promise();
  }

  const handleServiceAdd = () => {
    setAddmore([
      ...addmore,
      {
        imageName: "",
        imageUrl: "",
      },
    ]);
  };

  const handleServiceRemove = (index) => {
    const list = [...addmore];
    list.splice(index, 1);
    setAddmore(list);
  };

  const handleOnSubmit = (e) => {
    // if (
    //     addmore[0].imageName === (undefined || "") ||
    //     addmore[0].imageUrl === (undefined || "") ||
    //     imagebyCamera === ""
    // ) {
    //     alert("please upload Images");
    // } else {
    let dataTosend = { addmore, imagebyCamera };
    console.log("dataTosend", dataTosend);
    console.log(userInfo);
    userInfo.images = imageData;
    dispatch(saveUploadImages(dataTosend));
    dispatch(saveUserInfo);
    navigate("/educationEdit");
    //}
  };

  function update(target, src) {
    const res = {};
    Object.keys(target).forEach((k) => (res[k] = src[k] ?? target[k]));
    return res;
  }

  const onClickPhoto = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    const blob = dataURItoBlob(imageSrc);
    const file = new File([blob], "Imagebycamera.jpeg", { type: "image/jpeg" });
    uploadImageToS3(file)
      .then((response) => {
        alert("Profile Image added Successfully");
        setImagebyCamera(response.Location);
        let d = {
          imageUrl: response?.Location,
          imageName: "ProfilePic",
        };
        const objIndex = imageData.findIndex(
          (obj) => obj.imageName === "ProfilePic"
        );
        console.log(objIndex);
        if (objIndex === -1) {
          imageData.push(d);
        } else {
          imageData[objIndex] = d;
        }
        console.log(d);
        //setAddmore(prevState => [...prevState, d]);
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
    setDailogProps({
      index: index,
      file: event.target.files[0],
    });
    setShowAlert(true);
  };

  const uploadonClick = async () => {
    if (fileName) {
      setShowProgress(true);
      const file = dialogProps?.file;
      const index = dialogProps?.index;
      await uploadImageToS3(file)
        .then((response) => {
          console.log("uploadImageToS3 Success", response);
          let d = {
            imageUrl: response?.Location,
            imageName: fileName,
          };
          console.log(d);
          imageData.push(d);

          //setAddmore(prevState => ({ ...prevState, d }));
          //setAddmore(prevState => [...prevState, d]);
          setFileName("");
          setShowProgress(false);
          setShowAlert(false);
          console.log(addmore);
        })
        .catch((error) => console.log("uploadImageToS3 error", error));
    } else {
      alert("Please choose file name");
    }
  };

  const handleFileName = (e) => {
    setFileName(e.target.value);
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    if (imageData?.imagebyCamera) {
      setImagebyCamera(imageData.imagebyCamera);
    }
    if (imageData?.addmore) {
      // setAddmore(imageData?.addmore);
    }
  }, []);

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
            {showProgress && <LinearProgress />}
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
                  <Grid item sx={{ pl: 10, pr: 10, flexWrap: "wrap", mt: 5 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Grid
                          item
                          xs={12}
                          sx={{
                            display: "flex",
                            mt: 3,
                            gap: "15px",
                          }}
                        >
                          <input
                            type="file"
                            id="fname"
                            name="imageUrl"
                            value=""
                            className="Input_box"
                            onChange={(e) => handleInputChange(e)}
                          />
                        </Grid>
                        <Grid sx={{ mt: 4 }}>
                          {cameraon ? (
                            <Grid
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "flex-start",
                              }}
                            >
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
                                width: 100,
                                height: 100,
                                borderRadius: 14,
                                cursor: "pointer",
                              }}
                            >
                              {imagebyCamera === "" ? (
                                <PersonOutlineIcon
                                  sx={{ fontSize: 80, p: 1 }}
                                />
                              ) : (
                                <Grid
                                  sx={{
                                    width: "100px",
                                    height: "100px",
                                    borderRadius: "50px",
                                    backgroundColor: "gray",
                                  }}
                                >
                                  <img
                                    src={imagebyCamera}
                                    className="camera_css1"
                                    
                                  />
                                </Grid>
                              )}

                              <button
                                type="camera"
                                onClick={() => handleCamera()}
                                className="Button_function"
                                style={{ marginTop: 40 }}
                              >
                                Camera On
                              </button>
                            </Grid>
                          )}
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container>
                          {imageData?.map((item) => (
                            <Grid item xs={6}>
                              <img
                                style={{ height: "100px", width: "150px" }}
                                src={item?.imageUrl}
                                alt="image"
                              />
                              <p>{item?.imageName}</p>
                            </Grid>
                          ))}
                        </Grid>
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
                        marginTop: 8,
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

export default EditDocument;
