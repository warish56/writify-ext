import { useState } from "react"
import { sendMessageToWorker } from "../utils";
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/user";
import { WorkerResponse } from "@/types/worker";
import { User } from "@/types/user";
import { BG_FETCH_USER_DETAILS, BG_GET_USER_DETAILS } from "@/constants";
import { ServerError } from "@/types/api";


export const useUserDetails = () => {
    const [isLoading ,setLoading] = useState(false);
    const [userData, setUserData] = useAtom(userAtom);


    const fetchUserDetails= async () => {
        setLoading(true);
        const result = await sendMessageToWorker<WorkerResponse<[User|null, ServerError]>>(BG_FETCH_USER_DETAILS);
        const {success, data:userResponse} = result;
        if(success){
            const [actualData] = userResponse;
            setUserData(actualData);
        }
        setLoading(false);
    }


    const getUserDetailsFromStore = async () => {
        setLoading(true);
        const result = await sendMessageToWorker<WorkerResponse<User|null>>(BG_GET_USER_DETAILS);
        const {success, data:userResponse} = result;
        if(success){
            setUserData(userResponse);
        }
        setLoading(false);
    }

    return {
        userData,
        isAccountSuspended: userData?.account.status === 'SUSPENDED',
        isLoading,
        getUserDetailsFromStore,
        fetchUserDetails
    }
}