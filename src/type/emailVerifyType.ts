

export interface emailApiPayloadType {
    email? : string;
    phone_number? : string;
};


export interface emailVerifyApiResponseType {
    ok : boolean;
    message : string
}