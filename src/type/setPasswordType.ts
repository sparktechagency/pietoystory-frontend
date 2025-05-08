export interface setNewPasswordPayloadType {
    email : string;
    password : string;
    password_confirmation : string
}

export interface setPasswordApiResponse {
    Ok : string;
    message : string
}