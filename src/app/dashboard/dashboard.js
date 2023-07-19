import React, { useState, useEffect } from "react";
import AddIcCallOutlinedIcon from "@mui/icons-material/AddIcCallOutlined";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Pie, Bar, Line } from "react-chartjs-2";
import { Container, height } from "@mui/system";
import {
  Grid,
  Breadcrumbs,
  Box,
  Link,
  Typography,
  Button,
  TableContainer,
} from "@mui/material";
import styles from "./dashboard.module.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PageviewIcon from "@mui/icons-material/Pageview";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { VISA_URL } from "../../constant/constants";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import moment from "moment";
import {Circles} from 'react-loader-spinner';
import axios from "axios";
import { ObjectSchema } from "yup";

Chart.register(CategoryScale);
const Dashboard = () => {
  const [statusData, setStatusData] = useState({});
  const [allStatusCounts, setAllStatusCounts] = useState([]);
  const [fromDateBarGraph, setFromDateBarGraph] = useState();
  const [toDateBarGraph, setToDateBarGraph] = useState();
  const [fromDateLineGraph, setFromDateLineGraph] = useState();
  const [toDateLineGraph, setToDateLineGraph] = useState();
  const [totalEnquiriesCount, setTotalEnquiriesCount] = useState(0);
  const [ieltsTakenCount, setIeltsTakenCount] = useState(0);
  const [pteTakenCount, setPteTakenCount] = useState(0);
  const [channelName, setChannelName] = useState([]);
  const [loading, setLoading] = useState(true);
  const [barGraphData, setBarGraphData] = useState({
    labels: [].map((data) => data.month),
    datasets: [
      {
        label: "Ticket Success ",
        data: [].map((data) => data.success),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#0d6efd",
          "#dc3545",
          "#fd7e14",
          "#2eb85c",
        ],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  });
  const [lineGraphData, setLineGraphData] = useState({
    labels: [].map((data) => data.month),
    datasets: [
      {
        label: "Ticket Success ",
        data: [].map((data) => data.success),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#0d6efd",
          "#dc3545",
          "#fd7e14",
          "#2eb85c",
        ],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  });

  const token = JSON.parse(localStorage.getItem("token"));
  console.log(token);
  const todos = useSelector((store) => store.saveLogin.userData);
  console.log(todos);

  const navigate = useNavigate();

  useEffect(() => {
    getCount();
    getStatusCount();
    getLanguageTestsCount();
    getChannelName();
  }, []);

  useEffect(() => {
    getGraphData("bar-graph");
    getGraphData("line-graph");
    // getGraphDataTotal("bar-graph");
    // getGraphDataTotal("line-graph");
  }, [toDateBarGraph, toDateLineGraph, fromDateBarGraph, fromDateLineGraph]);
  
  const convertDataToDisplayForm = (inputData, typeOfGraph) => {
    var data = {
      labels: inputData.map((data) => data.month),
      datasets: [
        {
          label: "Ticket Success ",
          data: inputData.map((data) => data.success),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#0d6efd",
            "#dc3545",
            "#fd7e14",
            "#2eb85c",
          ],
          borderColor: "black",
          borderWidth: 1,
        },
      ],
    };

    if (typeOfGraph == "bar-graph") {
      setLineGraphData(data);
    } else {
      
      setBarGraphData(data);
    }
  };

  const colors = ["#0d6efd", "#dc3545", "#fd7e14", "#2eb85c"];

  const getGraphData = async (typeOfGraph) => {
    var startDate, endDate;

    // if (typeOfGraph == "bar-graph") {
    //   startDate = fromDateBarGraph;
    //   endDate = toDateBarGraph;
    // } else {
    //   startDate = fromDateLineGraph;
    //   endDate = toDateLineGraph;
    // }
    if(typeOfGraph == "bar-graph") {
      startDate = fromDateLineGraph;
      endDate = toDateLineGraph;
    } else {
      startDate = fromDateBarGraph;
      endDate = toDateBarGraph;
    }
    await axios
      .post(
        `${VISA_URL}/users/graphData`,
        {
          startDate: startDate,
          endDate: endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setLoading(false);
        console.log("graph data",response);
        var key = 1;
        var chartData = [];
        (typeOfGraph == 'bar-graph' ? response?.data?.totalResult : response?.data?.successResult).map((item) => {
          console.log('Working');
          var dataItem = {};
          dataItem.success = item?.count;
          const monthString = item?.month; // Month string to convert to month name
          const monthName = moment(monthString, "MM-YYYY").format("MMMM"); // Convert to month name
          const year = moment(monthString, "MM-YYYY").format("YYYY"); // Convert to month name
          console.log('monthName', monthName, year);
          dataItem.month = monthName + ", " + year;
          dataItem.id = key;
          key++;
          chartData.push(dataItem);
        });

        convertDataToDisplayForm(chartData, typeOfGraph);
      });
  };
  // const getGraphDataTotal = async (typeOfGraph) => {
  //   var startDate, endDate;

  //   if (typeOfGraph == "bar-graph") {
  //     startDate = fromDateBarGraph;
  //     endDate = toDateBarGraph;
  //   } else {
  //     startDate = fromDateLineGraph;
  //     endDate = toDateLineGraph;
  //   }

  //   await axios
  //     .post(
  //       `${VISA_URL}/users/graphData`,
  //       {
  //         startDate: startDate,
  //         endDate: endDate,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       var key = 1;
  //       var chartData = [];
  //       console.log("responsegraph data",response)
  //       response?.data?.totalResult.map((item) => {
  //         var dataItem = {};
  //         dataItem.success = item?.count;
  //         const monthString = item?.month; // Month string to convert to month name
  //         const monthName = moment(monthString, "YYYY-MM").format("MMMM"); // Convert to month name
  //         const year = moment(monthString, "YYYY-MM").format("YYYY"); // Convert to month name
  //         dataItem.month = monthName + ", " + year;
  //         dataItem.id = key;
  //         key++;
  //         chartData.push(dataItem);
  //       });

  //       convertDataToDisplayForm(chartData, typeOfGraph);
  //     });
  // };

  const apiData = [
    {
      id: 1,
      title: "Total Requests",
      value: totalEnquiriesCount,
    },
    {
      id: 2,
      title: "Incomplete Requests",
      // value: statusData?.incompleteDocCount ? statusData?.incompleteDocCount : 0,
      value: statusData?.pendingCount,
    },
    {
      id: 3,
      title: "IELTS",
      value: ieltsTakenCount,
    },
    {
      id: 3,
      title: "PTE",
      value: pteTakenCount,
    },
  ];

  const cardStyle = {
    background: "#0d6efd",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    height: 130,
  };

  const titleStyle = { fontSize: 15, color: "#ffffff" };
  const tebLETitleStyle = { fontSize: 15, color: "#000000" };

  const getCount = async () => {
    const result = await axios.get(`${VISA_URL}/users/getDashboardStatus`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Dashboard status", result);
    if (result?.data) {
      setLoading(false);
      setStatusData(result?.data);

      var totalEnquiriesCount =
        parseInt(result?.data?.applicationOnAssessmentCount) +
        parseInt(result?.data?.fileLoggedCount) +
          parseInt(result?.data?.incompleteDocCount) +
            parseInt(result?.data?.offerAppliedCount) +
               parseInt(result?.data?.offerReceivedCount) +
                 parseInt(result?.data?.onshoreCount) +
                   parseInt(result?.data?.refundCount) +
                    parseInt(result?.data?.visaApprovedCount) +
                       parseInt(result?.data?.visaDeclineCount)
                        // parseInt(result?.data?.pending)+
                       //parseInt(result?.data?.closed);
console.log(totalEnquiriesCount)
      setTotalEnquiriesCount(totalEnquiriesCount);
    }
  };

  const getStatusCount = async () => {
    const result = await axios.get(`${VISA_URL}/users/userStatusCount`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    var allUsersStatusData = [];
    var allUsersNames = [];
    const allStatus = [
      "incompleteDocuments",
      "applicationOnAssessment",
      "offerApplied",
      "offerReceived",
      "fileLogged",
      "visaApproved",
      "visaDecline",
      "onshore",
      "refund",
    ];
    console.log("result Status Count", result);
    console.log("assigned dashboard",result?.data?.userStatusCount);
    setLoading(false);
    setAllStatusCounts(result?.data?.userStatusCount);
  };

  const getLanguageTestsCount = async () => {
    const result = await axios.get(`${VISA_URL}/users/testCount`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    setLoading(false);
    setIeltsTakenCount(result?.data?.studentCountIELTS);

    setPteTakenCount(result?.data?.studentCountPTE);
  };

  const getChannelName = async () => {
    const result = await axios.get(`${VISA_URL}/users/getAllChannel`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("GetallChannel", result?.data);
    setLoading(false);
    setChannelName(result?.data?.channelData);
  };

  if (loading) {
    return (
      <div className="loader-container">
        <Circles type="Puff" color="#3081E8" height={100} width={100} />
      </div>
    );
  }
  return (
    <Container style={{ padding: 10 }}>
      <Grid item>
        <Box className={styles}>
          <Breadcrumbs maxItems={2} aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Typography color="text.primary">Dashboard</Typography>
          </Breadcrumbs>
        </Box>
      </Grid>
      <Grid container>
        {apiData.map((user, i) => (
          <Grid item xs={12} sm={6} md={3} p={3}>
            <Card style={{ ...cardStyle, backgroundColor: colors[i] }}>
              <CardContent>
                {(() => {
                  if (user.id === 1) {
                    return <AddIcCallIcon style={{ color: "#ffffff" }} />;
                  } else if (user.id === 2) {
                    return <CheckBoxIcon style={{ color: "#ffffff" }} />;
                  } else if (user.id === 3) {
                    return (
                      <PendingActionsOutlinedIcon
                        style={{ color: "#ffffff" }}
                      />
                    );
                  } else {
                    return <EventRepeatIcon style={{ color: "#ffffff" }} />;
                  }
                })()}

                <p style={titleStyle}>{user.title}</p>
                <h4 style={{ color: "#ffffff" }}>{user.value}</h4>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/*Chart */}
      <Grid container>
        <Grid item xs={12} sm={6} md={6} p={6}>
          <Card sx={{ minWidth: 'auto',minHeight: 275 }}>
            <CardContent>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  type="date"
                  label="From"
                  margin={"normal"}
                  size={"small"}
                  defaultValue={moment().format("YYYY-MM-DD")}
                  value={fromDateBarGraph}
                  inputProps={{ style: { fontSize: 12 } }} // font size of input text
                  onChange={(event) => setFromDateBarGraph(event.target.value)}
                />
                <TextField
                  type="date"
                  label="To"
                  margin={"normal"}
                  sx={{ ml: 1 }}
                  size={"small"}
                  value={toDateBarGraph}
                  inputProps={{ style: { fontSize: 12 } }} // font size of input text
                  defaultValue={moment().format("YYYY-MM-DD")}
                  onChange={(event) => setToDateBarGraph(event.target.value)}
                />
              </Box>
              <Bar
                data={barGraphData}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: "Success in last few months",
                    },
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={0} p={6}>
          <Card sx={{ minWidth: 'auto', minHeight: 275 }}>
            <CardContent>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  type="date"
                  label="From"
                  margin={"normal"}
                  size={"small"}
                  defaultValue={moment().format("YYYY-MM-DD")}
                  value={fromDateLineGraph}
                  inputProps={{ style: { fontSize: 12 } }} // font size of input text
                  onChange={(event) => setFromDateLineGraph(event.target.value)}
                />
                <TextField
                  type="date"
                  label="To"
                  margin={"normal"}
                  sx={{ ml: 1 }}
                  size={"small"}
                  value={toDateLineGraph}
                  inputProps={{ style: { fontSize: 12 } }} // font size of input text
                  defaultValue={moment().format("YYYY-MM-DD")}
                  onChange={(event) => setToDateLineGraph(event.target.value)}
                />
              </Box>
              <Line
                data={lineGraphData}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: "Total Enquiry in Last few months",
                    },
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={12} md={0} p={6}>
          <Card sx={{ minWidth: "auto", minHeight: 275 }}>
            <CardContent>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <h6>Crrent Applications Status</h6>
                    </TableCell>
                    <TableCell align="right">
                      <h6>Count</h6>
                    </TableCell>
                    <TableCell align="right">
                      <h6>Action</h6>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    key={statusData.incompleteDocCount}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      Incomplete Count
                    </TableCell>
                    <TableCell align="right">
                      {statusData.incompleteDocCount}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() =>
                          navigate("/EnquiriesList", {
                            state: {
                              status: "incompleteDocuments",
                            },
                          })
                        }
                      >
                        <PageviewIcon style={{ color: "#0d6efd" }} />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    key={statusData.ncompleteDocCount}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      Application On Assessment
                    </TableCell>
                    <TableCell align="right">
                      {statusData.applicationOnAssessmentCount}
                    </TableCell>
                    <TableCell align="right">
                      {" "}
                      <Button
                        onClick={() =>
                          navigate("/EnquiriesList", {
                            state: {
                              status: "applicationOnAssessment",
                            },
                          })
                        }
                      >
                        <PageviewIcon style={{ color: "#0d6efd" }} />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    key={statusData.ncompleteDocCount}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      Offer Received
                    </TableCell>
                    <TableCell align="right">
                      {statusData.offerReceivedCount}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() =>
                          navigate("/EnquiriesList", {
                            state: {
                              status: "offerReceived",
                            },
                          })
                        }
                      >
                        <PageviewIcon style={{ color: "#0d6efd" }} />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    key={statusData.ncompleteDocCount}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      Offer Applied
                    </TableCell>
                    <TableCell align="right">
                      {statusData.offerAppliedCount}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() =>
                          navigate("/EnquiriesList", {
                            state: {
                              status: "offerApplied",
                            },
                          })
                        }
                      >
                        <PageviewIcon style={{ color: "#0d6efd" }} />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    key={statusData.ncompleteDocCount}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      File Logged
                    </TableCell>
                    <TableCell align="right">
                      {statusData.fileLoggedCount}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() =>
                          navigate("/EnquiriesList", {
                            state: {
                              status: "fileLogged",
                            },
                          })
                        }
                      >
                        <PageviewIcon style={{ color: "#0d6efd" }} />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    key={statusData.ncompleteDocCount}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      Visa Approved
                    </TableCell>
                    <TableCell align="right">
                      {statusData.visaApprovedCount}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() =>
                          navigate("/EnquiriesList", {
                            state: {
                              status: "visaApproved",
                            },
                          })
                        }
                      >
                        <PageviewIcon style={{ color: "#0d6efd" }} />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    key={statusData.visaDecline}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      Visa Declined
                    </TableCell>
                    <TableCell align="right">
                      {statusData.visaDeclineCount}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() =>
                          navigate("/EnquiriesList", {
                            state: {
                              status: "visaDecline",
                            },
                          })
                        }
                      >
                        <PageviewIcon style={{ color: "#0d6efd" }} />
                      </Button>
                    </TableCell>
                  </TableRow>

                  <TableRow
                    key={statusData.ncompleteDocCount}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      On Shore
                    </TableCell>
                    <TableCell align="right">
                      {statusData.onshoreCount}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() =>
                          navigate("/EnquiriesList", {
                            state: {
                              status: "onshore",
                            },
                          })
                        }
                      >
                        <PageviewIcon style={{ color: "#0d6efd" }} />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    key={statusData.ncompleteDocCount}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      Refund
                    </TableCell>
                    <TableCell align="right">
                      {statusData.refundCount}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() =>
                          navigate("/EnquiriesList", {
                            state: {
                              status: "refund",
                            },
                          })
                        }
                      >
                        <PageviewIcon style={{ color: "#0d6efd" }} />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    key={statusData.ncompleteDocCount}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <h6 style={{ color: "red" }}>Pending</h6>
                    </TableCell>
                    <TableCell align="right">
                      {statusData.pendingCount}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() =>
                          navigate("/EnquiriesList", {
                            state: {
                              status: "pending",
                            },
                          })
                        }
                      >
                        <PageviewIcon style={{ color: "#0d6efd" }} />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    key={statusData.ncompleteDocCount}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <h6 style={{ color: "green" }}>Closed</h6>
                    </TableCell>
                    <TableCell align="right">
                      {statusData.closedCount}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() =>
                          navigate("/EnquiriesList", {
                            state: {
                              status: "closed",
                            },
                          })
                        }
                      >
                        <PageviewIcon style={{ color: "#0d6efd" }} />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} sm={12} md={0} p={6}>
          <Card sx={{ minWidth: "auto", minHeight: "auto"}}>
            <CardContent>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <h6>
                        <b>Userwise Report</b>
                      </h6>
                    </TableCell>
                    <TableCell align="center">
                      <h6>Incomplete Documents</h6>
                    </TableCell>
                    <TableCell align="center">
                      <h6>Application on Assesment</h6>
                    </TableCell>
                    <TableCell align="center">
                      <h6>Offer Applied</h6>
                    </TableCell>
                    <TableCell align="center">
                      <h6>Offer Received</h6>
                    </TableCell>
                    <TableCell align="center">
                      <h6>File Logged</h6>
                    </TableCell>
                    <TableCell align="center">
                      <h6>Visa Approved</h6>
                    </TableCell>
                    <TableCell align="center">
                      <h6>Visa Declined</h6>
                    </TableCell>
                    <TableCell align="center">
                      <h6>On Shore</h6>
                    </TableCell>
                    <TableCell align="center">
                      <h6>Refund</h6>
                    </TableCell>
                    <TableCell align="center">
                      <h6 style={{color:"red"}}>Pending</h6>
                    </TableCell>
                    <TableCell align="center">
                      <h6 style={{color:"green"}}>Closed</h6>
                    </TableCell>
                    <TableCell align="center">
                      <h6>Action</h6>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allStatusCounts.map((singleStatusCountRow) => {
                    return (
                      <TableRow
                        key={singleStatusCountRow[0]}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {singleStatusCountRow?.userName}
                        </TableCell>
                        <TableCell align="center">
                          <h6>
                            {singleStatusCountRow?.statusCounts
                              ?.incompleteDocuments
                              ? singleStatusCountRow?.statusCounts
                                  ?.incompleteDocuments
                              : "0"}
                          </h6>
                        </TableCell>
                        <TableCell align="center">
                          <h6>
                            {singleStatusCountRow?.statusCounts
                              ?.applicationOnAssessment
                              ? singleStatusCountRow?.statusCounts
                                  ?.applicationOnAssessment
                              : "0"}
                          </h6>
                        </TableCell>
                        <TableCell align="center">
                          <h6>
                            {singleStatusCountRow?.statusCounts?.offerApplied
                              ? singleStatusCountRow?.statusCounts?.offerApplied
                              : "0"}
                          </h6>
                        </TableCell>
                        <TableCell align="center">
                          <h6>
                            {singleStatusCountRow?.statusCounts?.offerReceived
                              ? singleStatusCountRow?.statusCounts
                                  ?.offerReceived
                              : "0"}
                          </h6>
                        </TableCell>
                        <TableCell align="center">
                          <h6>
                            {singleStatusCountRow?.statusCounts?.fileLogged
                              ? singleStatusCountRow?.statusCounts?.fileLogged
                              : "0"}
                          </h6>
                        </TableCell>
                        <TableCell align="center">
                          <h6>
                            {singleStatusCountRow?.statusCounts?.visaApproved
                              ? singleStatusCountRow?.statusCounts?.visaApproved
                              : "0"}
                          </h6>
                        </TableCell>
                        <TableCell align="center">
                          <h6>
                            {singleStatusCountRow?.statusCounts?.visaDecline
                              ? singleStatusCountRow?.statusCounts?.visaDecline
                              : "0"}
                          </h6>
                        </TableCell>
                        <TableCell align="center">
                          <h6>
                            {singleStatusCountRow?.statusCounts?.onshore
                              ? singleStatusCountRow?.statusCounts?.onshore
                              : "0"}
                          </h6>
                        </TableCell>
                        <TableCell align="center">
                          <h6>
                            {singleStatusCountRow?.statusCounts?.refund
                              ? singleStatusCountRow?.statusCounts?.refund
                              : "0"}
                          </h6>
                        </TableCell>
                        <TableCell align="center">
                          <h6>
                            {singleStatusCountRow?.statusCounts?.pending
                              ? singleStatusCountRow?.statusCounts?.pending
                              : "0"}
                          </h6>
                        </TableCell>
                        <TableCell align="center">
                          <h6>
                            {singleStatusCountRow?.statusCounts?.closed
                              ? singleStatusCountRow?.statusCounts?.closed
                              : "0"}
                          </h6>
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            onClick={() =>
                              navigate("/EnquiriesList", {
                                state: {
                                  username: singleStatusCountRow?.userName,
                                },
                              })
                            }
                          >
                            <PageviewIcon style={{ color: "#0d6efd" }} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={12} md={0} p={6}>
          <Card sx={{ minWidth: "auto"  }}>
            <CardContent>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <h6>Channel Name </h6>
                    </TableCell>
               
                    <TableCell>
                      <h6>Count</h6>
                    </TableCell>
                    <TableCell align="right">
                      <h6>Action</h6>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {channelName.map((singleChannelName) => {
                    return (
                      <TableRow
                        key={Object.keys(singleChannelName)}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {singleChannelName?.latestChannel}
                        </TableCell>
                       
                        <TableCell>{singleChannelName?.count}</TableCell>
                        <TableCell align="right">
                          <Button
                            onClick={() =>
                              navigate("/EnquiriesList", {
                                state: {
                                  latestChannel: singleChannelName?.latestChannel,
                                },
                              })
                            }
                          >
                            <PageviewIcon style={{ color: "#0d6efd" }} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;