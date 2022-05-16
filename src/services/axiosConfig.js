import { create } from 'axios';

const instance = create({
  baseURL: `http://localhost:3004`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Add a request interceptor
// instance.interceptors.request.use((config) => {
//   const state = store.getState();
//   const token = state?.auth?.token
//   return { ...config, headers: { ...config.headers, Authorization: `Bearer ${token}` } };
// });

// Add a response interceptor
instance.interceptors.response.use((response) => response, (error) => {
  // Do something with response error
  if (error.response.status === 401) {
    console.tron.log('error', error.config.url);
    // alert('Something went wrong!. Please login again');  //eslint-disable-line
    // window.location.reload();
    // store.dispatch(removeToken());
    // window.location.href = '/#/login';
  }
  return Promise.reject(error.response);
});

export const callApiFn = ({ method = 'get', api, params }) => instance[method](api, params);

export default instance;
