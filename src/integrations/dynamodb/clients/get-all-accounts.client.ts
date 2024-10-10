import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { dynamoDBClient, TABLE_NAME } from '../dynamodb.adapter';
import { Account } from '../../../types/dynamodb/account.table';

/**
 * This method fetch list of all active (deleted = false) accounts
 *
 * @returns All `active` accounts
 */
export const getAllAccounts = async (): Promise<Account[]> => {
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

    try {
        const result: DocumentClient.ScanOutput = await dynamoDBClient.scan(params).promise();
        return (result.Items as Account[]) || [];
    } catch (error) {
        throw new Error('Could not retrieve accounts.');
    }
};
