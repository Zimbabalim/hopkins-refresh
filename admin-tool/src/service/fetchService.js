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
  }
}

export default fetchService;
