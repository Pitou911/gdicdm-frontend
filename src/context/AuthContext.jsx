import { createContext, useContext, useState } from 'react';

const API = 'http://localhost:8000/api';
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem('admin_token'));
    const [user, setUser]   = useState(() => {
        const u = localStorage.getItem('admin_user');
        return u ? JSON.parse(u) : null;
    });

    const login = async (email, password) => {
        const res = await fetch(`${API}/login`, {
            method:  'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body:    JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Login failed');
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('admin_token', data.token);
        localStorage.setItem('admin_user', JSON.stringify(data.user));
    };

    const logout = async () => {
        if (token) {
            try {
                await fetch(`${API}/logout`, {
                    method:  'POST',
                    headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
                });
            } catch {}
        }
        setToken(null);
        setUser(null);
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
