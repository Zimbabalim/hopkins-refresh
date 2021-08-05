import {createAction} from 'redux-actions';

const types = {
  TEST_ACTION: 'TEST_ACTION',
  GET_PRODUCT_DATA: 'GET_PRODUCT_DATA',
  PRODUCT_DATA_LOADED: 'PRODUCT_DATA_LOADED',
};

const actions = {
  testAction: createAction(types.TEST_ACTION),
  getProductData: createAction(types.GET_PRODUCT_DATA),
  productDataLoaded: createAction(types.PRODUCT_DATA_LOADED)
}

export default actions;
export {types};
