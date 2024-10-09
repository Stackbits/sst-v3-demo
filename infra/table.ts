import { ssrTable, SSRTableProps } from './constructs/table.construct';

const accountsTableProps: SSRTableProps = {
    sstResourceName: 'VisionAccountTable',
    args: {
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

export const accountsTable = ssrTable('account', accountsTableProps);
