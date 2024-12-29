import { useEffect, useState } from "react"
import { User } from "../types/user";
import { sendMessageToWorker } from "../utils";
import { BG_FETCH_USER_DETAILS, BG_GET_USER_DETAILS } from "../constants/worker";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/user";
import { WorkerResponse } from "../types/worker";
import { ServerError } from "../types/api";


export const useUserDetails = () => {
    const [isLoading ,setLoading] = useState(false);
    const [userData, setUserData] = useAtom(userAtom);

    const fetchUserDetailsFromServer = async () => {
        setLoading(true);
        const result = await sendMessageToWorker<WorkerResponse<[User|null, ServerError]>>(BG_FETCH_USER_DETAILS, {email:userData?.email});
        const {success, data} = result;
        if(success){
            const [actualData] = data
            setUserData(actualData);
        }
        setLoading(false);
    }

    const getUserDetailsFromStore = async () => {
        setLoading(true);
        const result = await sendMessageToWorker<WorkerResponse<User|null>>(BG_GET_USER_DETAILS);
        const {success, data} = result;
        if(success){
            setUserData(data);
        }
        setLoading(false);
    }

    useEffect(() => {
        if(!userData){
            getUserDetailsFromStore();
        }
    }, [])

    return {
        userData,
        isLoading,
        isAccountSuspended: userData?.account.status === 'SUSPENDED',
        getUserDetailsFromStore,
        fetchUserDetailsFromServer
    }
}