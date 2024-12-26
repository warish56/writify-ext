import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { useUserDetails } from "../hooks/useUserDetails"
import { useEffect } from "react";



export const RootRoute = () => {    
    const {userData} = useUserDetails();
    const navigate = useNavigate();

    useEffect(() => {
        const {searchParams} = new URL(window.location.href);
        if(searchParams.get('payment') === 'success'){
            navigate("/payment_success", {
                replace: true
            })
        }else if(searchParams.get('payment') === 'failed'){
            navigate("/payment_failed", {
                replace: true
            })
        }
    }, [])


    if(userData){
        return <Outlet/>
    }
    return <Navigate to="/auth/login" replace/>
    
}