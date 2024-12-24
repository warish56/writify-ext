import { Navigate, Outlet } from "react-router-dom"
import { useUserDetails } from "../hooks/useUserDetails"



export const RootRoute = () => {    
    const {userData} = useUserDetails();
    if(userData){
        return <Outlet/>
    }

    return <Navigate to="/auth/login" replace/>
    
}