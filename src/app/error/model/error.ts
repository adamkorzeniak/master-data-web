export interface IError {
    id?: number;
    appId: string;
    errorId: string;
    name: string;
    details: string;
    time: number;
    url: string;
    status: string;
    stack: string;
}
