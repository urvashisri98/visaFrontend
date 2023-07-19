import React, { useState, useEffect } from "react";

import "./Countries.css";
import Button from '@mui/material/Button';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from '@mui/icons-material/Edit';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CountrySelect from 'react-bootstrap-country-select';
import ImageIcon from '@mui/icons-material/Image';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Grid, Card, LinearProgress, TextField, Breadcrumbs, CardContent, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddIcon from '@mui/icons-material/Add';
import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
import { VISA_URL } from "../../constant/constants";
import axios from "axios";
import CircularJSON from "circular-json";
import { IconButton, Stack, Alert, Box } from "@mui/material";
import { Container } from "@mui/system";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {Circles} from 'react-loader-spinner';

const token = JSON.parse(localStorage.getItem("token"));

const Countries = () => {

  const getAllCountriesData = async () => {
    await axios.post(`${VISA_URL}/users/getCountries`, CircularJSON.stringify({
      country: ""
    }),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      })
      .then(response => {
        setLoading(false);
        let rowsData = [];
        let key = 1;

        response.data.counrtries.map((item) => {
          rowsData.push({ id: item?._id, key: key, country: item.country });
          key++;
        });
        setRows(rowsData);
      }
      );
  }
  useEffect(() => {

    getAllCountriesData();
  }, []);

  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  const [deleteCountryName, setDeleteCountryname] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [deleteAlertVisible, setDeleteAlertVisibility] = React.useState(false);
  const [newAddedCountry, setNewAddedCountry] = React.useState(null);
  const [rows, setRows] = React.useState([]);
  const [openDelete, setOpenDelete] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [loader, setLoader] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClickOpen = () => {
    setOpenDelete(true);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const addNewCountry = async () => {
    // setLoader(true)

    const result = await axios.post(`${VISA_URL}/users/addCountries`, CircularJSON.stringify({
      "country": newAddedCountry.name
    }),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

    if (result.data.response == "success") {
      setLoading(false);
      setOpen(false);
      setNewAddedCountry(null);
      // setLoader(false)
      getAllCountriesData();
    }
    else {
      setOpen(false);
      // setLoader(false);
      setLoading(false);
      setNewAddedCountry(null);
      alert('Some error while adding the country');
    }
  }

  const deleteCountry = async (countryName) => {
    setOpenDelete(true);
    setDeleteCountryname(countryName);
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const deleteCountryConfirmed = async () => {
    setOpenDelete(false);
    // setLoader(true)
    const result = await axios.delete(`${VISA_URL}/users/removeCountries`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          "country": deleteCountryName
        }
      });

    if (result.data.response == "success") {
      //alert('Country deleted sucessfully');
      getAllCountriesData();
      setLoading(false);
      // setLoader(false)
    }
    else {
      setLoader(false)
      alert('Some error while deleting the country');
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
    <>
      {
        loader &&
        <LinearProgress color="success" />
      }
      <Container maxWidth="lg" sx={{pb:3}}>

        <Box >
          <Grid container maxWidth="md" spacing={6} >
            <Grid item m={5}>
              <Box  >
                <Breadcrumbs maxItems={2} aria-label="breadcrumb">
                  <Link underline="hover" color="inherit" href="/">
                    Home
                  </Link>
                  <Typography color="text.primary">Countries</Typography>
                </Breadcrumbs>
              </Box>
            </Grid>
          </Grid>
          <Container maxWidth="md">
            <Grid container direction="row"
              justifyContent="space-between"
              alignItems="center" marginBottom={2} >
              <Grid item >
              </Grid>
              <Grid item >
                <Button variant="contained" onClick={() => setOpen(true)} >
                  <AddIcon sx={{ fontSize: 18 }} />Add </Button>
              </Grid>
            </Grid>
          </Container>
          <Container maxWidth="md">
            <TableContainer component={Paper} >
              <Table padding="normal" aria-label="simple table" >
                <TableHead  >
                  <TableRow sx={{
              "& th": {
                color: "rgba(96, 96, 96)",
                backgroundColor: "#1976d2",
                color:"#ffffff"
              }
            }}> 
                    <TableCell align="left"><h6>ID</h6></TableCell>
                    <TableCell align="left"><h6>Country</h6></TableCell>
                    <TableCell align="left"><h6>Action</h6></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell align="left" component="th" scope="row" >
                        {row.key}
                      </TableCell>
                      <TableCell align="left">{row.country}</TableCell>
                      <TableCell align="left">
                        <IconButton onClick={() => deleteCountry(row.country)}>
                          <DeleteIcon fontSize="small" style={{ color: 'red' }}></DeleteIcon>
                        </IconButton>

                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>

              </Table>
            </TableContainer>
          </Container>
          <Dialog style={{ zIndex: 0 }} open={open} onClose={handleClose}>
            <DialogTitle> Add Country</DialogTitle>
            <DialogContent style={{ width: 500 }}>
              <DialogContentText style={{ marginBottom: 30 }}>
                Please type or select a country to add:
              </DialogContentText>
              <CountrySelect
                value={newAddedCountry}
                onChange={setNewAddedCountry}
              />
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={handleClose}>Cancel</Button>
              <Button variant="contained" onClick={() => addNewCountry()}>Add</Button>
            </DialogActions>
          </Dialog></Box>
        {
          openDelete &&
          <Dialog
            fullScreen={fullScreen}
            open={openDelete}
            onClose={handleDeleteClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              {"Are sure you want to delete country ?"}

            </DialogTitle>
            <DialogContent>
              <DialogContentText>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus variant="contained" onClick={handleDeleteClose}>
                Cancel
              </Button>
              <Button variant="contained" onClick={deleteCountryConfirmed} autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        }
      </Container>
    </>

  );
};
export default Countries;