import baseAxios from "../config/baseAxios"

export const Task = {
   Addtask: (payload: any) => {
      return baseAxios.post('/task',payload)
   },
   AllTask: () => {
      return baseAxios.get('/task')
   },
   TaskByid: (id:string) => {
      return baseAxios.get(`/task/${id}`)
   },
   TaskComplete: () => {
      return baseAxios.get('/task?completed=true')
   },
   TaskPaginate: (limit: number, skip: number) => {
      return baseAxios.get(`task?limit=${limit}&skip=${skip}`)
   },
   UpdateById: (id: string,payload:any) => {
      return baseAxios.put(`/task/${id}`,payload)
   },
   DeleteTask: (id: string) => {
      return baseAxios.delete(`/task/${id}`)
   }
}