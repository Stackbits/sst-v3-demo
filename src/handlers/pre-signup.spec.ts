import { describe, it, expect, vi } from 'vitest';
import { handler } from './pre-signup';
import { PreSignUpTriggerEvent, Context } from 'aws-lambda';

describe('PreSignUpTriggerHandler', () => {
    it('should return the event and log it', async () => {
        // Mocking console.log
        const consoleLogSpy = vi
            .spyOn(console, 'log')
            .mockImplementation(() => {});

        // Mock event
        const mockEvent: PreSignUpTriggerEvent = {
            version: '1',
            region: 'us-east-1',
            userPoolId: 'us-east-1_example',
            userName: 'testuser',
            callerContext: {
                awsSdkVersion: 'aws-sdk-js-2.1',
                clientId: 'client123',
            },
            request: {
                userAttributes: {
                    email: 'test@example.com',
                },
                validationData: {},
            },
            response: {
                autoConfirmUser: false,
                autoVerifyEmail: false,
                autoVerifyPhone: false,
            },
            triggerSource: 'PreSignUp_AdminCreateUser',
        };

        // Mock context (this can be empty or you can provide values)
        const mockContext: Context = {
            functionName: 'test-function',
            functionVersion: '1',
            invokedFunctionArn:
                'arn:aws:lambda:us-east-1:123456789012:function:test-function',
            memoryLimitInMB: '128',
            awsRequestId: 'test-request-id',
            logGroupName: '/aws/lambda/test-function',
            logStreamName: '2024/10/21/[$LATEST]abcdefg1234567',
            getRemainingTimeInMillis: () => 1000,
            callbackWaitsForEmptyEventLoop: false,
            done: () => {},
            fail: () => {},
            succeed: () => {},
        };

        // Invoke the handler
        const result = await handler(mockEvent, mockContext, () => {});

        // Assertions
        expect(result).toEqual(mockEvent); // Check if the handler returns the correct event
        expect(consoleLogSpy).toHaveBeenCalledWith(
            '>>>>>> presignup >>>>>>',
            JSON.stringify(mockEvent, null, 2),
        ); // Check if the log was called with the right parameters

        // Cleanup
        consoleLogSpy.mockRestore();
    });
});
