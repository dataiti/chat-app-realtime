import { User } from "~/types/user";

export interface LoginFormValues {
     email: string;
     password: string;
}

export interface RegisterFormValues {
     email: string;
     firstname: string;
     lastname: string;
     password: string;
}

export interface CredentialResponse {
     status: string;
     message: string;
     data: User;
     accessToken: string | null;
     refreshToken: string | null;
}

export interface GetMeResponse {
     status: string;
     message: string;
     data: User;
}

export interface SearchUserResponse {
     status: string;
     message: string;
     data: User[];
}
