import { useEffect, useState } from "react"
import { User } from "../types/user";
import { sendMessageToWorker } from "../utils";
import { BG_GET_USER_DETAILS } from "../constants/worker";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/user";

type response = {
    success: boolean;
    data: User
}

export const useUserDetails = () => {
    const [isLoading ,setLoading] = useState(false);
    const [userData, setUserData] = useAtom(userAtom);

    const fetchUserDetails = async () => {
        setLoading(true);
        const result = await sendMessageToWorker<response>(BG_GET_USER_DETAILS);
        const {success, data} = result;
        if(success){
            setUserData(data);
        }
        setLoading(false);
    }

    useEffect(() => {
        if(!userData){
            fetchUserDetails();
        }
    }, [])

    return {
        userData,
        isLoading,
        fetchUserDetails
    }
}