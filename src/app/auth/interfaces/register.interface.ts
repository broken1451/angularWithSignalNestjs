export interface RegisterInterface {
    name: string;
    email: string;
    password: string;
 }


 export interface RegisterResponse {
    user:  User;
    token: string;
}

export interface User {
    _id:      string;
    name:     string;
    email:    string;
    password: string;
    isActive: boolean;
    roles:    string[];
    created:  Date;
    __v:      number;
}
