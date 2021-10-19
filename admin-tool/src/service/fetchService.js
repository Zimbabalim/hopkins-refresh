import axios from 'axios';

// TODO refactor this into single call with configurable type!
// *** called either directly or handled by saga
const fetchService = {
  
  call: (request) => {
    console.log('/fetchService/ -CALL', request);
    return axios
        .get(request.path)
        .then((response) => {
          // console.log('/fetchService/ -SUCCESS', response.data);
          return {
            status: 'ok',
            type: request.type,
            payload: response.data
          };
        })
        .catch((error) => {
          console.warn('/fetchService/ -ERROR yyy', error);
          return {status: 'fail', payload: error}
        })
        .finally(() => {
          // console.log('/fetchService/ -FINISHED');
        });
  },
  
  update: (request) => {
    console.log('/fetchService/ -UPDATE', request);
    return axios
        .patch(request.path, request.data)
        .then((response) => {
          // console.log('/fetchService/ -SUCCESS', response.data);
          return {
            status: 'ok',
            type: request.type,
            payload: response.data
          };
        })
        .catch((error) => {
          console.warn('/fetchService/ -ERROR', error);
          return {status: 'fail', payload: null}
        })
        .finally(() => {
          // console.log('/fetchService/ -FINISHED');
        });
  },
  
  
  
  
  post: (request) => {
    console.log('/fetchService/ -UPDATE', request);

    return axios
        .post(request.path, request.data, {headers: request.headers})
        .then((response) => {
          // console.log('/fetchService/ -SUCCESS', response.data);
          return {
            status: 'ok',
            type: request.type,
            payload: response.data
          };
        })
        .catch((error) => {
          console.warn('/fetchService/ -ERROR xxx', error);
          return {status: 'fail', payload: error}
        })
        .finally(() => {
          // console.log('/fetchService/ -FINISHED');
        });
  },
  
  
  delete: (request) => {
    console.log('/fetchService/ -UPDATE', request);
    
    return axios
        .delete(request.path)
        .then((response) => {
          // console.log('/fetchService/ -SUCCESS', response.data);
          return {
            status: 'ok',
            type: request.type,
            payload: response.data
          };
        })
        .catch((error) => {
          console.warn('/fetchService/ -ERROR xxx', error);
          return {status: 'fail', payload: error}
        })
        .finally(() => {
          // console.log('/fetchService/ -FINISHED');
        });
  }
  
}

export default fetchService;
