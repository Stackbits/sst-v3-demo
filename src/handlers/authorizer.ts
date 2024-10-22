import {
    APIGatewayAuthorizerResult,
    APIGatewayTokenAuthorizerEvent,
    APIGatewayTokenAuthorizerHandler,
} from 'aws-lambda';
import jwt from 'jsonwebtoken';
import JwksClient from 'jwks-rsa';

export const getToken = (event: APIGatewayTokenAuthorizerEvent) => {
    if (!event.type || event.type !== 'TOKEN') {
        throw new Error(
            'Expected "event.type" parameter to have value "TOKEN"',
        );
    }

    const tokenString = event.authorizationToken;
    if (!tokenString) {
        throw new Error(
            'Expected "event.authorizationToken" parameter to be set',
        );
    }

    const match = RegExp(/^Bearer (.*)$/).exec(tokenString);
    if (!match || match.length < 2) {
        throw new Error(
            `Invalid Authorization token - ${tokenString} does not match "Bearer .*"`,
        );
    }
    return match[1];
};

const jwtOptions = {
    audience: process.env.AUDIENCE,
    issuer: process.env.TOKEN_ISSUER,
};

const client = JwksClient({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10, // Default value
    jwksUri: process.env.JWKS_URI ?? '',
});

export const handler: APIGatewayTokenAuthorizerHandler = async (event) => {
    try {
        const token = getToken(event);

        const decoded = jwt.decode(token, { complete: true });
        if (!decoded?.header?.kid) {
            throw new Error('invalid token');
        }

        const key = await client.getSigningKey(decoded.header.kid);

        const signingKey = key.getPublicKey();
        const verified = jwt.verify(
            token,
            signingKey,
            jwtOptions,
        ) as jwt.JwtPayload;

        if (!verified?.sub || !verified?.scope) {
            throw new Error('invalid token');
        }

        const policy = generatePolicy(
            verified.sub,
            'Allow',
            event.methodArn,
            verified.scope,
        );

        return policy;
    } catch (err) {
        throw new Error('Unauthorized');
    }
};

export function generatePolicy(
    principalId: string,
    effect: string,
    resource: string,
    scope: string,
): APIGatewayAuthorizerResult {
    const authResponse: APIGatewayAuthorizerResult = {
        principalId,
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: effect,
                    Resource: resource,
                },
            ],
        },
        context: { scope },
    };
    return authResponse;
}
