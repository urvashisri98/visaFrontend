import { Box, Paper } from "@mui/material";
import React from "react";
import Avatar from "@mui/material/Avatar";
import user from "../static/images/user.jpeg"
import "./ChatScreen.css";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
const ChatScreen = () => {
  return (
    <div className="Chat_Screen_container">
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            width: 1100,
            height: 700,
            borderRadius: 8,
          },
        }}
      >
        <Paper elevation={3}>
            <div className="ChatScreen_Container">

            </div>
        </Paper>
      </Box>
    </div>
  );
};

export default ChatScreen;
