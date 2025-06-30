import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


interface AuthState {
    token: string | null;
    role: 'admin' | 'user' | null;
    isLoading: boolean;
    error: string | null;
    user: {
        name?: string;
        email?: string;
        avatar?: string;
    } | null;
}

const initialState: AuthState = {
    token: null,
    role: null,
    isLoading: false,
    error: null,
    user: null,
};

// Payload del JWT
interface JwtPayload {
    sub: string;
    roles: string[];
    name?: string;
    email?: string;
    avatar?: string;
}

const normalizeRole = (roles: string[] = []): 'admin' | 'user' | null => {
    const normalized = roles.map(r => r.toLowerCase());
    if (normalized.includes('role_admin')) return 'admin';
    if (normalized.includes('role_user')) return 'user';
    return null;
};


export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:8081/auth/login', {
                email,
                password,
            });
            const token = response.data.token;

            // Decodificar el token
            const decoded = jwtDecode<JwtPayload>(token);


            return {
                token,
                role: normalizeRole(decoded.roles),
                user: {
                    name: decoded.name,
                    email: decoded.email ?? email,
                    avatar: decoded.avatar ?? 'https://i.pravatar.cc/40',
                },
            };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.token = null;
            state.role = null;
            state.user = null;
            localStorage.removeItem('token');
        },
        loadUserFromStorage(state) {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const decoded = jwtDecode<JwtPayload>(token);
                    state.token = token;
                    state.role = normalizeRole(decoded.roles);
                    state.user = {
                        name: decoded.name,
                        email: decoded.email,
                        avatar: decoded.avatar ?? 'https://i.pravatar.cc/40',
                    };
                } catch {
                    state.token = null;
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.token = action.payload.token;
                state.role = action.payload.role;
                state.user = action.payload.user;
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
