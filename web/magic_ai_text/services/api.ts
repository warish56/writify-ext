import { ApiResponse, ServerError } from "@/types/api";


export const fetchData = async <T>(url: string, init: RequestInit) => {
    try{
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(apiUrl + url, {
            ...init,
            headers:{
                ...(init.headers ?? {}),
                'Content-Type': 'application/json',
            }
        });
        const json = await response.json() as Awaited<ApiResponse<T>>;
        return [json.data as T, json.error as ServerError || null] as [T, ServerError | null]
    } catch (error: unknown) {
        console.log(error)
        return ([null, (error as Error)?.message || error]) as [null, ServerError | null]
    }
}