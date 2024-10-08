import { ApiGatewayV1, FunctionArgs } from '../../.sst/platform/src/components/aws';
import { ssrApiGateway, SSRApiGatewayProps } from '../constructs/api-gateway.construct';
import { SSRFunctionProps } from '../constructs/function.construct';
import { accountsTable } from './accounts-table.stack';

const getAccountsFunctionProps: SSRFunctionProps = {
    functionName: 'GetAccountsFunction',
    functionArgs: {
        handler: 'packages/accounts-service/src/handlers/get-all-accounts.handler',
        link: [accountsTable],
    },
};

const accountsServiceProps: SSRApiGatewayProps = {
    gatewayName: 'VisionAccountsAPI',
    gatewayArgs: {},
};

const accountsService: ApiGatewayV1 = ssrApiGateway(accountsServiceProps);

accountsService.route('GET /accounts', {
    ...getAccountsFunctionProps.functionArgs,
    name: getAccountsFunctionProps.functionName,
} as FunctionArgs);

accountsService.deploy();

export default {
    api: accountsService.url,
    tableName: accountsTable.name,
};
