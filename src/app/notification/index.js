import * as React from 'react';
import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { fetchToken, onMessageListener } from './firebase';
import { forwardRef, useRef, useImperativeHandle } from "react";
import Box from '@mui/material/Box';
import { FixedSizeList } from 'react-window';
import styles from './notifications.css'
export default function Notifications({ notif }) {

  const [show, setShow] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (notif) {
      console.log('Notifications', notif);
      setNotifications(notif)
    }

  }, [notif]);

  

  return (
   <div className={styles.container} >
     
      <List sx={{
        width: '100%',
        maxWidth: 560,
        bgcolor: '#ECF0F1',
        position: "relative",
        textAlign: 'right',
        alignSelf: 'flex-end',
        zIndex: 900,
        top: 0,
        right: 20,
        borderRadius:5,
        overflow: 'auto',
        maxHeight: 225
      }}>
        {
          notifications.map((row) => {
            return (<ListItem alignItems="flex-start">
              {console.log('Notification row ==> ', row)}
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary= {row?.notification?.title + ':'} 
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {row?.notification?.body}
                    </Typography>
                    
                  </React.Fragment>
                }
              />
            < Divider variant = "inset" component = "li" />
            </ListItem>)
          })
        }
      </List>
    </div>
  )
}
