import api from "./api";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    userId: string;
    username: string;
    role: string[];
}

class AuthService {
    private BASE_URL = '/auth';
    login(credentials: LoginRequest) {
        return api.post<LoginResponse>(`${this.BASE_URL}/login`, credentials)

    }
}

export default new AuthService();
