import { DEFAULT_FUNCTION_CONFIG } from '../utils/constants/default-function-config.constant';

import { constructName } from '../utils/construct-name.util';

export type SSRFunctionProps = {
    sstResourceName: string;
    args: Omit<sst.aws.FunctionArgs, 'dev' | 'live' | 'injections' | 'url' | 'name' | 'transform'>;
};

/**
 * `SSR Function Construct`
 *
 * ``This reusable construct creates an AWS Lambda with a default configuration, which can be overridden.``
 * ```
 * Default configuration:
 * - memory: 128 MB
 * - runtime: nodejs20.x
 * - timeout: 30 seconds
 * ```
 *
 * @param name - This is the name of the Lambda resource in AWS.
 * @param props - This is a set of properties used to configure the AWS Lambda.
 * @returns An instance of AWS Lambda.
 */
export const ssrFunction = (name: string, props: SSRFunctionProps): sst.aws.Function => {
    const { sstResourceName, args } = props;
    return new sst.aws.Function(sstResourceName, {
        name: constructName(name),
        ...DEFAULT_FUNCTION_CONFIG,
        ...args,
    });
};
