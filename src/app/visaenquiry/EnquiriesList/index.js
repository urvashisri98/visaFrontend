import React, { useEffect, useState } from "react";
import "./EnquiriesList.css";
import TextField from "@mui/material/TextField";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
// import Alert from "@mui/material/Alert";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
// import dayjs from "dayjs";
import Paper from "@mui/material/Paper";
import TableFooter from "@mui/material/TableFooter";
import axios from "axios";
import PropTypes from "prop-types";
import { VISA_URL } from "../../../constant/constants";
import TablePagination from "@mui/material/TablePagination";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { CSVLink } from "react-csv";
import { Circles } from "react-loader-spinner";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Breadcrumbs,
  Box,
  Link,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useTheme } from "@mui/material/styles";

// Material Responsive dialog imports

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";

// end
import moment from "moment";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export const EnquiriesList = () => {
  const [showAlert, setShowAlert] = React.useState(false);
  const [tableRows, setTableRows] = useState([]);
  const [rowsData, setRowsData] = useState([]);
  const [selectedOption, setSelectedOption] = useState([{ id: 0, value: "" }]);
  const [fromdate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [userList, setUserList] = useState([]);
  const [updateState, setUpdateState] = useState(false);
  const [page, setPage] = React.useState(0);
  // const [assignedBy, setAssignedBy] = useState();
  const [intakeValue, setIntakeValue] = useState(null);
  const [channelValue, setChannelValue] = useState(null);
  const location = useLocation();
  const [studentsearch, setStudentsearch] = useState("");
  // const [searchdata, setSearchdata] = useState([]);
  const isAdmin = JSON.parse(localStorage.getItem("userData"));
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [visaApprovalStudentId, setVisaApprovalStudentId] =
    React.useState(null);
  const [totalCount, setTotalCount] = React.useState(null);
  const [visaApprovedDialog, showVisaApprovedDialog] = useState(false);
  const theme = useTheme();
  const [visaApprovalDate, setVisaApprovalDate] = useState();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const token = JSON.parse(localStorage.getItem("token"));
  const [currentChannelData, setCurrentChannelData] = useState([]);
  const [colSearch, setColSearch] = React.useState("");
  const [colSearchKey, setColSearchKey] = React.useState("");
  const [csvData, setCsvData] = useState("");
  const [showStatus, setShowStatus] = React.useState(false);
  const [dialogProps, setDailogProps] = useState({});
  const [loading, setLoading] = useState(true);

  console.log("role ==. ", isAdmin.adminType);
  const fetchData = async () => {
    await axios
      .post(
        `${VISA_URL}/users/getStudents?page=` + (page + 1),
        {
          startDate: fromdate || "",
          endDate: toDate || "",
          colName: colSearchKey || "",
          colValue: colSearch || "",
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setLoading(false);
        console.log("studentsId", response.data.data);
        setTotalCount(response?.data?.data?.length);

        var data = response.data.data;
        loadTable(data);
      });
  };

  const fetchStatusData = async (status) => {
    console.log("fetchStatusData", status);
    await axios
      .post(
        `${VISA_URL}/users/getStudents?page=` + (page + 1),
        {
          startDate: fromdate || "",
          endDate: toDate || "",
          colName: "status" || "",
          colValue: status || "",
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setLoading(false);
        console.log("===>", response.data.data);
        let datacount = response?.data?.data;
        setTotalCount(datacount.length);
        var data = response.data.data;
        loadTable(data);

      });
  };
  const fetchUserNameData = async (username) => {
    await axios
      .post(
        `${VISA_URL}/users/getStudents?page=` + (page + 1),
        {
          startDate: fromdate || "",
          endDate: toDate || "",
          colName: 'userName' || "",
          colValue: username || ""
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("assignedto data", response)
        setLoading(false);
        setTotalCount(response?.data?.data?.length);
        var data = response.data.data;
        loadTable(data);

      });
  };

  const fetchFreezedApplications = async (e) => {
    const result = await axios.get(
      `${VISA_URL}/users/lastUpdateApplications?page=` + (page + 1),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    loadTable(result?.data?.dbRes);
    setTotalCount(result?.data?.data?.length);
  };

  const fetchNameData = async (name) => {
    await axios
      .post(
        `${VISA_URL}/users/getStudents?page=` + (page + 1),
        {
          startDate: fromdate || "",
          endDate: toDate || "",
          colName: "name" || "",
          colValue: name || "",
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setLoading(false);
        setTotalCount(response?.data?.data?.length);
        var data = response.data.data;
        loadTable(data);
      });
  };

  const fetchChannelnameData = async (channelName) => {
    await axios
      .post(
        `${VISA_URL}/users/getStudents?page=` + (page + 1),
        {
          startDate: fromdate || "",
          endDate: toDate || "",
          colName: "channel" || "",
          colValue: "" || "",
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("channelresponse", response);
        setLoading(false);
        var data = response?.data?.data;
        const channelData = [];
        data?.map((item) => {
          // console.log("juyhgueygfcyerf",item.channel === channelName)
          if (item.channel === channelName) {
            channelData.push(item);
            console.log("channelData", channelData);
            setTotalCount(channelData?.length);
          }
        });
        loadTable(channelData);
      });
  };
  const loadTable = (data) => {
    let rowArray = [];
    let id = 1;

    data?.map((item, index) => {
      console.log("item ==> ", item);

      const dateString = item?.updatedAt;
      let studentdate;
      if (dateString) {
        const updatedate = new Date(dateString);
        const year = updatedate?.getFullYear();
        const month = updatedate?.getMonth() + 1; // Add 1 to get 1-12 instead of 0-11
        const day = updatedate?.getDate();
        studentdate = `${year}-${month}-${day}`;
      } else {
        studentdate = "-";
      }
      let rowObject = {
        name: item?.name,
        fatherName: item?.fatherName,
        applicationStatus: item?.applicationStatus.replace(/([A-Z])/g, ' $1').trim().replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }),
        country: item?.country?.name,
        reference: item?.reference,
        assignedTo: item?.assignee?.name,
        key: item._id,
        lastUpdated: studentdate,
        action: (
          <Grid sx={{ width: "max-content" }}>
            <EditIcon
              sx={{ color: "green", cursor: "pointer" }}
              onClick={() => handleEditStudentData(item._id, false)}
            />
            <VisibilityIcon
              sx={{ color: "blue", ml: 2, cursor: "pointer" }}
              onClick={() => handleRowItemClicked(item._id, true)}
            />
            <DeleteIcon
              sx={{ color: "red", ml: 2, cursor: "pointer" }}
              onClick={() => handleDelete(item._id, true)}
            />
            {(isAdmin.adminType == 'SUPERADMIN') && (
              <AttachMoneyIcon
                sx={{ color: "darkgreen", ml: 2, cursor: "pointer" }}
                onClick={() => handlePackage(item._id, true)}
              />
            )}
          </Grid>
        ),
      };
      rowArray.push(rowObject);
    });
    console.log('rowArray', rowArray);
    setRowsData(rowArray);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableRows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    fetchData();
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(20);
    setPage(0);
  };

  const getChannelListForStudent = async (stuId) => {
    const result = await axios.get(
      `${VISA_URL}/users/getChannel?studentId=` + stuId,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    setLoading(false);
    console.log("result?.data", result?.data);
    setTotalCount(result?.data?.channelData?.length);
    setCurrentChannelData(result?.data?.channelData);
  };

  const onStatus = (data, Id, index) => {
    setSelectedOption(data.target.value);

    if (data.target.value == "visaApproved") {
      showVisaApprovedDialog(true);
      setVisaApprovalStudentId(Id);
      getChannelListForStudent(Id);
    }

    const { name, value } = data.target;
    let selectedOptions = [...selectedOption];
    selectedOptions[index] = value;
    setSelectedOption(selectedOptions);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    axios
      .post(
        `${VISA_URL}/users/addStudentApplicationStatus?studentId=${Id}`,
        {
          // studentId: Id,
          status: data.target.value,
          // status: selectedOption,
        },
        config
      )
      .then((response) => {
        setLoading(false);
        console.log("Res ==> ", response);
      })
      .catch((error) => {
        console.log("Error ==> ", error);
      });
  };
  const assigned = async () => {
    let userArray = [];
    const userAllList = await axios.get(`${VISA_URL}/users/getUsers`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    let responseData = userAllList?.data?.apiRes;
    console.log("responseData", responseData)
    if (responseData) {
      // if (responseData[0].superadmin[0]?.name) {
      //   userArray.push(responseData[0].superadmin[0]?.name);
      // }
      if (responseData[0]?.admin) {
        responseData[0]?.admin?.map((items) => {
          userArray.push(items);
        });
      }
      if (responseData[1]?.subadmin) {
        responseData[1]?.subadmin?.map((items) => {
          userArray.push(items);
        });
      }
    }
    console.log(userArray, "finaluserList", userList);
    setLoading(false);
    setUserList(userArray);
  };

  const handleChange = (event) => {

    if (event.target.value == "status") {
      setShowStatus(true);
    } else {
      setShowStatus(false);
      setColSearch("");
    }
    setColSearchKey(event.target.value);
  };

  const handleStatusChange = (event) => {
    if (event.target.value == "freezed") {
      setColSearch(event.target.value);
      fetchFreezedApplications();
      return;
    } else {
      setColSearch(event.target.value);
    }
  };

  const handleDelete = async (studentId) => {
    setDailogProps(studentId);
    setShowAlert(true);
  };

  const handleDeleteId = async (Id) => {
    const studentID = dialogProps;
    console.log("studentID", studentID);
    await axios
      .delete(`${VISA_URL}/users/deleteStudent?studentId=${studentID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("response", response);
        if (response.status === 200) {
          console.log(response, "deleted successfully!");
          setLoading(false);
          // alert("Data deleted successfully");

          setShowAlert(false);

          // <Alert severity="success">{response}</Alert>
          setUpdateState(!updateState);
          // navigate("/EnquiriesList")
        } else {
          console.log("Error", response.data.error);
        }
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  };

  //   console.log("Data from Api ",enquiryList)
  const navigate = useNavigate();

  const handleRowItemClicked = (value, edit) => {
    console.log("==>", value, edit);
    navigate("/Viewenquirylist", {
      state: {
        studentId: value,
        editable: edit,
        // status: selectedOption.value,
      },
    });
  };
  const handlePackage = async (studentId, value) => {
    console.log("==>", studentId);
    //if (role === "superAdmin") {
    const userList = await axios.get(
      `${VISA_URL}/users/getPackage?studentId=${studentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    let responseData = userList;

    const packageData = responseData.data.packageData;
    setLoading(false);
    navigate("/UserPackage", {
      state: {
        studentId: studentId,
        packageData: responseData?.data?.packageData,
      },
    });
    //}
  };
  const handleEditStudentData = (value, edit) => {
    console.log("==>", value, edit);
    navigate("/personalEdit", {
      state: { studentId: value, editable: edit },
    });
  };

  const handleOnVisaEnquiry = () => {
    navigate("/VisaEnquiry");
  };

  const handleOnDateSearch = async () => {
    fetchData();
  };
  const handleOnNameSearch = async (event) => {
    console.log("handleOnNameSearch",event)
    setStudentsearch(event.target.value);
    setColSearch(event.target.value);
  };

  const intakeChangeHandler = (e) => {
    setIntakeValue(e.target.value);
  };

  const submitVisaApprovedDialog = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    await axios
      .post(
        `${VISA_URL}/users/addApprovedChannel?studentId=${visaApprovalStudentId}`,
        {
          date: visaApprovalDate,
          intake: intakeValue,
          channel: channelValue,
        },
        config
      )
      .then((response) => {
        console.log("Res ==> ", response);
        setLoading(false);
        showVisaApprovedDialog(false);
        fetchData();
      })
      .catch((error) => {
        console.log("Error ==> ", error);
      });
  };

  const assignedToOnClick = async (event, studentId) => {
    const selectedValue = event.target.value;
    const selectedOptionData = userList.find(
      (option) => option.name === selectedValue
    );
    console.log("assignedToOnClick", event.target.value, selectedOptionData);

    let userId = selectedOptionData._id;
    let userName = selectedOptionData?.name;
    let role = selectedOptionData?.role?.role;

    const result = await axios.put(
      `${VISA_URL}/users/assignUser?studentId=${studentId}`,
      { userId: userId, role: role },
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("result ===>>>>>>>>>>>>>>> ", result);
    setLoading(false);

    //setAssignedBy(userName);
    setUpdateState(!updateState);
    // console.log("event.target.value.name", event.target.value.name);
  };
  const handleKeyPress = (event) => {
    console.log("handleKeyPress",event.target.value,event.key)
    if (event.key === 'Enter') {
      // Call your function here when Enter key is pressed
      // Example: callYourFunction();
    
      fetchData()
    }
  };


  useEffect(() => {
    console.log(
      moment().format("YYYY-MM-DD"),
      "Location from all channel",
      location.state?.studentName
    );
    if (location.state && location.state.status) {
      var event = { target: { value: '' } };
      event.target.value = 'status';
      handleChange(event);
      setColSearch(location.state.status);
      if (location.state.status == 'freezed') {
        fetchFreezedApplications();
      }
      // else if(event.key === 'Enter'){
      //   fetchStatusData(location.state.status);
      // }
      else {
        fetchStatusData(location.state.status);
      }
     
    }
    else if (location?.state && location?.state?.username) {
      var event = { target: { value: '' } };
      event.target.value = 'userName';
      handleChange(event);
      setColSearch(location?.state?.username);
      fetchUserNameData(location.state.username);
    
    } 
  //   else if(event.key==="enter"){
  //    if(location?.state && location?.state?.username) {
  //     event.preventDefault();
  //     var event = { target: { value: '' } };
  //     event.target.value = 'userName';
  //     handleChange(event);
  //     setColSearch(location?.state?.username);
  //     fetchUserNameData(location.state.username);
    
  //   }
  // }
    else if (location?.state && location?.state?.studentName) {
      var event = { target: { value: "" } };
      event.target.value = "name";
      handleChange(event);
      setColSearch(location?.state?.studentName);
      fetchNameData(location?.state?.studentName);
    } else if (location?.state && location?.state?.latestChannel) {
      var event = { target: { value: "" } };
      event.target.value = "channel";
      handleChange(event);
      setColSearch(location?.state?.latestChannel);
      fetchChannelnameData(location?.state?.latestChannel);
    } else {
      fetchData();
    }
    getCsvFileData();
    assigned();
    if (!token) {
      navigate("/login");
    }
  }, [updateState, page]);
 
  const getCsvFileData = async () => {
    await axios
      .post(
        `${VISA_URL}/users/downloadStudentData`,
        {
          startDate: fromdate || "",
          endDate: toDate || "",
          colName: colSearchKey || "",
          colValue: colSearch || "",
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("csv data==>",response)
        
        var csvData = [];
        response?.data?.dbRes.map((item) => {
          let newItem = {};
          newItem.applicationStatus = item.applicationStatus;
          newItem.assignee=item.assignee.name;
          newItem.country=item.country.name;
          newItem.createdAt=item.createdAt;
          newItem.updatedAt=item.updatedAt;
          newItem.fatherName=item.fatherName;
          newItem.name=item.name;
          newItem.reference=item.reference;
          newItem._id=item._id;
          csvData.push(newItem);
        })
        setCsvData(csvData);
      });
  };
  if (loading) {
    return (
      <div className="loader-container">
        <Circles type="Puff" color="#3081E8" height={100} width={100} />
      </div>
    );
  }

  //   const useStyles = makeStyles({

  //     root: {
  //         "& .MuiTableCell-head": {
  //             color: "white",
  //             backgroundColor: "blue"
  //         },
  //     }
  // });

  return (
    <div className="main-container-enquiry-list">
      <Dialog
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
      </Dialog>

      <Box>
        <Breadcrumbs maxItems={2} aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography color="text.primary">Enquiries</Typography>
        </Breadcrumbs>
      </Box>
      <Grid
        container
        spacing={3}
        direction="row"
        justifyContent="center"
        alignItems="center"
        pb={1}
        ori
      >
        <Grid item>
          <TextField
            type="date"
            label="From"
            margin={"normal"}
            size={"small"}
            defaultValue={moment().format("YYYY-MM-DD")}
            value={fromdate}
            onChange={(event) => setFromDate(event.target.value)}
          />
        </Grid>
        <Grid item>
          <FormControl sx={{ minWidth: 120 }} size="small">
            <TextField
              type="date"
              label="To"
              margin={"normal"}
              sx={{ ml: 1 }}
              size={"small"}
              value={toDate}
              defaultValue={moment().format("YYYY-MM-DD")}
              onChange={(event) => setToDate(event.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl sx={{ mt: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Filter</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={colSearchKey}
              label="Search"
              onChange={handleChange}
              
            >
              <MenuItem value={"status"}>Status</MenuItem>
              <MenuItem value={"name"}>Name</MenuItem>
              <MenuItem value={"userName"}>User Name</MenuItem>
              <MenuItem value={"reference"}>Reference</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          {!showStatus && (
            <TextField
              label="Search"
              InputProps={{
                type: "search",
              }}
              sx={{ width: 200 }}
              margin={"normal"}
              size={"small"}
              value={studentsearch}
              onChange={(e) => handleOnNameSearch(e)}
              onKeyPress={(e)=>handleKeyPress(e)}
            />
          )}
          {showStatus && (
            <FormControl sx={{ mt: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">Filter</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={colSearch}
                label="Search"
                onChange={handleStatusChange}
                onKeyPress={(e)=>handleKeyPress(e)}
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
                <MenuItem value={"freezed"}>Freezed</MenuItem>
              </Select>
            </FormControl>
          )}
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleOnDateSearch} sx={{p:1,mt:1}}>
            <SearchIcon size={"small"} />
          </Button>
        </Grid>
        <Grid item sx={{p:1,mt:1}}>
          <CSVLink data={csvData} filename={"students-data.csv"}>
            Download CSV
          </CSVLink>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleOnVisaEnquiry} sx={{p:1,mt:1}}>
            <AddIcon />
            New appointment
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper} >
        <Table sx={{}} aria-label="simple table">
          <TableHead>
            <TableRow sx={{
              "& th": {
                color: "rgba(96, 96, 96)",
                backgroundColor: "#1976d2",
                color:"#ffffff"
              }
            }}>
              {/* <TableCell>ID</TableCell> */}
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Father Name</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Assigned To</TableCell>
              <TableCell align="left">Country</TableCell>
              <TableCell align="left">Reference</TableCell>
              <TableCell align="left">Last Updated</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsData && rowsData?.map((row) => (
              <TableRow
                key={row?.name + row?.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {" "}
                {console.log("row", row)}
                <TableCell align="left">{row?.name}</TableCell>
                <TableCell align="left">{row?.fatherName}</TableCell>
                <TableCell align="left">{row?.applicationStatus}</TableCell>
                <TableCell align="left">{row?.assignedTo}</TableCell>
                <TableCell align="left">{row?.country}</TableCell>
                <TableCell align="left">{row?.reference}</TableCell>
                <TableCell align="left">{row?.lastUpdated}</TableCell>
                <TableCell align="center">{row?.action}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[20]}
                count={totalCount}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
                align={"right"}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};
