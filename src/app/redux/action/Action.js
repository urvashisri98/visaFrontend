// import axios from "axios"; use for api
import { EDUCATION_WORK, PERSONAL_DETAIL, SUBMIT_APPLICATION, UPLOAD_IMAGE, UPLOAD_IMAGES, VISA_DETAIL,LOGIN, LOGOUT, USERINFO} from "../constants/Constant";

export const savePersonalDetail = (data) => {
  return {
    type: PERSONAL_DETAIL,
    payload: data,
  };
};
export const saveEducationWorkDetail = (data) => {
  return {
    type: EDUCATION_WORK,
    payload: data,
  };
};

export const saveVisaDetail = (data) => {
  return {
    type: VISA_DETAIL,
    payload: data,
  };
};

export const saveSubmitDetail = (data) => {
  return {
    type: SUBMIT_APPLICATION,
    payload: data,
  };
};

export const saveUploadImages = (data) => {
  return {
    type: UPLOAD_IMAGES,
    payload: data,
  };
};

export const saveUserInfo = (data) => {
  return {
    type: USERINFO,
    payload: data,
  };
};


export const saveLoggedin = (data) => {
  return {
    type: LOGIN,
    payload: data,
  };
};

export const logOut = () => {
  return {
    type: LOGOUT,
  };
};