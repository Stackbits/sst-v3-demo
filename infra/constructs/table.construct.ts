import { DynamoArgs } from '../../.sst/platform/src/components/aws';

export type SSRTableProps = {
    resourceName: string;
    tableName: string;
    dynamoArgs: DynamoArgs;
};

export const ssrTable = (props: SSRTableProps) => {
    const { resourceName, tableName, dynamoArgs }: { resourceName: string; tableName: string; dynamoArgs: DynamoArgs } =
        props;
    return new sst.aws.Dynamo(resourceName, {
        ...dynamoArgs,
        transform: {
            ...(dynamoArgs?.transform ? dynamoArgs.transform : {}),
            table: {
                billingMode: 'PAY_PER_REQUEST',
                name: tableName,
                ...(dynamoArgs?.transform?.table ? dynamoArgs.transform.table : {}),
            },
        },
    });
};
