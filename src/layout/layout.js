import { Outlet } from "react-router-dom";
import Sidebar from "../app/sidemenu/sideMenu";
import "../App.css"
import PrimarySearchAppBar from "../app/appBar/PrimarySearchAppBar";
const Layout = () => {
  return (
    <>
      {/* <header className="App-header"></header> */}
      <PrimarySearchAppBar/>
      <Outlet />
      {/* <Sidebar/> */}
    </>
  );
};

export default Layout;