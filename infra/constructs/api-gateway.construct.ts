import { DEFAULT_FUNCTION_CONFIG } from '../utils/constants/default-function-config.constant';
import { constructName } from '../utils/construct-name.util';

export type CGXApiGatewayRoute = {
    routePath: string;
    functionName: string;
    functionArgs: Omit<sst.aws.FunctionArgs, 'dev' | 'live' | 'injections' | 'url' | 'name' | 'transform' | 'nodejs'>;
};

export type CGXApiGatewayV1Props = {
    sstResourceName: string;
    routes: CGXApiGatewayRoute[];
    args?: Omit<sst.aws.ApiGatewayV1Args, 'transform'>;
    // TODO: add authorizer args and api key args
};

/**
 * `CGX API Gateway V1 Construct`
 *
 * ``This reusable construct creates an AWS REST Api Gateway with a default configuration, which can be overridden.``
 * ```
 * Default configuration for Route Functions:
 * - memory: 128 MB
 * - runtime: nodejs20.x
 * - timeout: 30 seconds
 * - nodejs: { // can't be overridden as of now
        splitting: true,
        format: 'esm',
        esbuild: {
            treeShaking: true,
        }
     }
 * ```
 *
 * @param name - This is the name of the Rest API ApiGateway resource in AWS.
 * @param props - This is a set of properties used to configure the AWS Rest Api ApiGatewayV1.
 * @returns An instance of AWS Rest Api Gateway, with configures routes.
 */
export const cgxApiGatewayV1 = (name: string, props: CGXApiGatewayV1Props): sst.aws.ApiGatewayV1 => {
    const { sstResourceName, args, routes } = props;
    const apiGateway: sst.aws.ApiGatewayV1 = new sst.aws.ApiGatewayV1(sstResourceName, {
        ...(args || {}),
        transform: {
            api: {
                name: constructName(name),
            },
        },
    });

    routes.forEach((route) => {
        apiGateway.route(route.routePath, {
            name: constructName(route.functionName),
            ...DEFAULT_FUNCTION_CONFIG,
            ...route.functionArgs,
        });
    });

    return apiGateway;
};
