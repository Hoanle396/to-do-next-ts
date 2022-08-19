import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useMutation } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { User } from '../../api/User'
import { setAuthInfor, setIsLogin } from '../../features/AuthSlice'
import { toastEmit } from '../../utils/toatify'
import style from './navbar.module.scss'
const NavBar = () => {
   const auth = useSelector((state: any) => state.auth)
   const dispatch = useDispatch();
   const router = useRouter();
   const logout = useMutation(() => User.Logout())
   const handleClick = () => {
      logout.mutate();
   }
   useEffect(() => {
      if (logout.isSuccess) {
         dispatch(setIsLogin(false))
         dispatch(setAuthInfor(null))
         Cookies.remove('token')
         toastEmit({ type: 'success', message: "Logouted" })
         router.push('/login')
      }
      if (logout.isError) {
         toastEmit({ type: 'error', message: 'error somethig when logout' })
      }
   }, [logout.isError, logout.isSuccess])
   return (
      <div className={style.topnav}>
         <Link href="/">Home</Link>
         {auth.isLogin ?
            <>
               <Link href="/task">Task</Link>
               <Link href="/auth/profile">Profile</Link>
            </> : null}
         {auth.isLogin ?
            <a onClick={handleClick}>logout</a> :
            <Link href="/login">login</Link>}
      </div>
   )
}

export default NavBar