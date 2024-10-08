import { DynamoArgs } from '../../.sst/platform/src/components/aws';

export type SSRTableProps = {
    tableName: string;
    dynamoArgs: DynamoArgs;
};

export const ssrTable = (props: SSRTableProps) => {
    const { tableName, dynamoArgs }: { tableName: string; dynamoArgs: DynamoArgs } = props;
    return new sst.aws.Dynamo(tableName, {
        transform: {
            table: {
                billingMode: 'PAY_PER_REQUEST',
            },
        },
        ...dynamoArgs,
    });
};
