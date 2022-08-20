
import { Container, Paper } from '@mui/material'
import type { NextPage } from 'next'
import React from 'react'
import BaseLayout from '../Layout/BaseLayout'

const Home: NextPage = () => {
 
  return (
    <BaseLayout>
      <Container style={{ display: 'flex', alignItems:'center', marginTop: 30 ,flexDirection:'column'}}>
        <h1 style={{fontSize:48, fontWeight:'bold',fontStyle:'italic',color:'#EEE'}}>Le Huu Hoan</h1>
        <h2>TO DO App</h2>
        <p>ReactJs, Nextjs, Api, MaterialUI V5, Scss, TypeScript, Redux, React-Query,</p>
      </Container>
    </BaseLayout>
  )
}

export default Home
