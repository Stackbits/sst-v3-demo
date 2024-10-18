import { CognitoUserPool, CognitoUserPoolArgs, Function, FunctionArgs } from '../../.sst/platform/src/components/aws';
import { DEFAULT_FUNCTION_CONFIG } from '../utils/constants/default-function-config.constant';

import { constructName } from '../utils/construct-name.util';

export type SSRCognitoUserPoolProps = {
    sstResourceName: string;
    args: Omit<CognitoUserPoolArgs, 'usernames' | 'transform'>;
};

export const ssrCognitoUserPool = (name: string, props: SSRCognitoUserPoolProps): CognitoUserPool => {
    const { sstResourceName, args } = props;
    const cognitoUserPool: CognitoUserPool = new CognitoUserPool(sstResourceName, {
        ...args,
        transform: {
            userPool: {
                name: constructName(name),
            },
        },
    });

    cognitoUserPool.addClient('test_user_pool_client');

    return cognitoUserPool;
};
