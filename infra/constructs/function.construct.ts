import { FunctionArgs } from '../../.sst/platform/src/components/aws';

export type SSRFunctionProps = {
    functionName: string;
    functionArgs: FunctionArgs;
};

export const ssrFunction = (props: SSRFunctionProps) => {
    const { functionName, functionArgs }: { functionName: string; functionArgs: FunctionArgs } = props;
    return new sst.aws.Function(functionName, {
        memory: '128 MB',
        runtime: 'nodejs20.x',
        timeout: '30 seconds',
        ...functionArgs,
    });
};
