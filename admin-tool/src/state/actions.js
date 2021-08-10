import {createAction} from 'redux-actions';

const types = {
  TEST_ACTION: 'TEST_ACTION',
  GET_PRODUCT_DATA: 'GET_PRODUCT_DATA',
  PRODUCT_DATA_LOADED: 'PRODUCT_DATA_LOADED',
  DESIGN_SELECTED: 'DESIGN_SELECTED',
};

const actions = {
  testAction: createAction(types.TEST_ACTION),
  getProductData: createAction(types.GET_PRODUCT_DATA),
  productDataLoaded: createAction(types.PRODUCT_DATA_LOADED),
  designSelected: createAction(types.DESIGN_SELECTED),
}

export default actions;
export {types};
