import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { getUserPermissionsData, getRole } from '../../utils';
import { saveLoggedin } from "../redux/action/Action";
import logo from '../static/images/ocean.jpeg'

// Material Responsive dialog imports

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { fetchToken, onMessageListener } from '../notification/firebase';

// end

import API from '../api';
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Card
} from "@mui/material";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userPermissions, setUserPermissions] = useState({});
  const [userRole, setUserRole] = useState('');
  const [showAlert, setShowAlert] = React.useState(false);
 
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const dispatch = useDispatch();
  const [fcmToken, setFcmToken] = useState('');


  useEffect(() => {
    getUserPermissions();
    getRoleData();
    requestPermission();

  }, []);

  //getToken(setTokenFound);

  // inside the jsx being returned:
  // {isTokenFound && 
  //  Notification permission enabled 👍🏻 
  // }
  // {!isTokenFound && 
  //  Need notification permission ❗️ 
  // }

  const getUserPermissions = async () => {
    var userPermissionsData = await getUserPermissionsData();
    if (userPermissionsData !== null) {
      setUserPermissions(userPermissionsData);
    }
    else {
      setUserPermissions({});
    }
  }

  const getRoleData = async () => {
    var role = await getRole();
    if (role !== null) {
      setUserRole(role);
    }
    else {
      setUserRole('');
    }
  }

  const handleLogin = async (e) => {
    API.post('users/login', JSON.stringify({ email, password, fcmToken }), { headers: { 'Content-Type': 'application/json' } })
      .then(res => {
        console.log('res', res);
        
          if (res.data.response == "success") {
            
            localStorage.setItem("token", JSON.stringify(res.data.data.token));
            localStorage.setItem("userData", JSON.stringify(res.data.data));
            console.log('token', JSON.stringify(res.data.data.token));

            if (res?.data?.data?.newUser) {
              navigate("/resetPassword");
            }else{
              
              dispatch(saveLoggedin(res.data.data));
              navigate("/");

            }
         
          } else {
            setShowAlert(true);
          }
        

      })
  };

  function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then(function(permission)  {
      console.log('permission for token ==> ', permission);
      if (permission === 'granted') { 
        console.log('Fetch token ==> ', fetchToken);
       fetchToken(setFcmToken);
        console.log('Notification permission granted.');
      }
    })}


  
  return (
    <Container component="main" maxWidth="xs">
      <Dialog
        fullScreen={fullScreen}
        open={showAlert}
        onClose={() => setShowAlert(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Please enter correct credentials"}

        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="contained" onClick={() => setShowAlert(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      < Card>
        <Grid containerm p={5}>
        <Grid item direction="row">
            <img src={logo} width={100} height={100} alt="Logo" />;
          </Grid>
          <Grid item>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              placeholder="Enter Email Id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
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
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
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
            placeholder="Enter Password"
            name="password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Grid container>
            <Grid item xs>
              {
                userPermissions?.allowResetPassword == true && (
                  <Link href="/resetPassword" variant="body2">
                    Reset password?
                  </Link>
                )
              }
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </  Card>

    </Container>
  );
}
