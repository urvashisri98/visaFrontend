import React, { useEffect, useState } from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container, LinearProgress, Breadcrumbs, Box, Link, Typography, IconButton, Alert } from '@mui/material';
import Grid from '@mui/material/Grid';
import ImageIcon from '@mui/icons-material/Image';
import { VISA_URL } from "../../constant/constants";
import axios from "axios";
import { useTheme } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';

window.Buffer = window.Buffer || require("buffer").Buffer;
const token = JSON.parse(localStorage.getItem("token"));

const FreezedApplications = () => {

    const [loader, setLoader] = React.useState(false);
    const [universities, setUniversities] = useState([]);
    const theme = useTheme();

    useEffect(() => {
        loadUniversities();
    }, []);

    const loadUniversities = async (e) => {
        const result = await axios.get(
            `${VISA_URL}/users/lastUpdateApplications`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
      
          console.log(result?.data?.dbRes);
          if (result?.data?.dbRes.length !== 0) {
            setUniversities(result?.data?.dbRes);
          }
    };

    return (
        <Container maxWidth="lg">
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
                            <Typography color="text.primary">Freezed Applications</Typography>
                        </Breadcrumbs>
                    </Box>
                </Grid>
            </Grid>

            <Container maxWidth="md">
                <TableContainer component={Paper} >
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left"><h6>Name</h6></TableCell>
                                <TableCell align="left"><h6>Father Name</h6></TableCell>
                                <TableCell align="left"><h6>Application Status</h6></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {universities.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="left">{row.fatherName}</TableCell>
                                    <TableCell align="left">{row.applicationStatus}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Container>

    );
}

export default FreezedApplications;