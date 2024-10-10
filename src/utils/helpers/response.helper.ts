import { APIGatewayProxyResult } from 'aws-lambda';
import { ErrorMessage, SuccessMessage } from '../../types/common/message.type';

export const successResponseHelper = <T>(successMessage: SuccessMessage<T>): APIGatewayProxyResult => {
    return {
        statusCode: successMessage.statusCode,
        body: JSON.stringify(successMessage.data),
    };
};

export const errorResponseHelper = (errorMessage: ErrorMessage): APIGatewayProxyResult => {
    return {
        statusCode: errorMessage.statusCode,
        body: JSON.stringify({ msg: errorMessage.msg }),
    };
};
