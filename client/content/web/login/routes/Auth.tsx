import { Navigate, Outlet } from "react-router-dom"
import { useUserDetails } from "../hooks/useUserDetails"



export const AuthRoute = () => {    
    const {userData} = useUserDetails();
    if(!userData){
        return <Outlet/>
    }

    return <Navigate to="/plans" replace/>
    
}