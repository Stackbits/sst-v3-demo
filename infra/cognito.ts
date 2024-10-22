import { ssrCognitoUserPool } from './constructs/cognito-user-pool.construct';

export default ssrCognitoUserPool('TestUserPool', {
    sstResourceName: 'CognitoTestUserPool',
    args: {
        triggers: {
            // preSignUp: {
            //     handler: 'src/handlers/pre-signup.handler',
            // } as FunctionArgs,
            preTokenGenerationVersion: 'v2',
            preTokenGeneration: {
                handler: 'src/handlers/pre-token-generation.handler',
            },
        },
        advancedSecurity: 'enforced',
    },
});
