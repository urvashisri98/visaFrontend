import * as React from 'react';
import {useState} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { forwardRef, useImperativeHandle } from "react";
import { useRef } from 'react';
import moment from "moment";
import { Slide } from '@mui/material';

const  AlignItemsList = forwardRef((props, ref) => {

  const [comments, setComments] = useState([]);
  useImperativeHandle(ref, () => ({
    showComments(data) {
      console.log(data)
      setComments(data);
    },
  }));
const today = Date.now();

  const arrayDataItems = comments.map(item => 
    <>
    <Divider  component="li" />
    <ListItem  key={item._id} alignItems="flex-start">    
        <ListItemText 
          primary={item.name + " :"+moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {item.text}
              </Typography>
             
            </React.Fragment>
          }
        />
        
      </ListItem> 
      </>
  )

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper',  marginTop:5}}>
      {arrayDataItems}    
      <Divider  component="li" />
    </List>
  );

});
export default AlignItemsList;