export interface otpValueType {
    otp : string;
};

export interface otpApiType {
    access_token :string;
    message : string;
    token_type : string;
    expires_in : string;
    ok : boolean
}