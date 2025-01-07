
export type ServerError = {
    message: string,
    redirectLink?: string;
}

export type ApiResponse<T> = {
    data: T;
    error?: ServerError
}