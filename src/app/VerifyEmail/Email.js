import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import React from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import "./Email.css";
import { InputAdornment, TextField } from "@mui/material";
const Email = () => {
  return (
    <div className="home-container">
      <Box
        // }}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            
            width: 1080,
            height: 500,
            borderRadius:8
          },
        }}
      >
        <Paper elevation={3}>
          <div className="Login_page">
            <div className="Login_image">
              <h1>Heading</h1>
              <div>digital system limited</div>
              <div className="Image_Size">
              </div>
              <div className="App_For_Everything">The App for EveryThing</div>
              <div className="Fatest_way_to_pay_your _bills">
                <p>Fatest Way to way your bills</p>
              </div>
            </div>

            <div className="Login_Input_Feilds">
              <div className="Email">
                <h2>Please enter your email</h2>
              </div>
             
              <div className="VerifyEmail_Input_Feild">
                <TextField
                  id="standard-search"
                  size="normal"
                  margin="normal"
                  required
                  fullWidth
                  style={{ background: "white" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutlineIcon
                          sx={{ fontSize: 30, color: "black" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Enter Email Id"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  //   value={email}
                  //   onChange={(e) => setEmail(e.target.value)}
                />
              </div>
             
          <div className="Email_button">
          <h3 className="Button">Submit</h3>
          </div>
            </div>
          </div>
        </Paper>
      </Box>
    </div>
  );
};

export default Email;
