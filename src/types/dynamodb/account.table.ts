/**
 * `account` DynamoDB Table
 */
export type Account = {
    id: string;
    name: string;
    address: string;
    state: string;
    country: string;
    zip: string; // TODO: Need to check type for zip.
    telephone: string; // TODO: Need to check type for telephone.
    emergency_telephone: string;
    fax: string;
    mobile: string;
    website: string;
    type: string;
    createdDate: string;
    lastUpdated: string;
    lastUpdatedBy: string;
    geolocation: string;
    users: Array<Record<string, any>>; // TODO: Add a type for users based on user object structure.
    projects: Array<Record<string, any>>; // TODO: Add a type for projects based on project object structure.
    salesforceId: string;
    deleted: boolean;
};
