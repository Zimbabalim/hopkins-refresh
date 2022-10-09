import { all, put, call, takeLatest } from 'redux-saga/effects';
import actions from './actions';
import {types} from './actions';
import fetchService from '../service/fetchService';
import config from '../config';





/**
 * FETCH SUNDRIES DATA
 * make async call, call action with original request data and response
 */
function* fetchSundriesData(action) {
  console.log('/sagas/ -fetchSundriesData', action);
  
  const response = yield call(fetchService.call, action.payload);
  const vo = {
    request: action.payload,
    response
  }
  yield put(actions.sundriesDataLoaded(vo));
}
// *** observe action
function* watchGetSundriesData() {
  yield takeLatest(types.GET_SUNDRIES_DATA, fetchSundriesData);
}

/**
 * CREATE SUNDRY
 */
function* dbCreateSundries(action) {
  const request = {
    path: `${config.api.createSundries}`,
    data: action.payload,
    headers: {'content-type': 'application/json'}
  }
  
  console.log('/sagas/ -dbCreateSundries xxxxxxx', request);
  // return; // REMOVE
  const response = yield call(fetchService.post, request);
  
  const vo = {
    request,
    response
  }
  yield put(actions.dbCreateSundriesResponse(vo));
}
// *** observe action
function* watchCreateSundries() {
  yield takeLatest(types.DB_CREATE_SUNDRIES, dbCreateSundries);
}

/**
 * DELETE SUNDRY
 */
function* dbDeleteSundries(action) {
  const request = {
    path: `${config.api.deleteSundries}${action.payload.id}`,
    id: action.payload.id, // *** for response to update memory data
  }
  console.log('/sagas/ -dbDeleteSundries xxx', request);
  // return;
  const response = yield call(fetchService.delete, request);
  
  const vo = {
    request,
    response
  }
  yield put(actions.dbDeleteSundriesResponse(vo));
}
// *** observe action
function* watchDeleteSundries() {
  yield takeLatest(types.DB_DELETE_SUNDRIES, dbDeleteSundries);
}


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
  console.log('/sagas/ -dbUploadImages ===================', action.payload.path);
  const request = {
    // path: `${config.api.uploadImages}`,
    path: action.payload.path,
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

/**
 * DELETE DESIGN
 */
function* dbDeleteDesign(action) {
  const request = {
    path: `${config.api.deleteProduct}${action.payload.id}`,
    id: action.payload.id, // *** for response to update memory data
  }
  console.log('/sagas/ -dbDeleteDesign xxx', request);
  // return;
  const response = yield call(fetchService.delete, request);
  
  const vo = {
    request,
    response
  }
  yield put(actions.dbDeleteDesignResponse(vo));
}
// *** observe action
function* watchDeleteDesign() {
  yield takeLatest(types.DB_DELETE_DESIGN, dbDeleteDesign);
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

// *** CONFIG FRAGMENTS

// *** design
function* fetchConfigDesignData(action) {
  const response = yield call(fetchService.call, action.payload);
  const vo = {request: action.payload, response}
  yield put(actions.CONFIG_DESIGNS_DATA_LOADED(vo));
}
function* watchConfigDesignData() {
  yield takeLatest(types.GET_CONFIG_DESIGNS_DATA, fetchConfigDesignData);
}
// *** colour
function* fetchConfigColourData(action) {
  const response = yield call(fetchService.call, action.payload);
  const vo = {request: action.payload, response}
  yield put(actions.CONFIG_COLOURS_DATA_LOADED(vo));
}
function* watchConfigColourData() {
  yield takeLatest(types.GET_CONFIG_COLOURS_DATA, fetchConfigColourData);
}
// *** fabrics
function* fetchConfigFabricData(action) {
  const response = yield call(fetchService.call, action.payload);
  const vo = {request: action.payload, response}
  yield put(actions.CONFIG_FABRICS_DATA_LOADED(vo));
}
function* watchConfigFabricData() {
  yield takeLatest(types.GET_CONFIG_FABRICS_DATA, fetchConfigFabricData);
}

// *** SAVE fragments
function* dbCreateConfigFabric(action) {
  
  const request = {
    path: `${config.api.createConfigFabric}`,
    data: action.payload,
    headers: {'content-type': 'application/json'}
  }
  const response = yield call(fetchService.post, request);
  
  const vo = {
    request,
    response
  }
  yield put(actions.DB_CREATE_CONFIG_FABRIC_RESPONSE(vo));
}
// *** observe action
function* watchCreateConfigFabric() {
  yield takeLatest(types.DB_CREATE_CONFIG_FABRIC, dbCreateConfigFabric);
}
// ***
function* dbCreateConfigColour(action) {
  
  const request = {
    path: `${config.api.createConfigColour}`,
    data: action.payload,
    headers: {'content-type': 'application/json'}
  }
  const response = yield call(fetchService.post, request);
  
  const vo = {
    request,
    response
  }
  yield put(actions.DB_CREATE_CONFIG_COLOUR_RESPONSE(vo));
}
// *** observe action
function* watchCreateConfigColour() {
  yield takeLatest(types.DB_CREATE_CONFIG_COLOUR, dbCreateConfigColour);
}


function* sagas() {
  yield all([
  
    watchGetSundriesData(),
    watchCreateSundries(),
    watchDeleteSundries(),
    
    watchGetProductData(),
    watchUpdateDesign(),
    watchUploadImages(),
    watchCreateDesign(),
    watchDeleteDesign(),
  
    watchGetUserData(),
    watchUpdateUser(),
  
    watchCreateUser(),
    watchDeleteUser(),
  
    // *** config fragments
    watchConfigDesignData(),
    watchConfigColourData(),
    watchConfigFabricData(),
    //*** saving fragments
    watchCreateConfigFabric(),
    watchCreateConfigColour(),
  ]);
}



export default sagas;
