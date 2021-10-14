import {handleActions} from 'redux-actions';
import {types} from './actions';

const defaultState = {
  
  currentViewIndex: 0,
  
  productData: null,
  selectedDesign: null,
  imagesUploaderTrigger: false, // *** to cache bust and reload images after upload
  
  userData: null,
  selectedUser: null,
};

const app = handleActions(
    {
  
      [types.CHANGE_ROUTE](state, {payload}) {
        console.log('/reducers/ -CHANGE_ROUTE', payload);
        return {
          ...state,
          currentViewIndex: payload.index,
        }
      },
      
  
      // *** PRODUCT EDITOR =========
      
      // *** uses saga
      [types.GET_PRODUCT_DATA](state, {payload}) {
        return {
          ...state,
          selectedDesign: null,
        }
      },
  
      // *** uses saga
      [types.PRODUCT_DATA_LOADED](state, {payload}) {
        const productData = payload.response.payload.data;
        return {
          ...state,
          productData,
        }
      },
  
      // *** uses saga
      [types.DB_UPDATE_DESIGN](state, {payload}) {
        return {
          ...state,
        }
      },
   
      // *** uses saga
      [types.DB_UPDATE_DESIGN_RESPONSE](state, {payload}) {
        // *** replace data only on success
        const freshDesignData = (payload.response.payload.success) ?
            payload.response.payload.data : state.selectedDesign;
        
        return {
          ...state,
          selectedDesign: freshDesignData,
        }
      },
  
      [types.DB_UPLOAD_IMAGES](state, {payload}) {
        return {
          ...state,
          imagesUploaderTrigger: true,
        }
      },
  
      [types.DB_UPLOAD_IMAGES_RESPONSE](state, {payload}) {
        return {
          ...state,
          selectedDesign: state.selectedDesign,
          imagesUploaderTrigger: false,
        }
      },
  
      [types.DESIGN_SELECTED](state, {payload}) {
        return {
          ...state,
          selectedDesign: payload.item,
        }
      },
  
      // *** USER EDITOR =========
      [types.GET_USER_DATA](state, {payload}) {
        console.log('/reducers/ -', payload);
        return {
          ...state,
          selectedUser: null,
        }
      },
  
      [types.USER_DATA_LOADED](state, {payload}) {
        const userData = payload.response.payload.data;
        return {
          ...state,
          userData,
        }
      },
  
      [types.USER_SELECTED](state, {payload}) {
        return {
          ...state,
          selectedUser: payload.item,
        }
      },
      
      
    },
    defaultState
);

export default app;
