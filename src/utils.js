import axios from "axios";

import { VISA_URL } from "./constant/constants";

export const authToken = JSON.parse(localStorage.getItem("token"));

export const getUserPermissionsData = async() => {
    const result = await axios.get(`${VISA_URL}/users/getAddUserFeilds`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });
        
      if (result?.data?.response == 'success') {
        return result?.data?.apiRes;
      }
      else {
        return null;
      }
}

export const getRole = async() => {
  const result = await axios.get(`${VISA_URL}/users/getAddUserFeilds`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });

    if (result?.data?.response == 'success') {
      return result?.data?.role;
    }
    else {
      return null;
    }
}