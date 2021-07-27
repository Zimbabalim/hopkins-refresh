import { all, put, call, takeLatest } from 'redux-saga/effects';
import actions from './actions';
import {types} from './actions';
import fetchService from '../service/fetchService';


// *** make async call, call action with original request data and response
function* executeRouteApiRequest(action) {
  console.log('/sagas/ -SAGA WORKING');
  /*const response = yield call(fetchService.call, action.payload);
  const vo = {
    request: action.payload,
    response
  }
  yield put(actions.routeApiRequestComplete(vo));*/
}

// *** observe action
function* watchRouteApiRequestAction() {
  yield takeLatest(types.GET_PRODUCT_DATA, executeRouteApiRequest);
}

function* sagas() {
  yield all([
    watchRouteApiRequestAction(),
  ]);
}



export default sagas;
