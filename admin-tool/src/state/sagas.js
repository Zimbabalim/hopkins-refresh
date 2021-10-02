import { all, put, call, takeLatest } from 'redux-saga/effects';
import actions from './actions';
import {types} from './actions';
import fetchService from '../service/fetchService';
import config from '../config';



/**
 * FETCH PRODUCT DATA
 * make async call, call action with original request data and response
 */
function* fetchProductData(action) {
  console.log('/sagas/ -fetchProductData', action);

  const response = yield call(fetchService.call, action.payload);
  const vo = {
    request: action.payload,
    response
  }
  yield put(actions.productDataLoaded(vo));
}

// *** observe action
function* watchGetProductData() {
  yield takeLatest(types.GET_PRODUCT_DATA, fetchProductData);
}

/**
 * UPDATE DESIGN
 */
function* dbUpdateDesign(action) {
  const request = {
    type: action.payload.type,
    path: `${config.api.updateProduct}${action.payload.data._id}`,
    data: action.payload.data,
  }
  
  console.log('/sagas/ -dbUpdateDesign', request);
  
  const response = yield call(fetchService.update, request);
  
  const vo = {
    request,
    response
  }
  yield put(actions.dbUpdateDesignResponse(vo));
}


// *** observe action
function* watchUpdateDesign() {
  yield takeLatest(types.DB_UPDATE_DESIGN, dbUpdateDesign);
}



function* sagas() {
  yield all([
    watchGetProductData(),
    watchUpdateDesign(),
  ]);
}



export default sagas;
