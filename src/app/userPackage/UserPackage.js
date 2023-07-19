import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
// import { makeStyles } from '@material-ui/core/styles';
// import "./UploadImages.css";
import Paper from "@mui/material/Paper";
import {
  Breadcrumbs,
  Checkbox,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import Button from "@mui/material/Button";

import styles from "../visaenquiry/VisaEnquiry.module.css";
import { VISA_URL } from "../../constant/constants";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
// import {Circles} from 'react-loader-spinner';
const UserPackage = () => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [user, setUser] = useState({
    type: "",
    packageAmount: 0,
    fees: 0,
    funds: 0,
    embassy: 0,
    institute: 0,
    commission: 0,
    commissionRecieved:false
  });
  const [error, setError] = useState({
    type: "",
    packageAmount: "",
    fees: "",
    funds: "",
    embassy: "",
    institute: "",
    commission: "",
    commissionRecieved:false
  });
  const [studentID, setStudentID] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  // const [loading, setLoading] = useState(true);
  const token = JSON.parse(localStorage.getItem("token"));
  // const role = JSON.parse(localStorage.getItem("role"));
  const amountregex = /^(?:(?!0+$)\d+)?$/;
  const handleTestpackages = (event) => {
    const { name, value } = event.target;
    if (name === "packageAmount") {
      if (amountregex.test(value)) {
        setUser((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        setError((err) => ({
          ...err,
          packageAmount: "",
        }));
      } else {
        setError((err) => ({
          ...err,
          packageAmount: "Error",
        }));
      }
    }
  };
  // if (name == "Phone") {
  //   if (phoneRegex.test(value)) {
  //     setUser((prevState) => ({
  //       ...prevState,
  //       [name]: value,
  //     }));
  //     setError((err) => ({
  //       ...err,
  //       Phone: "",
  //     }));
  //   } else {
  //     setError((err) => ({
  //       ...err,
  //       Phone: "Error",
  //     }));
  //   }
  // }
  const handleTestnonpackages = (event) => {
    const { name, value } = event.target;
    if (name === "fees") {
      if (amountregex.test(value)) {
        setUser((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        setError((err) => ({
          ...err,
          fees: "",
        }));
      } else {
        setError((err) => ({
          ...err,
          fees: "Error",
        }));
      }
    }
    if (name === "funds") {
      if (amountregex.test(value)) {
        setUser((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        setError((err) => ({
          ...err,
          funds: "",
        }));
      } else {
        setError((err) => ({
          ...err,
          funds: "Error",
        }));
      }
    }
    if (name === "embassy") {
      if (amountregex.test(value)) {
        setUser((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        setError((err) => ({
          ...err,
          embassy: "",
        }));
      } else {
        setError((err) => ({
          ...err,
          embassy: "Error",
        }));
      }
    }
    if (name === "institute") {
      if (amountregex.test(value)) {
        setUser((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        setError((err) => ({
          ...err,
          institute: "",
        }));
      } else {
        setError((err) => ({
          ...err,
          institute: "Error",
        }));
      }
    }
    if (name === "commission") {
      if (amountregex.test(value)) {
        setUser((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        setError((err) => ({
          ...err,
          commission: "",
        }));
      } else {
        setError((err) => ({
          ...err,
          commission: "Error",
        }));
      }
    }
  };
  const handleOnCheckforcommissionReceived = (event) => {
    const { name, checked } = event.target;
    setUser((prevState) => ({
      ...prevState,
      type: name,
    }));

  }

  const handleOnCheckforpackage = (event) => {
    const { name, checked } = event.target;
    if (name === "package") {
      setUser((prevState) => ({
        ...prevState,
        type: name,
      }));
      // setIsPackage("package");
    }
    if (name === "nonPackage") {
      setUser((prevState) => ({
        ...prevState,
        type: name,
      }));
      // setIsPackage("nonPackage");
    }
    if (name === "commission") {
      setUser((prevState) => ({
        ...prevState,
        type: name,
      }));
      // setIsPackage("package");
    }
    console.log("Userdata", user);
  };
  const onSubmitPackages = (event) => {
    const { name, value } = event.target;

    setUser((prevState) => ({
      ...prevState,
      [name]: event.target.checked,
    }));
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    console.log("User ==> ", user);
    axios
      .post(`${VISA_URL}/users/addPackage?studentId=${studentID}`, user, config)
      .then((response) => {
        if (response?.data?.response == "success") {
          // setLoading(false);
          alert(response?.data?.message);
          navigate("/EnquiriesList");
        } else {
          alert("data is invalid");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(user);
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    if (location?.state?.studentId) {
      setStudentID(location?.state?.studentId);
      if (location?.state?.packageData) {
        let packageData = location?.state?.packageData;
        let packageObject = {
          type: packageData?.type,
          packageAmount: packageData?.packageAmount,
          fees: packageData?.fees,
          funds: packageData?.funds,
          embassy: packageData?.embassy,
          institute: packageData?.institute,
          commission: packageData?.commission,
        };
        console.log("packageObject", packageObject.type);
        setUser(packageObject);
        // setIsPackage(location?.state?.packageData?.type);
      }
      //   console.log("Editable=====>",editable,location?.state?.editable)
    }
  }, []);
  console.log("Student id from use effect", user?.type);
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
        <Grid item sx={{ flexWrap: "wrap" }}>
          <Box className={styles.breadcrumFix}>
            <Breadcrumbs maxItems={2} aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Home
              </Link>

              <Typography color="text.primary">Packages</Typography>
            </Breadcrumbs>
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
              <Grid item sx={{ pl: 8, pr: 8, flexWrap: "wrap", mt: 5 }}>
                <Grid item sx={{ width: "fit-Content" }}>
                  <h5>Packages</h5>
                </Grid>
                <Grid
                  sx={{
                    display: "unset",
                    pl: 1,
                    pr: 1,
                    gap: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 3,
                  }}
                >
                  <Grid sx={{ width: "-webkit-fill-available" }}>
                    <Grid
                      item
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                      }}
                    >
                      <Grid item
                        sx={{
                          display: "flex",
                          width: "50%",
                          alignItems: "center"

                        }} >
                        <Checkbox
                          {...label}
                          name="nonPackage"
                          onChange={(event) => handleOnCheckforpackage(event)}
                          checked={user?.type === "nonPackage" ? true : false}
                        />
                        <p style={{ marginLeft: 2 }}>Non Package</p>
                      </Grid>
                      <Grid item
                        sx={{
                          display: "flex",
                          width: "50%",
                          alignItems: "center"

                        }} >
                        <Checkbox
                          {...label}
                          name="package"
                          onChange={(event) => handleOnCheckforpackage(event)}
                          checked={user?.type === "package" ? true : false}
                        />
                        <p style={{ marginLeft: 5 }}>Package</p>
                      </Grid>
                    </Grid>

                  </Grid>
                  <Grid item sx={{
                    width: "-webkit-fill-available",
                    display: "flex",
                    justifyContent: "flex-end",
                    flexDirection: "row"
                  }}>
                    <Grid
                      sx={{
                        display: "flex",
                        // mt: 7.5,
                        width: "50%",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <div
                        className="Reading_Writing_Feild"
                        style={{
                          display: user?.type === "nonPackage" ? "flex" : "none",
                        }}
                      >
                        <Grid sx={{ flex: 1 }}>
                          <TextField
                            error={error.packageAmount}
                            id="outlined-size-small"
                            size="small"
                            fullWidth
                            label="Amount"
                            name="packageAmount"
                            value={user?.packageAmount}
                            onChange={handleTestpackages}
                            helperText={
                              error.packageAmount ? "Invalid Amount" : ""
                            }
                          />
                        </Grid>
                      </div>

                    </Grid>
                    <Grid item sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      width: "50%"
                    }}
                    >
                      {user?.type === "package" && (
                        <div
                          className="Reading_Writing_Feild"
                          style={{
                            display: "flex",
                          }}
                        >
                          <Grid sx={{ flex: 1 }}>
                            <TextField
                              error={error.fees}
                              id="outlined-size-small"
                              size="small"
                              fullWidth
                              label="Fees"
                              name="fees"
                              // type="number"
                              value={user?.fees}
                              onChange={handleTestnonpackages}
                              helperText={error.fees ? "Invalid fees" : ""}
                            />
                          </Grid>
                          <Grid sx={{ flex: 1 }}>
                            <TextField
                              error={error.funds}
                              id="outlined-size-small"
                              size="small"
                              fullWidth
                              label="Funds"

                              name="funds"
                              onChange={handleTestnonpackages}
                              value={user?.funds}
                              helperText={error.funds ? "Invalid funds" : ""}
                            />
                          </Grid>
                          <Grid sx={{ flex: 1 }}>
                            <TextField
                              error={error.embassy}
                              id="outlined-size-small"
                              size="small"
                              fullWidth
                              label="Embassy"
                              name="embassy"
                              value={user?.embassy}
                              onChange={handleTestnonpackages}
                              helperText={error.embassy ? "Invalid embassy" : ""}
                            />
                          </Grid>
                          <Grid sx={{ flex: 1 }}>
                            <TextField
                              error={error.institute}
                              id="outlined-size-small"
                              size="small"
                              fullWidth
                              label="Institute"
                              name="institute"
                              onChange={handleTestnonpackages}
                              value={user?.institute}
                              helperText={error.institute ? "Invalid institute" : ""}
                            />
                          </Grid>

                         
                        </div>
                      )}
                    </Grid>

                  </Grid>
                </Grid>
                <Grid
                  sx={{
                    display: "unset",
                    pl: 1,
                    pr: 1,
                    gap: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 3,
                  }}
                >
                  <Grid sx={{ width: "-webkit-fill-available" }}>
                    <Grid
                      item
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                      }}
                    >
                      <Grid item
                        sx={{
                          display: "flex",
                          width: "50%",
                          alignItems: "center"

                        }} >
                        <Checkbox

                        name="CommisionReceived"
                         onChange={(event) => handleOnCheckforpackage(event)}
                        checked={user?.type === "commissionRecieved" ? true : false}
                        />
                        <p style={{ marginLeft: 2 }}>Commission Received</p>
                      </Grid>
                      <Grid item
                        sx={{
                          display: "flex",
                          width: "50%",
                          alignItems: "center"

                        }} >
                        <TextField
                          id="outlined-size-small"
                          size="small"
                          fullWidth
                          label="commision"
                          name="packageAmount"
                         value={user?.commission}
                        //</Grid> onChange={handleTestpackages}
                        >

                        </TextField>
                      </Grid>

                    </Grid>
                    <Grid>

                    </Grid>

                  </Grid>
                  <Grid item sx={{
                    width: "-webkit-fill-available",
                    display: "flex",
                    justifyContent: "flex-end",
                    flexDirection: "row"
                  }}>
                    <Grid
                      sx={{
                        display: "flex",
                        // mt: 7.5,
                        width: "50%",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <div
                        className="Reading_Writing_Feild"
                        style={{
                          display: user?.type === "nonPackage" ? "flex" : "none",
                        }}
                      >

                      </div>

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
                  }}
                >
                  <Grid item xs={1}>
                    <Button variant="outlined" onClick={onSubmitPackages}>
                      Submit
                    </Button>
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

export default UserPackage;
