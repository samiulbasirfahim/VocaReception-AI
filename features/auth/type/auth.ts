export type LoginPaylod = {
    username: string;
    password: string;
};

export type LoginResponse = {
    access_token: string;
    refresh_token: string;
    token_type: string;
    user: {
        email: string;
        id: number;
        is_active: boolean;
        created_at: string;
    };
};
