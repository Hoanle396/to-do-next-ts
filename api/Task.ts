import baseAxios from "../config/baseAxios"
export interface UpdateTaskDto{
   id: string;
   completed: boolean;
}
export const TaskApi = {
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

   UpdateById: (dto:UpdateTaskDto) => {
      return baseAxios.put(`/task/${dto.id}`,{completed:dto.completed})
   },
   DeleteTask: (id: string) => {
      return baseAxios.delete(`/task/${id}`)
   }
}