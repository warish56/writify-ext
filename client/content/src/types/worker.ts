

export type WorkerResponse<T> = {
    success: boolean;
    error? : Error;
    data:T
}