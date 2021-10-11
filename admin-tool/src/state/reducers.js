import {handleActions} from 'redux-actions';
import {types} from './actions';

const defaultState = {
  productData: null,
  selectedDesign: null,
  imagesUploaderTrigger: false, // *** to cache bust and reload images after upload
};

const app = handleActions(
    {
  
      // *** PRODUCT EDITOR =========
      
      // *** uses saga
      [types.GET_PRODUCT_DATA](state, {payload}) {
        return {
          ...state,
          selectedDesign: null,
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
      
  
      [types.PRODUCT_DATA_LOADED](state, {payload}) {
        const productData = payload.response.payload.data;
        return {
          ...state,
          productData,
        }
      },
  
      [types.DESIGN_SELECTED](state, {payload}) {
        return {
          ...state,
          selectedDesign: payload.item,
        }
      },
  
      // *** USER EDITOR =========
    },
    defaultState
);

export default app;
