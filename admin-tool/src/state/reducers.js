import {handleActions} from 'redux-actions';
import {types} from './actions';

const defaultState = {
  testFlag: {label: 'unset xxx'},
  counter: 0
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
        console.log('/reducers/ -GET_PRODUCT_DATA');
        return {...state}
      }
  
    },
    defaultState
);

export default app;
