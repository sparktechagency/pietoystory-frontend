export interface ChangePasswordValues {
    current_password: string;
    password: string;
    password_confirmation: string;
};

export interface updatePasswordApiResponseType {
    ok : true;
    message : string
}