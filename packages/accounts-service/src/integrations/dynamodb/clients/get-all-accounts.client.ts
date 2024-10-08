import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { dynamoDBClient, TABLE_NAME } from '../dynamodb.adapter';

export const getAllAccounts = async (): Promise<DocumentClient.ItemList> => {
    const params: DocumentClient.ScanInput = {
        TableName: TABLE_NAME,
        FilterExpression: '#deleted = :deleted',
        ExpressionAttributeNames: {
            '#deleted': 'deleted',
        },
        ExpressionAttributeValues: {
            ':deleted': false,
        },
    };

    console.log('>>>>> getAllAccounts, ', TABLE_NAME, dynamoDBClient);

    try {
        const result: DocumentClient.ScanOutput = await dynamoDBClient.scan(params).promise();
        return result.Items || [];
    } catch (error) {
        throw new Error('Could not retrieve accounts.');
    }
};
