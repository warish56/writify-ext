import { ServerError } from "@/types/api";
import { ApiResponse } from "../types/api";
import { getTokenFromStorage } from "./token";
import { logoutUser } from "./worker";


export const fetchData = async <T>(url: string, init: RequestInit) => {
    try{
        const apiUrl = import.meta.env.VITE_API_URL;
        const token = await getTokenFromStorage()
        const response = await fetch(apiUrl + url, {
            ...init,
            headers:{
                ...(init.headers ?? {}),
                'Content-Type': 'application/json',
                ...(token? {'Authorization': `Bearer ${token}`}: {})
            }
        });
        if(response.status === 401){
            // means user token has expired
            await logoutUser();
        }
        const json = await response.json() as Awaited<ApiResponse<T>>;
        return [json.data as T, json.error as ServerError || null] as [T, ServerError | null]
    } catch (error: unknown) {
        console.log(error)
        return ([null, (error as Error)?.message || error]) as [null, ServerError | null]
    }
}