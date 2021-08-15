export interface IUser {
    id: string;
    email: string;
    firstName: string;
    token: string;
    lastName?: string;
    gender?: string;
    phoneNumber?: string;
    address?: string;
    password?: string;
}