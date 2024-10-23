import { constructName } from '../utils/construct-name.util';

export type SSRCognitoUserPoolProps = {
    sstResourceName: string;
    args: Omit<sst.aws.CognitoUserPoolArgs, 'usernames' | 'transform'>;
};

export const ssrCognitoUserPool = (
    name: string,
    props: SSRCognitoUserPoolProps,
): sst.aws.CognitoUserPool => {
    const { sstResourceName, args } = props;
    const cognitoUserPool: sst.aws.CognitoUserPool = new sst.aws.CognitoUserPool(
        sstResourceName,
        {
            ...args,
            transform: {
                userPool: {
                    name: constructName(name),
                },
            },
        },
    );

    cognitoUserPool.addClient('test_user_pool_client');

    return cognitoUserPool;
};
