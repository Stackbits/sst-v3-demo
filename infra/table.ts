import { cgxTable, CGXTableProps } from './constructs/table.construct';

const accountsTableProps: CGXTableProps = {
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

export const accountsTable = cgxTable('account', accountsTableProps);
