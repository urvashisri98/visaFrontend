import React, { useState } from "react";
import Box from "@mui/material/Box";
import {
    Link,
    TextField,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Button,
    FormHelperText, SelectChangeEvent
} from "@mui/material";
import Container from "@mui/material/Container";
import Grid from '@mui/material/Unstable_Grid2';
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import styles from './VisaEnquiry.module.css';
import Steppers from './Stepper';

const VisaEnquiryEducation = () => {
    const [salutation, setSalutation] = React.useState('Salutation');


    const handleChange = (event: SelectChangeEvent) => {
        setSalutation(event.target.value);
    };

    const styles = {
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            width: 300,
            margin: 100,
        },
        //style for font size
        resize: {
            fontSize: 50
        },
    }

    return (
        <Container maxWidth="md" className={styles.containerFix} >
            <Box className={styles.breadcrumFix}>
                <Breadcrumbs maxItems={2} aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Home
                    </Link>

                    <Typography color="text.primary">Belts</Typography>
                </Breadcrumbs>
            </Box>
            <Box className={styles.stepper}>
                <Steppers></Steppers>
            </Box>
            <Box sx={{ p: 2, border: '1px dashed grey' }}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6} p={1}>
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel id="demo-select-small">Mr/Mrs</InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={age}
                                label="Mr/Mrs"
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} p={1}>

                        <TextField
                            size="small"
                            required
                            id="outlined-required"
                            label="Name"
                            inputProps={{
                                style: { fontSize: 5 }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} p={1}>
                        <TextField
                            required
                            size="small"
                            id="outlined-required"
                            label="Father Name"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} p={1}>
                        <TextField
                            required
                            size="small"
                            id="outlined-required"
                            label="Address" />
                    </Grid>
                    <Grid item xs={12} sm={6} p={1}>
                        <TextField
                            required
                            size="small"
                            id="outlined-required"
                            label="Mobile Number" />
                    </Grid>
                    <Grid item xs={12} sm={6} p={1}>
                        <TextField
                            required
                            size="small"
                            id="outlined-required"
                            label="Email" />
                    </Grid>
                    <Grid item xs={12} sm={6} p={1}>
                        <TextField
                            required
                            size="small"
                            id="outlined-required"
                            label="Aadhar" />
                    </Grid>
                    <Grid item xs={12} sm={6} p={1}>
                        <TextField
                            required
                            size="small"
                            id="outlined-required"
                            label="Passport" />
                    </Grid>
                    <Grid item xs={12} sm={6} p={1}>
                        <TextField
                            required
                            size="small"
                            id="outlined-required"
                            label="Pancard" />
                    </Grid>
                    <Grid item xs={12} sm={6} p={1}>
                        <TextField
                            required
                            size="small"
                            id="outlined-required"
                            label="Date Of Birth" />
                    </Grid>
                    <Grid item xs={12} sm={6} p={1}>
                        <FormControl sx={{ m: 1, minWidth: 198 }} size="small">
                            <InputLabel id="demo-simple-select-helper-label">Salutation</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="outlined-required"
                                value={'VisaType'}
                                label="Salutation"
                                onChange={handleChange}
                            >
                                <MenuItem value={'Mr'}>Type</MenuItem>
                                <MenuItem value={'Mrs'}>Mrs</MenuItem>
                                <MenuItem value={'Miss'}>Miss</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} p={1}>
                    </Grid>
                    <Grid item xs={12} sm={12} p={1}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6} p={1}>
                                <Button variant="outlined">Cancel</Button>
                            </Grid>
                            <Grid item xs={12} sm={6} p={1}>
                                <Button variant="outlined">Next</Button>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </Box>
        </Container>

    );
};
export default VisaEnquiryEducation;
