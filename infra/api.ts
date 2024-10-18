import { ApiGatewayV1 } from '../.sst/platform/src/components/aws';
import { SSRApiGatewayRoute, ssrApiGatewayV1, SSRApiGatewayV1Props } from './constructs/api-gateway.construct';
import { accountsTable } from './table';

// API Gateway Routes Configuration.
const getAccountsRoutes: SSRApiGatewayRoute = {
    routePath: 'GET /accounts',
    functionName: 'GetAccountsFunction',
    functionArgs: {
        handler: 'src/handlers/get-all-accounts/index.handler',
        link: [accountsTable],
    },
};

const routes: SSRApiGatewayRoute[] = [getAccountsRoutes];

// API Gateway V1 with routes Configuration
const accountsServiceProps: SSRApiGatewayV1Props = {
    sstResourceName: 'VisionAccountsService',
    routes,
};

const accountsService: sst.aws.ApiGatewayV1 = ssrApiGatewayV1('VisionAccountsAPI', accountsServiceProps);

// Deploy API Gateway to Stage
accountsService.deploy();

export default {
    api: accountsService.url,
    tableName: accountsTable.name,
};
