import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Resource } from 'sst';

export const dynamoDBClient = new DocumentClient();
export const TABLE_NAME = Resource.AccountsDynamoDB.name;
