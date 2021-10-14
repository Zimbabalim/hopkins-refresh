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
  
  // *** user editor
  GET_USER_DATA: 'GET_USER_DATA',
  USER_DATA_LOADED: 'USER_DATA_LOADED',
  USER_SELECTED: 'USER_SELECTED',
  DB_UPDATE_USER: 'DB_UPDATE_USER',
  DB_UPDATE_USER_RESPONSE: 'DB_UPDATE_USER_RESPONSE',
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
  
  // *** editor
  getUserData: createAction(types.GET_USER_DATA),
  userDataLoaded: createAction(types.USER_DATA_LOADED),
  userSelected: createAction(types.USER_SELECTED),
  dbUpdateUser: createAction(types.DB_UPDATE_USER),
  dbUpdateUserResponse: createAction(types.DB_UPDATE_USER_RESPONSE),
}

export default actions;
export {types};
