import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { getAllAccounts } from '../integrations/dynamodb/clients/get-all-accounts.client';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('--------> event', JSON.stringify(event, null, 2));

    try {
        const accounts = await getAllAccounts();
        return {
            body: JSON.stringify(accounts),
            statusCode: 200,
        };
    } catch (error: unknown) {
        return {
            body: JSON.stringify({
                message: 'Internal Server Error',
                error: (error as Error).message,
            }),
            statusCode: 500,
        };
    }
};
