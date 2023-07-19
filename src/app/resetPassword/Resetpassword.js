import React, { useState,useEffect } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { VISA_URL } from "../../constant/constants";

// Material Responsive dialog imports

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// end

import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Box,
} from "@mui/material";
import { SettingsBackupRestoreRounded } from "@mui/icons-material";


export default function ResetPassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [dialogVisibility, setDialogVisibility] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [token,setToken] = useState('')


  const handlePassword = async (e) => {
    e.preventDefault();
console.log(token);
    if (newPassword != confirmPassword) {
      alert('Password and confirm password do not match');
      return;
    }

    try {
      const response = await fetch(`${VISA_URL}/users/passwordReset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      const data = await response.json();
      if (data?.response == 'success') {
        navigate('/');
      }
      else {
        setDialogVisibility(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));

setToken(token)

  }, []);

  const handleClickOldPassword = () => setShowOldPassword(!showOldPassword);
  const handleMouseOldPassword = () => setShowOldPassword(!showOldPassword);
  const handleClickNewPassword = () => setShowNewPassword(!showNewPassword);
  const handleMouseNewPassword = () => setShowNewPassword(!showNewPassword);
  const handleClickConfirmPassword = () => setShowNewPassword(!showConfirmPassword);
  const handleMouseConfirmPassword = () => setShowNewPassword(!showConfirmPassword);

  return (
    <Container component="main" maxWidth="xs" >
      <Dialog
        fullScreen={fullScreen}
        open={dialogVisibility}
        onClose={() => setDialogVisibility(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Please enter correct details"}

        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="contained" onClick={() => setDialogVisibility(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Box
        sx={{
          pt: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <Box component="form" onSubmit={handlePassword} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickOldPassword}
                    onMouseDown={handleMouseOldPassword}
                  >
                    <VisibilityOutlinedIcon />
                  </IconButton>
                </InputAdornment>
              ),
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon
                    sx={{ fontSize: 30, color: "black" }}
                  />
                </InputAdornment>
              ),

            }}
            placeholder="Old Password"
            name="password"
            type={showOldPassword ? "password" : "text"}
            id="password"
            autoComplete="current-password"
            // value={oldPassword}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickNewPassword}
                    onMouseDown={handleMouseNewPassword}
                  >
                    <VisibilityOutlinedIcon />
                  </IconButton>
                </InputAdornment>
              ),
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon
                    sx={{ fontSize: 30, color: "black" }}
                  />
                </InputAdornment>
              ),

            }}
            placeholder="New Password"
            name="password"
            type={showNewPassword ? "password" : "text"}
            id="password"
            autoComplete="current-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickConfirmPassword}
                    onMouseDown={() => handleMouseConfirmPassword}
                  >
                    <VisibilityOutlinedIcon />
                  </IconButton>
                </InputAdornment>
              ),
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon
                    sx={{ fontSize: 30, color: "black" }}
                  />
                </InputAdornment>
              ),

            }}
            placeholder="Confirm New Password"
            name="password"
            type={showConfirmPassword ? "password" : "text"}
            id="password"
            autoComplete="current-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Grid container>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
