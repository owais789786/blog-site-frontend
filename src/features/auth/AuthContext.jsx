import { createContext, useContext, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../../api/axiosInstance';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const queryClient = useQueryClient();
    
    const { data, isLoading } = useQuery({
        queryKey: ['authUser'],
        queryFn: async () => {
            const { data } = await axiosInstance.get('/auth/me');
            return data.user;
        },
        retry: false,
    });

    const logout = async () => {
        try {
            await axiosInstance.get('/auth/logout');
            queryClient.setQueryData(['authUser'], null);
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user: data || null, isLoading, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);

