import { Alert } from '@mui/material';
import axios from 'axios';
import { VISA_URL } from '../../constant/constants';
import { useNavigate } from "react-router-dom";


 export default axios.create({
   baseURL: VISA_URL 
 });




//Defaults will be combined with the instance
// axios.defaults.baseURL = VISA_URL;

// //Create Axios Instance
// const axiosInstance = axios.create({
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json; charset=UTF-8'
//     }
// });

//Add interceptors to instance
axios.interceptors.response.use(
    response => response,
    error => {
        if (!error.response) {
          console.log("=======================");
          console.log("=========ERROR 1==============");
          console.log("=======================");

        }
        else if (error.response.status === 401) {
          return window.location.href = '/login'
          console.log("=======================");
          console.log("=========ERROR 2==============");
          console.log("=======================");
        }
        return error;
    });

