import {createAction} from 'redux-actions';

const types = {
  
  CHANGE_ROUTE: 'CHANGE_ROUTE',
  
  // *** product editor
  GET_PRODUCT_DATA: 'GET_PRODUCT_DATA',
  PRODUCT_DATA_LOADED: 'PRODUCT_DATA_LOADED',
  DESIGN_SELECTED: 'DESIGN_SELECTED',
  DB_UPDATE_DESIGN: 'DB_UPDATE_DESIGN',
  DB_UPDATE_DESIGN_RESPONSE: 'DB_UPDATE_DESIGN_RESPONSE',
  DB_UPLOAD_IMAGES: 'DB_UPLOAD_IMAGES',
  DB_UPLOAD_IMAGES_RESPONSE: 'DB_UPLOAD_IMAGES_RESPONSE',
  
  DB_CREATE_DESIGN: 'DB_CREATE_DESIGN',
  DB_CREATE_DESIGN_RESPONSE: 'DB_CREATE_DESIGN_RESPONSE',
  
  DB_DELETE_DESIGN: 'DB_DELETE_DESIGN',
  DB_DELETE_DESIGN_RESPONSE: 'DB_DELETE_DESIGN_RESPONSE',
  
  // *** user editor
  GET_USER_DATA: 'GET_USER_DATA',
  USER_DATA_LOADED: 'USER_DATA_LOADED',
  USER_SELECTED: 'USER_SELECTED',
  DB_UPDATE_USER: 'DB_UPDATE_USER',
  DB_UPDATE_USER_RESPONSE: 'DB_UPDATE_USER_RESPONSE',
  
  DB_CREATE_USER: 'DB_CREATE_USER',
  DB_CREATE_USER_RESPONSE: 'DB_CREATE_USER_RESPONSE',
  
  DB_DELETE_USER: 'DB_DELETE_USER',
  DB_DELETE_USER_RESPONSE: 'DB_DELETE_USER_RESPONSE',
  
  // *** sundries editor
  GET_SUNDRIES_DATA: 'GET_SUNDRIES_DATA',
  SUNDRIES_DATA_LOADED: 'SUNDRIES_DATA_LOADED',
  
  DB_CREATE_SUNDRIES: 'DB_CREATE_SUNDRIES',
  DB_CREATE_SUNDRIES_RESPONSE: 'DB_CREATE_SUNDRIES_RESPONSE',
  
  DB_DELETE_SUNDRIES: 'DB_DELETE_SUNDRIES',
  DB_DELETE_SUNDRIES_RESPONSE: 'DB_DELETE_SUNDRIES_RESPONSE',
};

const actions = {
  
  changeRoute: createAction(types.CHANGE_ROUTE),
  
  // *** product
  getProductData: createAction(types.GET_PRODUCT_DATA),
  productDataLoaded: createAction(types.PRODUCT_DATA_LOADED),
  designSelected: createAction(types.DESIGN_SELECTED),
  dbUpdateDesign: createAction(types.DB_UPDATE_DESIGN),
  dbUpdateDesignResponse: createAction(types.DB_UPDATE_DESIGN_RESPONSE),
  dbUploadImages: createAction(types.DB_UPLOAD_IMAGES),
  dbUploadImagesResponse: createAction(types.DB_UPLOAD_IMAGES_RESPONSE),
  
  dbCreateDesign: createAction(types.DB_CREATE_DESIGN),
  dbCreateDesignResponse: createAction(types.DB_CREATE_DESIGN_RESPONSE),
  
  dbDeleteDesign: createAction(types.DB_DELETE_DESIGN),
  dbDeleteDesignResponse: createAction(types.DB_DELETE_DESIGN_RESPONSE),
  
  // *** user
  getUserData: createAction(types.GET_USER_DATA),
  userDataLoaded: createAction(types.USER_DATA_LOADED),
  userSelected: createAction(types.USER_SELECTED),
  dbUpdateUser: createAction(types.DB_UPDATE_USER),
  dbUpdateUserResponse: createAction(types.DB_UPDATE_USER_RESPONSE),
  
  dbCreateUser: createAction(types.DB_CREATE_USER),
  dbCreateUserResponse: createAction(types.DB_CREATE_USER_RESPONSE),
  
  dbDeleteUser: createAction(types.DB_DELETE_USER),
  dbDeleteUserResponse: createAction(types.DB_DELETE_USER_RESPONSE),
  
  // *** sundries
  getSundriesData: createAction(types.GET_SUNDRIES_DATA),
  sundriesDataLoaded: createAction(types.SUNDRIES_DATA_LOADED),
  
  dbCreateSundries: createAction(types.DB_CREATE_SUNDRIES),
  dbCreateSundriesResponse: createAction(types.DB_CREATE_SUNDRIES_RESPONSE),
  
  dbDeleteSundries: createAction(types.DB_DELETE_SUNDRIES),
  dbDeleteSundriesResponse: createAction(types.DB_DELETE_SUNDRIES_RESPONSE),
}

export default actions;
export {types};
