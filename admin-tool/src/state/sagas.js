import { all, put, call, takeLatest } from 'redux-saga/effects';
import actions from './actions';
import {types} from './actions';
import fetchService from '../service/fetchService';


// *** make async call, call action with original request data and response
function* fetchProductData(action) {
  // console.log('/sagas/ -SAGA WORKING', actions);

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

function* sagas() {
  yield all([
    watchGetProductData(),
  ]);
}



export default sagas;
