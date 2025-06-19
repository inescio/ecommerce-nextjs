'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  addresses?: Address[];
}

interface Address {
  id: number;
  name: string;
  street: string;
  city: string;
  zipCode: string;
  default?: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

type AuthAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: Partial<User> };

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false };
    case 'UPDATE_USER':
      return { 
        ...state, 
        user: state.user ? { ...state.user, ...action.payload } : null 
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false
  });

  const login = (email: string, password: string) => {
    const user: User = {
      id: 1,
      name: 'Usuario Demo',
      email: email,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      addresses: [
        {
          id: 1,
          name: 'Casa',
          street: 'Calle Principal 123',
          city: 'Madrid',
          zipCode: '28001',
          default: true
        }
      ]
    };
    dispatch({ type: 'LOGIN', payload: user });
    return true;
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
};