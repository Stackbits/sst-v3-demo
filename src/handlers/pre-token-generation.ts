import {
    PreTokenGenerationV2TriggerEvent,
    PreTokenGenerationV2TriggerHandler,
} from 'aws-lambda';

type RolesAndPermissions = {
    [role: string]: {
        permissions: Array<string>;
    };
};

const fetchRolesAndPermissions = (_userName: string): RolesAndPermissions => {
    // TODO: Add logic to fetch user roles and permissions

    // Returning a dummy role set as of now
    return {
        admin: {
            permissions: ['read:users', 'write:users', 'delete:users'],
        },
        editor: {
            permissions: ['read:articles', 'write:articles'],
        },
        viewer: {
            permissions: ['read:articles'],
        },
    };
};

export const handler: PreTokenGenerationV2TriggerHandler = async (
    event: PreTokenGenerationV2TriggerEvent,
): Promise<PreTokenGenerationV2TriggerEvent> => {
    console.log('PreTokenGenerationV2 event: ', JSON.stringify(event, null, 2));

    // Modify the claims in the accessToken and idToken by overriding the claims
    // Add custom roles and permissions to the access token
    event.response.claimsAndScopeOverrideDetails = {
        accessTokenGeneration: {
            claimsToAddOrOverride: {
                // Directly casting or converting the return type of fetchRolesAndPermissions
                roles: fetchRolesAndPermissions(
                    event.userName,
                ) as unknown as string,
            },
        },
    };

    // Return the modified event object so Cognito can generate the token with custom claims
    return event;
};
