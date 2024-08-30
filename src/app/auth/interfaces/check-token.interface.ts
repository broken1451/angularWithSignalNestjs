export interface CheckTokenResponse {
    user:  User;
    token: string;
}

export interface User {
    _id:      string;
    name:     string;
    email:    string;
    isActive: boolean;
    roles:    string[];
    created:  Date;
    __v:      number;
}
