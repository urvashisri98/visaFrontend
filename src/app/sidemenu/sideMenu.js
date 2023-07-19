import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import { forwardRef, useRef, useImperativeHandle } from "react";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import AirplaneTicketRoundedIcon from "@mui/icons-material/AirplaneTicketRounded";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import LanguageIcon from "@mui/icons-material/Language";
import { useSelector } from "react-redux";
import "./sidemenu.css";
import { AppBar, Grid, Typography } from "@mui/material";
import TocIcon from "@mui/icons-material/Toc";
import logo from "../../images/logo.png"
import dashboard from "../../images/Dashboard.png"
import CreateUser from "../../images/profile-add.png"
import User from "../../images/user.png"
import Global from "../../images/global.svg"
import Channel from "../../images/unselect.svg"
import Flag from "../../images/flag.png"
import Building from "../../images/buliding.png"
import Enquiry from "../../images/transaction-minus.png";
import GroupIcon from '@mui/icons-material/Group';
const TemporaryDrawer = forwardRef((props, ref) => {
  // let userData = useSelector((state) => state?.saveLogin);
  const userData = JSON.parse(localStorage.getItem("userData"));
  React.useEffect(() => {
    console.log('userData?.permission', userData);
  }, []);
  useImperativeHandle(ref, () => ({
    showAlert() {
      setState({ ...state, ["left"]: true });
    },
  }));
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const routeToLink = (link) => { };
  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {/* <AppBar position="static">
            <div className='Logo_Icon'>
             <div className='Icon'>
             <DashboardRoundedIcon sx={{fontSize:30}} />
             </div>
             <Typography variant="h6" component="div" sx={{ mt:2 ,fontSize:24,fontWeight:600}}>
            Visa-Portal
          </Typography>
            </div>
             </AppBar> */}
      <List sx={{p:0}} >
        <div className="Sidebar_menu">
          {/* <div className='Dashboard'>
                            <p>DASHBOARDS</p>
                        </div> */}
          <Grid sx={{ pl: 9, color: "white", display: "flex", gap: 1, alignItems: 'center' }}>
            <Grid sx={{ fontSize: 10 }}>
              <img src={logo} alt="" />
            </Grid>
            <h2>CRM</h2>
          </Grid>
          {(userData?.adminType  == 'SUPERADMIN') && (
            <ListItem disablePadding sx={{ p: 1 }}>
              <ListItemButton href="/">
                <ListItemIcon>
                  {/* <DashboardRoundedIcon sx={{ ml: 2,color:"white" }} />
                    */}
                  <img src={dashboard} alt="" sx={{ ml: 2, color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={"Dashboard"} sx={{ color: "white" }} />
              </ListItemButton>
            </ListItem>)
          }
          {/* <div className='Dashboard'>
                            <p>USERS(ADMIN)</p>
                        </div> */}
          {/* <ListItem disablePadding sx={{p:1}}>
            <ListItemButton href="/user">
              <ListItemIcon>
                 <img src={CreateUser} alt="" sx={{ ml: 2,color:"white" }}/>
              </ListItemIcon>
              <ListItemText primary={"Create User"} sx={{color:"white" }}/>
            </ListItemButton>
          </ListItem> */}
                    

          {console.log(userData?.adminType)}
          {
            userData?.adminType == 'SUPERADMIN' && (
              <ListItem disablePadding sx={{ p: 1 }}>
                <ListItemButton href="/usersList">
                  <ListItemIcon>
                    <img src={User} alt="" sx={{ ml: 2, color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary={"User Management"} sx={{ color: "white" }} />
                </ListItemButton>
              </ListItem>)
          }
   
          {( userData?.adminType == 'SUPERADMIN' ||  userData?.adminType  == 'ADMIN'  ||userData?.adminType  == 'SUBADMIN') && (
            <ListItem disablePadding sx={{ p: 1 }}>
              {/* <ListItemButton href="/VisaEnquiry"> */}
              <ListItemButton href="/EnquiriesList">
                <ListItemIcon>
                  <img src={Global} alt="" sx={{ ml: 2, color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={"Visa Enquiry"} sx={{ color: "white" }} />
              </ListItemButton>
            </ListItem>)}
          
          <ListItem disablePadding sx={{ p: 1 }}>
            <ListItemButton href="/Countries">
              <ListItemIcon>
                <img src={Flag} alt="" sx={{ ml: 2, color: "white" }} />
              </ListItemIcon>
              <ListItemText primary={"All Countries"} sx={{ color: "white" }} />
            </ListItemButton>
          </ListItem>
          
          <ListItem disablePadding sx={{ p: 1 }}>
            <ListItemButton href="/addUniversity">
              <ListItemIcon>
                <img src={Building} alt="" sx={{ ml: 2, color: "white" }} />
              </ListItemIcon>
              <ListItemText primary={"All Universities"} sx={{ color: "white" }} />
            </ListItemButton>
          </ListItem>
         
           
              {
            userData?.adminType == 'SUPERADMIN' && (
          <ListItem disablePadding sx={{ p: 1 }}>
            <ListItemButton href="/channel">
              <ListItemIcon>
                <img src={Channel} alt="" sx={{ ml: 2, color: "white" }} />
              </ListItemIcon>
              <ListItemText primary={" Channels"} sx={{ color: "white" }} />
            </ListItemButton>
          </ListItem>)}

         
          {/* <ListItem disablePadding sx={{p:1}}>
          <ListItemButton href="/EnquiriesList">
            <ListItemIcon>
              <img src={Enquiry} alt="" sx={{ ml: 2,color:"white" }}/>
            </ListItemIcon>
            <ListItemText primary={"Enquiries List"} sx={{color:"white" }} />
          </ListItemButton>
        </ListItem> */}
        </div>
      </List>
    </Box>
  );
  return (
    <div>
      <Drawer
        anchor={"left"}
        open={state["left"]}
        // variant="persistent"
        onClose={toggleDrawer("left", false)}
        sx={{
          width: "drawerWidth",
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: "drawerWidth",
            boxSizing: 'border-box',
          },
        }}
      >
        {list("left")}
      </Drawer>
    </div>
  );
});
export default TemporaryDrawer;