
export type ServerError = {
    message: string
}

export type ApiResponse<T> = {
    data: T;
    error?: ServerError
}