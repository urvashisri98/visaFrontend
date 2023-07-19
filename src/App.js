// import logo from './logo.svg';
import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";
import Background from "./app/login/Background";
// import Login from "./app/login/Login";
import Email from "./app/VerifyEmail/Email";
import BackgroundResetPassword from "./app/resetPassword/Background.js";
import Resetpassword from "./app/resetPassword/Resetpassword";
// import Sidebar from "./app/sidemenu/sideMenu";
import Dashboard from "./app/dashboard/dashboard";
import User from "./app/user/user";
import UsersList from "./app/UsersList/UsersList";
import Leads from "./app/leads/leads";
import AddLeads from "./app/leads/addLeads";
import AddUniversity from "./app/universities/addUniversity";
import ChatScreen from "./app/ chatscreen/ChatScreen";
import AddEnquiry from "./app/enquiry/addEnquiry";
import PrimarySearchAppBar from "./app/appBar/PrimarySearchAppBar";
import VisaEnquiry from "./app/visaenquiry/VisaEnquiry";
import Education from "./app/visaenquiry/Education";
import VisaDetails from "./app/visaenquiry/VisaDetails";
import Submitapplication from "./app/visaenquiry/Submitapplication";
import Countries from "./app/countries/Countries";
import { EnquiriesList } from "./app/visaenquiry/EnquiriesList";
import { EnquiryDetails } from "./app/visaenquiry/EnquiryDetails";
import UploadImages from "./app/visaenquiry/UploadImages";
import { PreviewEdit } from "./app/visaenquiry/EnquiryDetails/PreviewEdit";
import { Viewenquirylist } from "./app/visaenquiry/EnquiryDetails/Viewenquirylist";
import PrivateRoute from './app/routes/index.js'
import UserPackage from "./app/userPackage/UserPackage";
import PersonalEdit from './app/edit/personal'
import DocumentEdit from './app/edit/documents';
import EducationEdit from "./app/edit/educatioin";
import VisaEdit from "./app/edit/visa";
import SubmitEdit from "./app/edit/submit";
import FreezedApplications from "./app/dashboard/freezedApplications";
import Channel from './app/channel/index'

const App = () => {
  return (
    <div className="App">
      <Routes>
      <Route path="/login" element={<Background />} />
      <Route exact path='/' element={<PrivateRoute />}>
        <Route element={<div><PrimarySearchAppBar></PrimarySearchAppBar><Outlet /></div>}>    
            <Route path="/" element={<Dashboard />} />
            <Route path="/user" element={<User />} />
            <Route path="/usersList" element={<UsersList />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/addLeads" element={<AddLeads />} />
            <Route path="/addUniversity" element={<AddUniversity />} />
            <Route path="/addEnquiry" element={<AddEnquiry />} />
            <Route path="/EnquiriesList" element={<EnquiriesList />} />
            <Route path="/EnquiryDetails" element={<EnquiryDetails />} />
            <Route path="/Chatscreen" element={<ChatScreen />} />
            <Route path="/UploadImages" element={<UploadImages />} />
            <Route path="/Email" element={<Email />} />
            <Route path="/VisaEnquiry" element={<VisaEnquiry />} />
            <Route path="/Education" element={<Education />} />
            <Route path="/VisaDetails" element={<VisaDetails />} />
            <Route path="/Submitapplication" element={<Submitapplication />} />
            <Route path="/Countries" element={<Countries />} />
            <Route path="/PreviewEdit" element={<PreviewEdit />} />
            <Route path="/Viewenquirylist" element={<Viewenquirylist />} />
            <Route path="/Email" element={<Email />} />
            <Route path="/UserPackage" element={<UserPackage />} />
            <Route path="/personalEdit" element={<PersonalEdit/>}/>
            <Route path="/documentEdit" element={<DocumentEdit/>}/>
            <Route path="/visaedit" element={<VisaEdit/>}/>
            <Route path="/educationEdit" element={<EducationEdit/>}/>
            <Route path= "/visaEdit" element={<VisaEdit/>}/>
            <Route path= "/submitEdit" element={<SubmitEdit/>}/>
            <Route path="/freezedApplications" element={<FreezedApplications/>}/>
            <Route path="/channel" element={<Channel/>}/>
          </Route>
        </Route>
        {/* <Route path="/ResetPassword" element={<Resetpassword />} /> */}
        <Route path="/ResetPassword" element={<Resetpassword />} />

        <Route path="/ResetPassword" element={<BackgroundResetPassword />} />
        {/* <Route path="/ResetPassword" element={<Resetpassword />} /> */}
        <Route path="/EnquiryDetails" element={<EnquiryDetails />} />

      </Routes>
    </div>
  );
};
export default App;

