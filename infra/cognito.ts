import { cgxCognitoUserPool } from './constructs/cognito-user-pool.construct';

export default cgxCognitoUserPool('TestUserPool', {
    sstResourceName: 'CognitoTestUserPool',
    args: {
        triggers: {
            preTokenGenerationVersion: 'v2',
            preTokenGeneration: {
                handler: 'src/handlers/pre-token-generation.handler',
            },
        },
        advancedSecurity: 'enforced',
    },
});
