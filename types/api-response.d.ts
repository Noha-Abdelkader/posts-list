export type FailerResponse = {
    status : 400 | 404 | 500
};

export type SuccessResponse<T> = {
    status : 200
}&T;

export type ApiResponse<T> = SuccessResponse<T> | FailerResponse;


