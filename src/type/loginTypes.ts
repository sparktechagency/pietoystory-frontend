import { RegistrationFormValues } from "./registrationType";

export interface loginApiPayloadType {
    email? : string;
    password : string;
    phone_number?:string;
};

export interface loginApiResponseType {
    ok : boolean;
    message : string;
    token : string;
    token_type : string;
    expires_in : string;
    user : RegistrationFormValues
}