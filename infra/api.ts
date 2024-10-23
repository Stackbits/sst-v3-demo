import { CGXApiGatewayRoute, cgxApiGatewayV1, CGXApiGatewayV1Props } from './constructs/api-gateway.construct';
import { accountsTable } from './table';

// API Gateway Routes Configuration.
const getAccountsRoutes: CGXApiGatewayRoute = {
    routePath: 'GET /accounts',
    functionName: 'GetAccountsFunction',
    functionArgs: {
        handler: 'src/handlers/get-all-accounts/index.handler',
        link: [accountsTable],
    },
};

const routes: CGXApiGatewayRoute[] = [getAccountsRoutes];

// API Gateway V1 with routes Configuration
const accountsServiceProps: CGXApiGatewayV1Props = {
    sstResourceName: 'VisionAccountsService',
    routes,
};

const accountsService: sst.aws.ApiGatewayV1 = cgxApiGatewayV1('VisionAccountsAPI', accountsServiceProps);

// Deploy API Gateway to Stage
accountsService.deploy();

export default {
    api: accountsService.url,
    tableName: accountsTable.name,
};
