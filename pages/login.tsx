import { AlternateEmail, Lock, LoginOutlined } from '@mui/icons-material'
import { Button, InputAdornment, Link, TextField } from '@mui/material'
import { Container } from '@mui/system'
import NextLink from 'next/link'
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { User } from '../api/User'
import styles from '../scss/auth.module.scss'
import { toastEmit } from '../utils/toatify'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { setAuthInfor, setIsLogin } from '../features/AuthSlice'
import { NextPage } from 'next'

const Login: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const useLoginQuery = useMutation((payload: any) => User.Login(payload));
  const handleSumit = () => {
    if (email == '' || password == '') {
      toastEmit({ type: 'error', message: 'Không được để trống' })
    }
    else {
      useLoginQuery.mutate({ email, password })
    }
  }
  useEffect(() => {
    if (useLoginQuery.isError) {
      toastEmit({ type: 'error', message: "Sai tài khoản hoặc mật khẩu" })
    }
    if (useLoginQuery.isSuccess) {
      const { user, token } = useLoginQuery.data.data
      Cookies.set('token', token)
      dispatch(setIsLogin(true))
      dispatch(setAuthInfor({ name: user.name, email: user.email, age: user.age, id: user._id }))
      toastEmit({ type: 'success', message: "Đăng nhập tài khoản thành công !" })
      router.push('/')
    }
  }, [useLoginQuery.isError, useLoginQuery.isSuccess])
  return (
    <Container>
      <div className={styles.container}>
        <h1 className={styles.title}>Login page</h1>
        <div className={styles.form}>
          <span>Email</span>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmail />
                </InputAdornment>
              ),
            }}
            type='email'
            color='primary'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size='small'
            variant="outlined"
            fullWidth>
          </TextField>
        </div>
        <div className={styles.form}>
          <span>Password</span>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
            }}
            type='password'
            color='primary'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            size='small'
            variant="outlined"
            fullWidth
          ></TextField>
        </div>
        <NextLink href={'/register'} passHref style={{ marginTop: '1.5rem' }}>
          <Link>Don't Have account? Register</Link>
        </NextLink>
        <div className={styles.form}>
          <Button
            color='primary'
            variant='contained'
            onClick={handleSumit}
            startIcon={<LoginOutlined />}
          >{useLoginQuery.isLoading ? "..." : null}Login</Button>
        </div>
      </div>
    </Container>
  )
}

export default Login