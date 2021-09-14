import {handleActions} from 'redux-actions';
import {types} from './actions';

const defaultState = {
  testFlag: {label: 'unset xxx'},
  counter: 0,
  
  productData: null,
  selectedDesign: null,
};

const app = handleActions(
    {
      
      [types.TEST_ACTION](state, {payload}) {
        console.log('/reducers/ -????', payload);
        let counter = state.counter;
        counter += 1;
        const testFlag = { ...state.testFlag, label: `${payload.label} : ${counter}` }
  
        return {
          ...state,
          testFlag,
          counter
        };
      },
  
      [types.GET_PRODUCT_DATA](state, {payload}) {
        console.log('/reducers/ -GET_PRODUCT_DATA', payload);
        return {
          ...state,
          selectedDesign: null,
        }
      },
  
      [types.PRODUCT_DATA_LOADED](state, {payload}) {
        const productData = payload.response.payload.data;
        return {
          ...state,
          productData,
        }
      },
  
      [types.DESIGN_SELECTED](state, {payload}) {
        console.log('/reducers/ -DESIGN_SELECTED', payload);
        return {
          ...state,
          selectedDesign: payload.item,
        }
      },
  
    },
    defaultState
);

export default app;
