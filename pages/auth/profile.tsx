
import { Button, Container, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { useDispatch } from 'react-redux'
import { useGetLoggedin  } from '../../useQuery/userQuery'
import { User } from '../../api/User'
import { setIsLogin } from '../../features/AuthSlice'
import styles from '../../scss/auth.module.scss'
import { toastEmit } from '../../utils/toatify'
import Loading from '../../components/Loading'
const Profile = () => {
  const [image, setImage] = useState('');
  const [img, setImg] = useState<Blob | string>('');
  const router = useRouter();
  const [age, setAge] = useState(0)
  const checkauth = useGetLoggedin();
  const useUpdate = useMutation((payload: any) => User.Update(payload))
  const useUploadImg = useMutation((payload: any) => User.UploadImage(payload))
  const useDeleteImg = useMutation(() => User.DeleteImage())
  const useDeleteUser = useMutation(() => User.DeleteUser())
  const dispatch = useDispatch();
  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      let imgr = event.target.files[0];
      setImg(imgr);
      setImage(URL.createObjectURL(imgr))
    }
  }
  const handleUpdate = () => useUpdate.mutate({ age: age })
  
  const handleUploadImg = () => {
    const data = new FormData();
    data.append('avatar',img)
    useUploadImg.mutate(data)
  }
  const handleDeleteImg = () => useDeleteImg.mutate();
  
  const handleDeleteUser = () => useDeleteUser.mutate();

  useEffect(() => {
    if (checkauth.isSuccess) {
      dispatch(setIsLogin(true))
      setAge(checkauth.data.data.age)
      setImage(`https://api-nodejs-todolist.herokuapp.com/user/${checkauth.data.data._id}/avatar`)
    }
  }, [checkauth.isLoading])
  useEffect(() => {
    if (useUploadImg.isError) {
      toastEmit({ type: 'error', message: 'Upload Failed' })
    }
    if (useUploadImg.isSuccess) {
      toastEmit({ type: 'success', message: 'Upload successfuly' })
    }
  }, [useUploadImg.isLoading]);
  useEffect(() => {
    if (useDeleteImg.isError) {
      toastEmit({ type: 'error', message: 'Delete Image Failed' })
    }
    if (useDeleteImg.isSuccess) {
      setImage('')
      toastEmit({ type: 'success', message: 'Delete Image successfuly' })
    }
  }, [useDeleteImg.isLoading])
  useEffect(() => {
    if (useDeleteUser.isError) {
      toastEmit({ type: 'error', message: 'Delete account Failed' })
    }
    if (useDeleteUser.isSuccess) {
      toastEmit({ type: 'success', message: 'Delete account successfuly' })
      router.push('/login')
    }
  },[useDeleteUser.isLoading])
  useEffect(() => {
    if (useUpdate.isError) {
      toastEmit({ type: 'error', message: 'Update Failed' })
    }
    if (useUpdate.isSuccess) {
      toastEmit({ type: 'success', message: 'Update successfuly' })
    }
  }, [useUpdate.isLoading])
  if (checkauth.isLoading) {
    return <Loading/>
  }
  if (checkauth.isError) {
    router.push('/login')
  }

  if (checkauth.isSuccess) {
    
    return (
      <Container>
        <div className={styles.container}>
          <div className={styles.formedit}>
            <div className={styles.row}>
              <img src={image} alt="" />
              <div style={{ display: 'flex', flexDirection: "column", marginLeft: 30 }}>
                <input type="file" accept='image/*' onChange={onImageChange} style={{ marginBottom: 50 }} />
                <Button variant='contained' color='primary' size='small' style={{ width: 150 }} onClick={handleUploadImg}>Update Image</Button>
                <Button variant='contained' color='error' size='small' style={{ width: 150 }} onClick={handleDeleteImg}>Delete Image</Button>
              </div>
            </div>
            <div className={styles.form}>
              <span>Email</span>
              <TextField type='email' color='primary' disabled placeholder='Email' value={checkauth.data.data.email} size='small' variant="outlined" fullWidth></TextField>
            </div>
            <div className={styles.form}>
              <span>Name</span>
              <TextField type='text' color='primary' disabled placeholder='Full Name' value={checkauth.data.data.name} size='small' variant="outlined" fullWidth></TextField>
            </div>
            <div className={styles.form}>
              <span>Age</span>
              <TextField type='number' color='primary' placeholder='Age' value={age} onChange={(e) => setAge(Number(e.target.value))} size='small' variant="outlined" fullWidth></TextField>
            </div>
            <div className={styles.form}>
              <Button variant='contained' color='primary' size='small' fullWidth onClick={handleUpdate}>Update Account</Button>
            </div>
            <div className={styles.form} style={{ marginBottom: 20 }}>
              <Button variant='contained' color='error' size='small' fullWidth onClick={handleDeleteUser}>Delete Account</Button>
            </div>
          </div>
        </div>
      </Container>
    )
  }
}

export default Profile
