export type Message = {
    code: number;
    shortMsg: string;
    longMsg: string;
    errorDetails: Record<string, any>;
};

export type SuccessMessage<T> = {
    statusCode: number;
    data: T;
};

export type ErrorMessage = {
    statusCode: number;
    msg: Message;
};
