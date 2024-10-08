import { ssrTable, SSRTableProps } from '../constructs/table.construct';

const accountsTableProps: SSRTableProps = {
    tableName: 'account',
    dynamoArgs: {
        fields: {
            id: 'string',
            name: 'string',
            salesforceId: 'string',
        },
        primaryIndex: { hashKey: 'id' },
        globalIndexes: {
            NameSalesforceIdIndex: {
                hashKey: 'name',
                rangeKey: 'salesforceId',
                projection: 'all',
            },
        },
    },
};

export const accountsTable = ssrTable(accountsTableProps);
