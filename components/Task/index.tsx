import {  DeleteForever } from '@mui/icons-material'
import { Button, Checkbox } from '@mui/material'
import React from 'react'

const Task = () => {
   return (
      <div style={{ display: 'flex', flexDirection: 'row', margin: 0, padding: 0,height:40 }}>
         <Checkbox />
         <h4 style={{ fontStyle: 'initial', fontWeight: 'bold', margin:10 }}>todo1</h4>
         <Button variant='text' size='small' color='error' ><DeleteForever /></Button>
      </div>
   )
}

export default Task