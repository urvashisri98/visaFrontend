import React, { useEffect, useState, useNavigate } from "react";

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TextField, Container, LinearProgress, CircularProgress, Button, Breadcrumbs, Box, Link, Typography, IconButton, Alert } from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';
import ImageIcon from '@mui/icons-material/Image';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Stack from '@mui/material/Stack';
import AWS from 'aws-sdk';
import { VISA_URL } from "../../constant/constants";
import axios from "axios";
import CircularJSON from "circular-json";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { Circles } from 'react-loader-spinner';

window.Buffer = window.Buffer || require("buffer").Buffer;
const token = JSON.parse(localStorage.getItem("token"));

const AddUniversity = () => {

  const [open, setOpen] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [universities, setUniversities] = useState([]);
  const [deleteAlertVisible, setDeleteAlertVisibility] = useState(false);
  const [deleteUniId, setDeleteUniId] = useState(null);
  const [universty, setUniversty] = useState({ name: "", link: "" });
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const s3 = new AWS.S3();
  const S3_BUCKET = 'microdemand-dev';
  const REGION = 'us-east-1';
  const ACCESS_KEY = 'AKIAREBXG45DTSWA434H';
  const SECRET_ACCESS_KEY = '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';
  const [searchValue, setSearchValue] = useState('');
  const [searchedTableRows, setSearchedTableRows] = useState(null);
  const [loading, setLoading] = useState(true);
  AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
    region: REGION,
    signatureVersion: 'v4',
  });



  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  })
  const handleClickOpen = () => {
    setOpenDelete(true);
  };

  const handleClose = () => {
    setOpenDelete(false);
  };

  useEffect(() => {
    loadUniversities();
  }, []);

  const loadUniversities = async (e) => {
    await axios.get(`${VISA_URL}/users/getUniversities`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      })
      .then(response => {
        console.log('Universities ==> ', response);
        setLoading(false);
        let rowsData = [];
        let key = 1;

        response.data.apiRes.map((item) => {
          rowsData.push({ id: item?._id, key: key, name: item?.name, link: item.brochureLink });
          key++;
        });
        setUniversities(rowsData);
      }
      );
  };

  const addNewUniversity = async () => {
    setLoader(true);
    const result = await axios.post(`${VISA_URL}/users/addUniversity`, CircularJSON.stringify({
      "universityName": universty.name,
      "link": universty.link
    }),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

    if (result.data.response == "success") {
      setOpen(false);
      setLoading(false);
      setUniversty({ name: "", link: "" });
      loadUniversities();
    }
    else {
      setOpen(false);
      setLoading(false);
      setUniversty({ name: "", link: "" });
      alert('Some error while adding the country');
    }
  };

  const handleInputChange = (event) => {
    var finalUniversity = {};

    const { name, value } = event.target;
    if (name == "name") {
      setUniversty((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleFileChange = async (e) => {
    const params = {
      Bucket: S3_BUCKET,
      Key: `${Date.now()}.${e.target.files[0].name}`,
      Body: e.target.files[0],
      ContentType: e.target.files[0].type,
    };
    const { Location } = await s3.upload(params).promise();

    let university = universty;
    university.link = Location;
    setUniversty(university);
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const deleteUniversity = async (id) => {
    setOpenDelete(true);
    setDeleteUniId(id);
  }

  const conductSearch = (value) => {

    setSearchValue(value);

    if (value == '') {
      setSearchedTableRows(universities);
    }
    else {
      let newRows = universities.filter((item) => {
        return item?.name?.includes(value);
      })

      console.log('New rows ==> ', newRows);
      setSearchedTableRows(newRows);
    }

  }

  const deleteUniversityConfirmed = async () => {
    setOpenDelete(false);
    setLoader(true)

    const result = await axios.delete(`${VISA_URL}/users/removeUniversity?id=` + deleteUniId,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      });

    if (result.data.response == "success") {
      setOpenDelete(false);
      setLoading(false);
      loadUniversities();
    }
    else {
      setLoading(false);
      setDeleteAlertVisibility(false);
      alert('Some error while deleting the university');
    }
  }
  if (loading) {
    return (
      <div className="loader-container">
        <Circles type="Puff" color="#3081E8" height={100} width={100} />
      </div>
    );
  }
  return (
    <Container maxWidth="lg" sx={{ pb: 3 }}>
      {
        loader &&
        <LinearProgress color="success" />
      }

      <Grid container maxWidth="lg" spacing={6} >
        <Grid item m={5}>
          <Box  >
            <Breadcrumbs maxItems={2} aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Home
              </Link>
              <Typography color="text.primary">Universities</Typography>
            </Breadcrumbs>
          </Box>
        </Grid>
      </Grid>

      <Container maxWidth="md">
        <Grid container direction="row"
          justifyContent="space-between"
          alignItems="center" marginBottom={2} >
          <Grid item >
            <TextField
              id="serach"
              placeholder="Search University ..."
              size="small"
              onChange={(e) => {
                conductSearch(e.target.value)
              }}
            />
          </Grid>
          <Grid item >
            <Button variant="contained" onClick={() => setOpen(true)} >
              <AddIcon sx={{ fontSize: 18 }} />Add </Button>
          </Grid>
        </Grid>



        <Dialog open={open}>
          <DialogTitle>Add University</DialogTitle>
          <DialogContent style={{ height: 200, width: 500 }}>
            <DialogContentText style={{ marginBottom: 30 }}>
              Please add the university:
            </DialogContentText>
            <TextField
              label="Name"
              name="name"
              margin={'normal'}
              size={'small'}
              onChange={(event) => {
                handleInputChange(event);
              }}
            />
            <div style={{ marginTop: 30 }}>
              <input name="link" type="file" onChange={handleFileChange} accept="image/png, image/gif, image/jpeg, application/pdf" />
            </div>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={() => { setOpen(false) }}>Cancel</Button>
            <Button variant="contained" onClick={() => addNewUniversity()}>Add</Button>
          </DialogActions>
        </Dialog>

        {
          openDelete &&
          <Dialog
            fullScreen={fullScreen}
            open={openDelete}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              {"Are sure you want to delete university ?"}

            </DialogTitle>
            <DialogContent>
              <DialogContentText>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" autoFocus onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="contained" onClick={deleteUniversityConfirmed} autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        }
        <TableContainer component={Paper} >
          <Table aria-label="customized table">
            <TableHead>
              <TableRow sx={{
                "& th": {
                  color: "rgba(96, 96, 96)",
                  backgroundColor: "#1976d2",
                  color: "#ffffff"
                }
              }}>
                <TableCell>ID</TableCell>
                <TableCell align="left"><h6>Universities</h6></TableCell>
                <TableCell align="left"><h6>Attachments</h6></TableCell>
                <TableCell align="left"><h6>Action</h6></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(searchedTableRows !== null ? searchedTableRows : universities).map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.key}
                  </TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">
                    <IconButton onClick={() => window.open(row.link, "_blank")}>
                      <ImageIcon style={{ color: '#0d6efd' }} />
                    </IconButton>
                  </TableCell>
                  <TableCell align="left">


                    <IconButton onClick={() => deleteUniversity(row.id)}>
                      <DeleteIcon fontSize="small" style={{ color: 'red' }} />
                    </IconButton>


                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Container>

  );
}

export default AddUniversity;