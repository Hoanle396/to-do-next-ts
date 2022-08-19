import axios from 'axios';
import Cookies from 'js-cookie';
import { NextRequest } from 'next/server';
export const BASE_URL = `https://api-nodejs-todolist.herokuapp.com/`;

const baseAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization':'Bearer '+Cookies.get('token'),
    'Content-Type': 'application/json',
  },
});

baseAxios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

baseAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    throw error.response;
  },
);

export default baseAxios;