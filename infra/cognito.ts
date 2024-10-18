import { FunctionArgs } from '../.sst/platform/src/components/aws';
import { ssrCognitoUserPool } from './constructs/cognito-user-pool.construct';

export default ssrCognitoUserPool('TestUserPool', {
    sstResourceName: 'CognitoTestUserPool',
    args: {
        triggers: {
            preSignUp: {
                handler: 'src/handlers/pre-signup.handler',
            } as FunctionArgs,
        },
    },
});
