import {  DeleteForever } from '@mui/icons-material'
import { Button, Checkbox } from '@mui/material'
import React from 'react'
import { UpdateTaskDto } from '../../api/Task';
export interface IdataProps{
   _id: string;
   description: string;
   compeleted: boolean;
   owner: string;
}
const Task = ({data,onUpdateTask,onDelete}:{data:any,onUpdateTask:(payload: UpdateTaskDto) => void,onDelete:(id: string) => void}) => {
   return (
      <div style={{ display: 'flex', flexDirection: 'row', margin: 0, padding: 0,height:40 }}>
         <Checkbox checked={data.completed} onChange={() =>onUpdateTask({id : data._id,completed:true})} />
         <h4 style={{ fontStyle: 'initial', fontWeight: 'bold', margin:10 }}>{data.description}</h4>
         <Button variant='text' size='small' color='error' onClick={()=>onDelete(data._id)}><DeleteForever /></Button>
      </div>
   )
}

export default Task