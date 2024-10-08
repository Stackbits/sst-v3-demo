import { ApiGatewayV1, ApiGatewayV1Args } from '../../.sst/platform/src/components/aws';

export type SSRApiGatewayProps = {
    gatewayName: string;
    gatewayArgs: ApiGatewayV1Args;
};

export const ssrApiGateway = (props: SSRApiGatewayProps): ApiGatewayV1 => {
    const { gatewayName, gatewayArgs }: { gatewayName: string; gatewayArgs: ApiGatewayV1Args } = props;
    return new ApiGatewayV1(gatewayName, {
        ...gatewayArgs,
    });
};
