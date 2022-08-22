import { Box, Button, Container, InputAdornment, Pagination, Tab, Tabs, TextField, Typography } from '@mui/material'
import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import BaseLayout from '../Layout/BaseLayout'
import TaskComponets from '../components/Task'
import style from '../scss/task.module.scss'
import { AddCircle } from '@mui/icons-material'
import { useMutation, useQuery } from 'react-query'
import { TaskApi, UpdateTaskDto } from '../api/Task'
import { toastEmit } from '../utils/toatify'
import Loading from '../components/Loading'
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
   const [skip, setSkip] = useState(0);
   const [value, setValue] = React.useState(0);

   const alltask=useQuery('query-all-task',() =>TaskApi.AllTask(),{keepPreviousData:true});
   const addtask = useMutation((payload: any) => TaskApi.Addtask(payload), {
      onSuccess: () => {
         toastEmit({ type: 'success', message: "Add to do successfuly" })
         taskPaginate.refetch();
         compelete.refetch();
         alltask.refetch();
      },
      onError: () => {
         toastEmit({ type: 'error', message: "Add to do failed" })
      },

   });
   const updateTask = useMutation((payload: UpdateTaskDto) => TaskApi.UpdateById(payload));
   const deleteTask=useMutation((id: string) => TaskApi.DeleteTask(id));
   const compelete = useQuery('query-complete', () => TaskApi.TaskComplete())
   const taskPaginate = useQuery(['query-paginate', skip], () => TaskApi.TaskPaginate(3, skip),{keepPreviousData:true});
   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
   };
   const handleAddtask = () => addtask.mutate({ description: task });
   const handleUpdateTask = (payload: UpdateTaskDto) => updateTask.mutate(payload);
   const handleDelete = (id: string) => deleteTask.mutate(id);
   const handlePagination = (_e:React.ChangeEvent<unknown>,page:number) => {
      setSkip((page-1)*3)
   }
   useEffect(() => {
      if (updateTask.isSuccess) {
         setTask('')
         toastEmit({ type: 'success', message: "Update to do successfuly" })
         taskPaginate.refetch();
         compelete.refetch();
         alltask.refetch();
      }
      if (updateTask.isError) {
         toastEmit({ type: "error", message: "Update to do failed" })
      }
   },[updateTask.isLoading])
   useEffect(() => {
      if (deleteTask.isSuccess) {
         toastEmit({ type: "success", message: "Delete to do successfuly" })
         taskPaginate.refetch();
         compelete.refetch();
         alltask.refetch();
      }
      if (deleteTask.isError) {
         toastEmit({ type: "error", message: "Delete to do failed" })
      }
   },[deleteTask.isLoading])
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
                     <Tab label="All Stack" {...a11yProps(0)} />
                     <Tab label="Compelete Stack" {...a11yProps(1)} />
                  </Tabs>
               </div>
               <div className={style.right}>
                  <h1 className={style.text_h1}>Tech Stack</h1>
                  <TextField
                     InputProps={{
                        endAdornment: (
                           <InputAdornment position="end">
                              <Button onClick={handleAddtask}>
                                 <AddCircle />
                              </Button>
                           </InputAdornment>
                        ),
                     }}
                     value={task}
                     onChange={(e) => setTask(e.target.value)}
                     size="small"
                     maxRows={1}
                     id="outlined-basic"
                     placeholder="Add Task"
                     variant="outlined"
                     style={{ width: 400, marginLeft: 50 }}>

                  </TextField>
                  <div className={style.todolist}>
                     <TabPanel value={value} index={0}>
                        {taskPaginate.isLoading && <><Loading/></>}
                        {taskPaginate.isError && <>...Error Loading Data</>}
                        {taskPaginate.data && taskPaginate.data.data.data.map((item: any,index:number) => <TaskComponets key={item._id} data={item} onUpdateTask={handleUpdateTask} onDelete={handleDelete} />)}
                        <div style={{ position: 'absolute', top: 450, right: 200 }}>
                           <Pagination count={Math.ceil(Number(alltask.data?.data.count/3))} onChange={handlePagination} variant="outlined" shape="circular" color='secondary'/>
                       
                        </div>
                     </TabPanel>
                     <TabPanel value={value} index={1}>
                        {compelete.isLoading && <><Loading/></>}
                        {compelete.isError && <>...Error Loading Data</>}
                        {compelete.data && compelete.data.data.data.map((item: any) => <TaskComponets key={item._id} data={item} onUpdateTask={()=>{}} onDelete={handleDelete}/>)}
                     </TabPanel>
                  </div>
               </div>
            </div>
         </Container>
      </BaseLayout>
   )
}

export default Task