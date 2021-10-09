import axios from 'axios';

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
          console.warn('/fetchService/ -ERROR', error);
          return {status: 'fail', payload: null}
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
    const headers = {
      'content-type': 'multipart/form-data'
    }
    
    return axios
        .post(request.path, request.data, {headers: headers})
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
  }
  
}

export default fetchService;
