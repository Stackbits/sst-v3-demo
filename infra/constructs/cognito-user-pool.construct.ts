import { constructName } from '../utils/construct-name.util';

export type CGXCognitoUserPoolProps = {
    sstResourceName: string;
    args: Omit<sst.aws.CognitoUserPoolArgs, 'usernames' | 'transform'>;
};

export const cgxCognitoUserPool = (
    name: string,
    props: CGXCognitoUserPoolProps,
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
