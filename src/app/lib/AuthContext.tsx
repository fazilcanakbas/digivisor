"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// User tipi tanımlaması
interface User {
  id: string;
  email: string;
  agencyName: string;
  packageId: number;
  agency?: {
    id: string;
    name: string;
    subdomain: string;
    customDomain?: string;
    themeId?: number;
    colors?: string[];
  };
}

// Context içeriğinin tipi
interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, agencyName: string, packageId: number) => Promise<void>;
  logout: () => void;
}

// Default context değeri
const defaultContextValue: AuthContextType = {
  user: null,
  token: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
};

// Context oluşturulması
const AuthContext = createContext<AuthContextType>(defaultContextValue);

// Custom hook
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Sayfa yüklendiğinde localStorage'dan kullanıcı bilgilerini alma
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    
    setLoading(false);
  }, []);

  // Login fonksiyonu
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      setUser(response.data.user);
      setToken(response.data.token);
      
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error('Login hatası:', error);
      throw error;
    }
  };

  // Register fonksiyonu
  const register = async (email: string, password: string, agencyName: string, packageId: number) => {
    try {
      const response = await axios.post('/api/auth/register', { 
        email, 
        password, 
        agencyName, 
        packageId 
      });
      
      setUser(response.data.user);
      setToken(response.data.token);
      
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error('Kayıt hatası:', error);
      throw error;
    }
  };

  // Logout fonksiyonu
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;