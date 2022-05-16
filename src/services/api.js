import axios from "./axiosConfig";

export const getTableData = ({ method, api, params }) => axios[method](api, params);