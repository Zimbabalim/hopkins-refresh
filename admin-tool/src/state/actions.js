// import {createActions} from 'redux-actions';
import {createAction} from 'redux-actions';

const types = {
  TEST_ACTION: 'TEST_ACTION',
  GET_PRODUCT_DATA: 'GET_PRODUCT_DATA',
};

/*const actions = createActions(
    ...Object.keys(types).map(type => types[type])
);*/

const actions = {
  testAction: createAction(types.TEST_ACTION),
  getProductData: createAction(types.GET_PRODUCT_DATA)
}


export default actions;
export {types};
