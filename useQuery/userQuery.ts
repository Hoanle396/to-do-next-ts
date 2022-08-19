import { useMutation, useQuery } from "react-query";
import { User } from "../api/User";

export const useGetLoggedin = () => {
   return useQuery(['query-check'],  () =>  User.getLoggedin());
}
