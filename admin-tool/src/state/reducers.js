import {handleActions} from 'redux-actions';
import {types} from './actions';

const defaultState = {
  testFlag: {label: 'unset xxx'},
  counter: 0,
  
  productData: null,
  selectedDesign: null,
  
/*  designUpdatePending: {
    data: null,
    complete: false,
  },*/
};

const app = handleActions(
    {
  
      // *** uses saga
      [types.GET_PRODUCT_DATA](state, {payload}) {
        // console.log('/reducers/ -GET_PRODUCT_DATA', payload);
        return {
          ...state,
          selectedDesign: null,
        }
      },
  
      // *** uses saga
      [types.DB_UPDATE_DESIGN](state, {payload}) {
        console.log('/reducers/ -DB_UPDATE_DESIGN', payload);
        return {
          ...state,
          /*designUpdatePending: {
            data: payload,
            complete: false,
          },*/
        }
      },
   
      // *** uses saga
      [types.DB_UPDATE_DESIGN_RESPONSE](state, {payload}) {
        console.log('/reducers/ -DB_UPDATE_DESIGN_RESPONSE', payload.response.payload.success);
        
        // *** replace data only on success
        const freshDesignData = (payload.response.payload.success) ?
            payload.response.payload.data : state.selectedDesign;
        
        return {
          ...state,
         /* designUpdatePending: {
            data: payload.response,
            complete: true,
          },*/
  
          selectedDesign: freshDesignData,
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
        // console.log('/reducers/ -DESIGN_SELECTED', payload.item);
        return {
          ...state,
          selectedDesign: payload.item,
        }
      },
    },
    defaultState
);

export default app;
