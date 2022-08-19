import { HowToReg } from '@mui/icons-material'
import { Button, TextField, Link } from '@mui/material'
import { Container } from '@mui/system'
import { NextPage } from 'next'
import NextLink from 'next/link'
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { User } from '../api/User'
import styles from '../scss/auth.module.scss'
import { toastEmit } from '../utils/toatify'
const Register:NextPage = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [name, setName] = useState('');
   const [age, setAge] = useState("");
   const [passwordComfrim, setPasswordComfrim] = useState('');
   const useRegisterQuery = useMutation((payload: any) => User.Register(payload));
   const handleSumit = () => {
      if (email == '' || name == '' || age == '' || password == '' || passwordComfrim == '') {
         toastEmit({ type: 'error', message: 'Không được để trống' })
      }
      else if (password != passwordComfrim) {
         toastEmit({ type: 'error', message: 'Mật Khẩu Không khớp' })
      }
      else {
         useRegisterQuery.mutate({ email, name, password, age })
      }
   }
   useEffect(() => {
      if (useRegisterQuery.isError) {
         toastEmit({ type: 'error', message: "Đăng kí tài khoản thất bại" })
      }
      if (useRegisterQuery.isSuccess) {
         toastEmit({ type: 'success', message: "Đăng kí tài khoản thành công !" })
      }
   }, [useRegisterQuery.isError, useRegisterQuery.isSuccess])
   return (
      <Container>
         <div className={styles.container}>
            <h1 className={styles.title}>Register page</h1>
            <div className={styles.form}>
               <span>Email</span>
               <TextField type='email' color='primary' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} size='small' variant="outlined" fullWidth></TextField>
            </div>
            <div className={styles.form}>
               <span>Name</span>
               <TextField type='text' color='primary' placeholder='Full Name' value={name} onChange={(e) => setName(e.target.value)} size='small' variant="outlined" fullWidth></TextField>
            </div>
            <div className={styles.form}>
               <span>Age</span>
               <TextField type='number' color='primary' placeholder='Age' value={age} onChange={(e) => setAge(e.target.value)} size='small' variant="outlined" fullWidth></TextField>
            </div>
            <div className={styles.form}>
               <span>Password</span>
               <TextField type='password' color='primary' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' size='small' variant="outlined" fullWidth></TextField>
            </div>
            <div className={styles.form}>
               <span>Password comfrim</span>
               <TextField type='password' color='primary' value={passwordComfrim} onChange={(e) => setPasswordComfrim(e.target.value)} placeholder='Password' size='small' variant="outlined" fullWidth></TextField>
            </div>
            <NextLink href={'/login'} passHref style={{marginTop:'1.5rem'}}>
               <Link>Have account? Login</Link>
            </NextLink>
            <div className={styles.form}>
               <Button color='primary' variant='contained' onClick={handleSumit} startIcon={<HowToReg />}>{useRegisterQuery.isLoading ? "load.." : null} Register</Button>
            </div>
         </div>
      </Container>
   )
}

export default Register