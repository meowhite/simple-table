import { create } from 'axios';

const api = create({
  baseURL: `http://hungvu.net/api/v1/`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Add a request interceptor
// api.interceptors.request.use((config) => {
//   const state = store.getState();
//   const token = state?.auth?.token
//   return { ...config, headers: { ...config.headers, Authorization: `Bearer ${token}` } };
// });

// Add a response interceptor
api.interceptors.response.use((response) => response, (error) => {
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

export default api;