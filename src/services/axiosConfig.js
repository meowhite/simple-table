import { create } from 'axios';
import { string2Base64 } from '../utils';

const instance = create({
  baseURL: `http://192.168.56.101:8080`,
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

const paramsMethod = (params) => ({
  get: { params },
  post: params,
  put: params,
  delete: { data: params }
});
export const callApiFn = ({ method = 'get', api, params }) => {
  const query = paramsMethod(params)[method];
  return instance[method](api, query);
};

export const queryTableData = ({ api = '/api/report', params }) => {
  return instance.get(api, { params: { q: string2Base64(params) } });
};

export default instance;
