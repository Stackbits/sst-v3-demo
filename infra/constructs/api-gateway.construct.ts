import { ApiGatewayV1, ApiGatewayV1Args } from '../../.sst/platform/src/components/aws';

export type SSRApiGatewayProps = {
    resourceName: string;
    gatewayName: string;
    gatewayArgs?: ApiGatewayV1Args;
};

export const ssrApiGateway = (props: SSRApiGatewayProps): ApiGatewayV1 => {
    const {
        resourceName,
        gatewayName,
        gatewayArgs,
    }: { resourceName: string; gatewayName: string; gatewayArgs?: ApiGatewayV1Args } = props;
    return new ApiGatewayV1(resourceName, {
        ...gatewayArgs,
        transform: {
            ...(gatewayArgs?.transform ? gatewayArgs.transform : {}),
            api: {
                name: gatewayName,
                ...(gatewayArgs?.transform?.api ? gatewayArgs.transform.api : {}),
            },
        },
    });
};
