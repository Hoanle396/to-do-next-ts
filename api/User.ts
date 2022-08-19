import axioscf from "../config/baseAxios";

export const User = {
   Login: (payload: any) => {
      return axioscf.post('/user/login',payload)
   },
   Register: (payload: any) => {
      return axioscf.post('/user/register',payload)
   },
   Logout: () => {
      return axioscf.post('/user/logout')
   },
   getLoggedin: () => {
      return axioscf.get('/user/me')
   },
   Update: (payload: any) => {
      return axioscf.put('/user/me',payload)
   },
   UploadImage: (payload: any) => {
      return axioscf.post('/user/me/avatar',payload)
   },
   getUserImage: (id:string) => {
      return axioscf.get(`/user/${id}/avatar`)
   },
   DeleteImage: () => {
      return axioscf.delete('/user/me/avatar')
   },
   DeleteUser: () => {
      return axioscf.delete('/user/me')
   }
};
