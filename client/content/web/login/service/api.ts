import { ApiResponse } from "../types/api";


export const fetchData = async <T>(url: string, init: RequestInit) => {
    try{
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(apiUrl + url, {
            ...init,
            headers:{
                ...(init.headers ?? {}),
                'Content-Type': 'application/json'
            }
        });
        return response.json() as Promise<ApiResponse<T>>;
    } catch (error) {
        throw new Error('Something went wrong ...');
    }
}