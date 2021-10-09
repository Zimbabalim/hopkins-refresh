import {createAction} from 'redux-actions';

const types = {
  TEST_ACTION: 'TEST_ACTION',
  GET_PRODUCT_DATA: 'GET_PRODUCT_DATA',
  PRODUCT_DATA_LOADED: 'PRODUCT_DATA_LOADED',
  DESIGN_SELECTED: 'DESIGN_SELECTED',
  
  DB_UPDATE_DESIGN: 'DB_UPDATE_DESIGN',
  DB_UPDATE_DESIGN_RESPONSE: 'DB_UPDATE_DESIGN_RESPONSE',
  
  DB_UPLOAD_IMAGES: 'DB_UPLOAD_IMAGES',
  DB_UPLOAD_IMAGES_RESPONSE: 'DB_UPLOAD_IMAGES_RESPONSE',
};

const actions = {
  testAction: createAction(types.TEST_ACTION),
  getProductData: createAction(types.GET_PRODUCT_DATA),
  productDataLoaded: createAction(types.PRODUCT_DATA_LOADED),
  designSelected: createAction(types.DESIGN_SELECTED),
  dbUpdateDesign: createAction(types.DB_UPDATE_DESIGN),
  dbUpdateDesignResponse: createAction(types.DB_UPDATE_DESIGN_RESPONSE),
  dbUploadImages: createAction(types.DB_UPLOAD_IMAGES),
  dbUploadImagesResponse: createAction(types.DB_UPLOAD_IMAGES_RESPONSE),
}

export default actions;
export {types};
