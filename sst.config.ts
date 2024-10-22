/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
    app(input) {
        return {
            name: 'sst-v3-poc',
            removal: input?.stage === 'production' ? 'retain' : 'remove',
            home: 'aws',
            providers: {
                aws: {
                    version: '6.27.0',
                    region: 'ap-south-1',
                    defaultTags: {
                        tags: {
                            env: process.env.ENVIRONMENT || '',
                            stage: process.env.STAGE || '',
                            application: process.env.APPLICATION || '',
                        },
                    },
                },
            },
        };
    },
    async run() {
        // const accountsService = await import('./infra/api');

        // return {
        //     ...accountsService,
        // };
        await import('./infra/cognito');
    },
});
