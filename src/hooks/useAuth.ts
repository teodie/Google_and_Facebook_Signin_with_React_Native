import { AuthContext } from "@/src/utils/auth-context";
import {  useContext } from "react";


export const useAuth = () => {
  const context = useContext(AuthContext)

  if(context === undefined){
    throw new Error("useAuth must be inside of the AuthProvider!")
  }

  return context
}