import { createSlice } from '@reduxjs/toolkit'

interface IAuthInfor{
   id: string;
   name: string;
   email: string;
   avatar: string|null;
   age: number;
}
interface IinitialState{
   isLogin: null | boolean;
   authInfor: null | IAuthInfor;
}
const initialState: IinitialState = {
   isLogin: null,
   authInfor:null
}
interface IAction{
   payload: any;
   type:string
 }
const auth = createSlice({
   name: "auth",
   initialState,
   reducers: {
      setIsLogin: (state: IinitialState, action: IAction) => {
         return { ...state, isLogin: action.payload };
       },
       setAuthInfor: (state: IinitialState, action: IAction) => {
         return { ...state, authInfor: action.payload };
       },
   }
})
export const { setAuthInfor, setIsLogin } = auth.actions
export default auth.reducer