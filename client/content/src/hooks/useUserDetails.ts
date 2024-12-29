import { useEffect, useState } from "react"
import { sendMessageToWorker } from "../utils";
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/user";
import { WorkerResponse } from "@/types/worker";
import { User } from "@/types/user";
import { BG_GET_USER_DETAILS } from "@/constants";


export const useUserDetails = () => {
    const [isLoading ,setLoading] = useState(false);
    const [userData, setUserData] = useAtom(userAtom);


    const getUserDetailsFromStore = async () => {
        setLoading(true);
        const result = await sendMessageToWorker<WorkerResponse<User|null>>(BG_GET_USER_DETAILS);
        const {success, data:userResponse} = result;
        if(success){
            setUserData(userResponse);
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
        isAccountSuspended: userData?.account.status === 'SUSPENDED',
        isLoading,
        getUserDetailsFromStore,
    }
}