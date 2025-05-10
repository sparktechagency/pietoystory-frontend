export interface UserProfile {
        id: number,
        full_name: string,
        email: string,
        email_verified_at: string,
        phone_number: string,
        contact: string,
        home_address: string,
        city: string,
        state: string,
        dog_names: string,
        avatar: string,
        status: string,
        otp_verified_at: string,
        otp: number,
        otp_expires_at: string,
        referral_code: string,
        referred_by: string,
        created_at: string,
        updated_at: string
};

export interface UserProfileApiResponse {
    ok : boolean;
    message : string;
    data : UserProfile
};