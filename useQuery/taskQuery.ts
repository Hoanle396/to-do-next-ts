import { useMutation, useQuery } from "react-query";
import { Task } from "../api/Task";

export const useAddTask = (payload: any) => {
  return useMutation( async () => await Task.Addtask(payload));
};
export const useAllTask = () => {
   return useQuery(['query-all-task'], async () => await Task.AllTask());
}
export const useTaskById = (id:string) => {
   return useQuery(['quuery-task-by-id'], async () => await Task.TaskByid(id));
}
export const useTaskComplete = () => {
   return useQuery(['query-complete'], async () => await Task.TaskComplete());
}
export const useTaskPaginate = (limit:number,skip:number) => {
   return useQuery(['query-paginate', limit,skip], async () => await Task.TaskPaginate(limit,skip));
}
export const useUpdateById = (id:string,payload: any) => {
   return useMutation( async () => await Task.UpdateById(id,payload));
}
export const useDeleteTask = (id: string) => {
   return useQuery(['delete-task', id], async () => await Task.DeleteTask(id));
}