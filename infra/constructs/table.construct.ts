import { dynamodb } from '@pulumi/aws';
import { constructName } from '../utils/construct-name.util';

type TableTransformArgs = Pick<
    dynamodb.TableArgs,
    'billingMode' | 'deletionProtectionEnabled' | 'readCapacity' | 'writeCapacity'
>;

export type SSRTableProps = {
    sstResourceName: string;
    args: Omit<sst.aws.DynamoArgs, 'transform'> & TableTransformArgs;
};

/**
 * `SSR DynamoDB Table Construct`
 *
 * ``This reusable construct creates an AWS DynamoDB table with a default configuration, which can be overridden.``
 * ```
 * Default configuration:
 * - billingMode: 'PAY_PER_REQUEST'
 * ```
 *
 * @param name - This is the name of the DynamoDB Table in AWS.
 * @param props - This is a set of properties used to configure the AWS DynamoDB Table.
 * @returns An instance of AWS DynamoDB table.
 */
export const ssrTable = (name: string, props: SSRTableProps): sst.aws.Dynamo => {
    const {
        sstResourceName,
        args: {
            fields,
            primaryIndex,
            globalIndexes,
            localIndexes,
            stream,
            billingMode,
            deletionProtectionEnabled,
            readCapacity,
            ttl,
            writeCapacity,
        },
    } = props;

    return new sst.aws.Dynamo(sstResourceName, {
        fields,
        primaryIndex,
        globalIndexes,
        localIndexes,
        stream,
        ttl,
        transform: {
            table: {
                name: constructName(name),
                billingMode: billingMode || 'PAY_PER_REQUEST',
                deletionProtectionEnabled,
                readCapacity,
                writeCapacity,
            },
        },
    });
};
