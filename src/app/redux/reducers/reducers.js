import { EDUCATION_WORK, PERSONAL_DETAIL, SUBMIT_APPLICATION, UPLOAD_IMAGES, VISA_DETAIL,LOGIN, LOGOUT, USERINFO } from "../constants/Constant";

const initialState={
    personalDetail: {},
    educationWorkDetail:{},
    visaDetail:{},
    submitDetail:{},
    uploadImages:{},
    userData:'',
    userInfo:{}
}

export const savePersonalDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case PERSONAL_DETAIL:
      return {
        ...state,
        personalDetail: action.payload,
      };
      default:
      return state
  };
};

export const saveUserInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERINFO:
      return {
        ...state,
        userInfo: action.payload,
      };
      default:
      return state
  };
};
export const saveEducationWorkReducer = (state = initialState, action) => {
    switch (action.type) {
      case EDUCATION_WORK:
        return {
          ...state,
          educationWorkDetail: action.payload,
        };
        default:
        return state
    }
  };
  
export const saveVisaDetailReducer = (state = initialState, action) => {
    switch (action.type) {
      case VISA_DETAIL:
        return {
          ...state,
          visaDetail: action.payload,
        };
        default:
        return state
    }
  };
  
  export const saveSubmitDetailReducer = (state = initialState, action) => {
    switch (action.type) {
      case SUBMIT_APPLICATION:
        return {
          ...state,
          submitDetail: action.payload,
        };
        default:
        return state
    }
  };

  export const saveUploadImagesReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPLOAD_IMAGES:
        return {
          ...state,
          uploadImages: action.payload,
        };
        default:
        return state
    }
  };

  export const saveLogin = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN:
        return {
          ...state,
          userData: action.payload,
        };
        default:
        return state
    }
  };

  export const logOut = (state = initialState, action) => {
    switch (action.type) {
      case LOGOUT:
        return {
          ...state,
          userData: null,
        };
        default:
        return state
    }
  };