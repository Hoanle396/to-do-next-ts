import { Box, Container, Pagination, TextField, Typography } from '@mui/material'
import { NextPage } from 'next'
import React, { useState } from 'react'
import BaseLayout from '../Layout/BaseLayout'
import TaskComponets from '../components/Task'
import style from '../scss/task.module.scss'
interface TabPanelProps {
   children?: React.ReactNode;
   index: number;
   value: number;
}

function TabPanel(props: TabPanelProps) {
   const { children, value, index, ...other } = props;

   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`vertical-tabpanel-${index}`}
         aria-labelledby={`vertical-tab-${index}`}
         {...other}
      >
         {value === index && (
            <Box sx={{ p: 3 }}>
               <Typography>{children}</Typography>
            </Box>
         )}
      </div>
   );
}
const Task: NextPage = () => {
   const [task, setTask] = useState('');
   return (
      <BaseLayout>
         <Container className={style.container}>
            <div className={style.paper}>
               <div className={style.left}>
                  menu
               </div>
               <div className={style.right}>
                  <h1 className={style.text_h1}>Todo Task</h1>
                  <TextField placeholder='Add Task' value={task} onChange={(e) => setTask(e.target.value)} size='small' variant="outlined" style={{ width: 400, marginLeft: 50 }}></TextField>
                  <div className={style.todolist}>
                     <TaskComponets />
                     <TaskComponets />
                     <TaskComponets />
                  </div>
                  <Pagination count={3} color="primary" />
               </div>
            </div>
         </Container>
      </BaseLayout>
   )
}

export default Task