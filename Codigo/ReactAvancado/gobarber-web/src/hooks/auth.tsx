import React, { createContext, useCallback, useContext, useState } from "react";

import api from '../services/api';

interface AuthState {
    token: string,
    user: object;
}

interface User {
    id: string;
    name: string;
    avatar_url: string;
}

interface AuthContextData {
    user: object;
    signIn(credential: SignInCredentials): Promise<void>,
    signOut(): void;
}

interface SignInCredentials {
    email: string,
    password: string
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

//@ts-ignore ignora o error Type 'undefined'
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [data, setData] = useState<AuthState>(() => {

        const token = localStorage.getItem('@GoBarber:token');
        const user = localStorage.getItem('@GoBarber:user');

        if (token && user) {
            return { token, user: JSON.parse(user) }
        }

        return {} as AuthState;
    });

    const signIn = useCallback(async ({ email, password }: SignInCredentials) => {

        const response = await api.post('sessions', {
            email,
            password,
        });

        const { token, user } = response.data;

        localStorage.setItem('@GoBarber:token', token);
        localStorage.setItem('@GoBarber:user', JSON.stringify(user));

        setData({ token, user });

    }, [])

    const signOut = useCallback(() => {
        localStorage.removeItem('@GoBarber:token');
        localStorage.removeItem('@GoBarber:user');

        return {} as AuthState;
    }, []);

    return (
        <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvide')
    }

    return context;
}
