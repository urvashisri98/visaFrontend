import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  saveEducationWorkReducer,
  savePersonalDetailReducer,
  saveSubmitDetailReducer,
  saveUploadImagesReducer,
  saveVisaDetailReducer,
  saveLogin,
  logOut,
  saveUserInfoReducer
} from "./reducers/reducers";
import { saveUserInfo } from "./action/Action";
// import { userLoginReducer } from "./reducers/ClientReducer";
// import {
//   emailVerifyReducer,
//   setClientIdReducer,
//   setEmailReducer,
// } from "./reducers/EmailVerifyReducer";
// import { setToggleReducer } from "./reducers/SidebarReducer";
// import {
//   categoryAddListReducer,
//   categoryAddReducer,
//   productAddReducer,
//   setCategoryIdReducer,
// } from "./reducers/AddProductReducer";

// import { setAddressId } from "./actions/ProductActions";

// const userInfoFromStorage = localStorage.getItem("userInfo")
//   ? JSON.parse(localStorage.getItem("userInfo"))
//   : null;

// const initialState = {
//   userLogin: { userInfo: userInfoFromStorage },
// };

const rootReducers = combineReducers({
  // addProduct: productAddReducer,
  // showCategory: categoryAddListReducer,
  // setCategory: categoryAddReducer,
  // setToggle: setToggleReducer,
  // verifyEmail: emailVerifyReducer,
  // userLogin: userLoginReducer,
  // setEmailId: setEmailReducer,
  // setClientId : setClientIdReducer,
  // setCategoryId :setCategoryIdReducer,
  savePersonalDetails: savePersonalDetailReducer,
  saveVisaDetails: saveVisaDetailReducer,
  saveSubmitDetails:saveSubmitDetailReducer,
  saveEducationWorkDetails:saveEducationWorkReducer,
  saveUploadedImages:saveUploadImagesReducer,
  saveLogin:saveLogin,
  logOut:logOut,
  saveUserInfo:saveUserInfoReducer

});
const middleware = [thunk];

const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
