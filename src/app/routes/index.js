
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from "react-redux";

const PrivateRoute = () => {
   // const auth = useSelector(store => store.saveLogin.userData);
   const auth = localStorage.getItem("token");

    return auth? <Outlet /> : <Navigate to="/login" />;
}
export default PrivateRoute;