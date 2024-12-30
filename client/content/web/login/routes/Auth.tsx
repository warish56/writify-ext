import { Navigate, Outlet } from "react-router-dom"
import { useUserDetails } from "../hooks/useUserDetails"
import { ErrorBoundary } from "../components/ErrorBoundary";



export const AuthRoute = () => {    
    const {userData} = useUserDetails();

    if(!userData){
        return (
            <ErrorBoundary key="auth_outlet" id="auth_outlet">
                <Outlet/>
            </ErrorBoundary>
        )
    }

    return <Navigate to={'/plans'} replace/>
    
}