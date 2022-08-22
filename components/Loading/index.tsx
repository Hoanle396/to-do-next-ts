import React from 'react'
import styled from './loading.module.scss'
const Loading = () => {
  
  return (
     <div className={styled.wrapper}>
        <div className={styled.circle}></div>
        <div className={styled.circle}></div>
        <div className={styled.circle}></div>
    </div>
  )
}

export default Loading