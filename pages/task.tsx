import { Box, Container, InputAdornment, Pagination, Tab, Tabs, TextField, Typography } from '@mui/material'
import { NextPage } from 'next'
import React, { useState } from 'react'
import BaseLayout from '../Layout/BaseLayout'
import TaskComponets from '../components/Task'
import style from '../scss/task.module.scss'
import { AddCircle } from '@mui/icons-material'
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
function a11yProps(index: number) {
   return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
   };
}

const Task: NextPage = () => {
   const [task, setTask] = useState('');
   const [value, setValue] = React.useState(0);
   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
   };
   return (
      <BaseLayout>
         <Container className={style.container}>
            <div className={style.paper}>
               <div className={style.left}>

                  <Tabs
                     orientation="vertical"
                     variant="scrollable"
                     value={value}
                     onChange={handleChange}
                     sx={{ borderRight: 1, borderColor: 'divider' }}
                  >
                     <Tab label="All Task" {...a11yProps(0)} />
                     <Tab label="Compelete Task" {...a11yProps(1)} />
                     <Tab label="Paginate Task" {...a11yProps(2)} />
                  </Tabs>
               </div>
               <div className={style.right}>
                  <h1 className={style.text_h1}>Todo Task</h1>
                  <TextField
                     InputProps={{
                        endAdornment: (
                           <InputAdornment position="end">
                              <AddCircle />
                           </InputAdornment>
                        ),
                     }}
                     size="small"
                     maxRows={1}
                     id="outlined-basic"
                     placeholder="Add Task"
                     variant="outlined"
                     style={{ width: 400, marginLeft: 50 }}>

                  </TextField>
                  <div className={style.todolist}>
                     <TabPanel value={value} index={0}>
                        <TaskComponets />
                        <TaskComponets />
                        <TaskComponets />
                        <Pagination count={3} color="primary" />
                     </TabPanel>
                     <TabPanel value={value} index={1}>
                        <TaskComponets />
                        <Pagination count={3} color="standard" shape='rounded' />
                     </TabPanel>
                     <TabPanel value={value} index={2}>
                        <TaskComponets />
                        <TaskComponets />
                        <Pagination count={3} color="secondary" variant='outlined' />
                     </TabPanel>
                  </div>
               </div>
            </div>
         </Container>
      </BaseLayout>
   )
}

export default Task