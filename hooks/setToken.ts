import baseAxios from '../config/baseAxios';

export const setToken = (token: string | undefined) => {
  if (token) {
    return (baseAxios.defaults.headers.common['Authorization'] = 'Bearer ' + token);
  }
  return (baseAxios.defaults.headers.common['Authorization'] = false);
};