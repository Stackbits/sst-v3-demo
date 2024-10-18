import { PreSignUpTriggerEvent, PreSignUpTriggerHandler } from 'aws-lambda';

export const handler: PreSignUpTriggerHandler = async (
    event: PreSignUpTriggerEvent
): Promise<PreSignUpTriggerEvent> => {
    console.log('>>>>>> presignup >>>>>>', JSON.stringify(event, null, 2));
    return event;
};
