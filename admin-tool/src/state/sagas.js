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


/**
 * UPLOAD IMAGES
 */
function* dbUploadImages(action) {
  const request = {
    path: `${config.api.uploadImages}`,
    directory: action.payload.directory,
    data: action.payload.data,
    headers: {'content-type': 'multipart/form-data'}
  }
  
  console.log('/sagas/ -dbUploadImages XXX', request);
  
  const response = yield call(fetchService.post, request);
  
  const vo = {
    request,
    response
  }
  yield put(actions.dbUploadImagesResponse(vo));
}
// *** observe action
function* watchUploadImages() {
  yield takeLatest(types.DB_UPLOAD_IMAGES, dbUploadImages);
}

/**
 * CREATE DESIGN
 */
function* dbCreateDesign(action) {
  const request = {
    path: `${config.api.createProduct}`,
    data: action.payload,
    headers: {'content-type': 'application/json'}
  }
  
  console.log('/sagas/ -dbCreateDesign xxxxxxx', request);
  // return; // REMOVE
  const response = yield call(fetchService.post, request);
  
  const vo = {
    request,
    response
  }
  yield put(actions.dbCreateDesignResponse(vo));
}
// *** observe action
function* watchCreateDesign() {
  yield takeLatest(types.DB_CREATE_DESIGN, dbCreateDesign);
}

// === USERS ===

/**
 * FETCH USER DATA
 * make async call, call action with original request data and response
 */
function* fetchUserData(action) {
  console.log('/sagas/ -fetchUserData', action);
  
  const response = yield call(fetchService.call, action.payload);
  const vo = {
    request: action.payload,
    response
  }
  yield put(actions.userDataLoaded(vo));
}
// *** observe action
function* watchGetUserData() {
  yield takeLatest(types.GET_USER_DATA, fetchUserData);
}


/**
 * UPDATE USER
 */
function* dbUpdateUser(action) {
  
  const request = {
    path: `${config.api.updateUser}${action.payload.data._id}`,
    data: action.payload.data,
  }
  
  console.log('/sagas/ -dbUpdateUser zzz', request);
  
  const response = yield call(fetchService.update, request);
  
  const vo = {
    request,
    response
  }
  yield put(actions.dbUpdateUserResponse(vo));
}
// *** observe action
function* watchUpdateUser() {
  yield takeLatest(types.DB_UPDATE_USER, dbUpdateUser);
}

/**
 * CREATE USER
 */
function* dbCreateUser(action) {
  const request = {
    path: `${config.api.createUser}`,
    data: action.payload,
    headers: {'content-type': 'application/json'}
  }
  
  console.log('/sagas/ -dbCreateUser', request);
  // return;
  const response = yield call(fetchService.post, request);
  
  const vo = {
    request,
    response
  }
  yield put(actions.dbCreateUserResponse(vo));
}
// *** observe action
function* watchCreateUser() {
  yield takeLatest(types.DB_CREATE_USER, dbCreateUser);
}

/**
 * DELETE USER
 */
function* dbDeleteUser(action) {
  const request = {
    path: `${config.api.deleteUser}${action.payload.id}`,
    id: action.payload.id, // *** for response to update memory data
  }
  console.log('/sagas/ -dbDeleteUser xxx', request);
  // return;
  const response = yield call(fetchService.delete, request);
  
  const vo = {
    request,
    response
  }
  yield put(actions.dbDeleteUserResponse(vo));
}
// *** observe action
function* watchDeleteUser() {
  yield takeLatest(types.DB_DELETE_USER, dbDeleteUser);
}


function* sagas() {
  yield all([
    watchGetProductData(),
    watchUpdateDesign(),
    watchUploadImages(),
    watchCreateDesign(),
  
    watchGetUserData(),
    watchUpdateUser(),
  
    watchCreateUser(),
    watchDeleteUser(),
  ]);
}



export default sagas;
