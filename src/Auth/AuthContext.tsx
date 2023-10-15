// AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import React from "react";
// interface User {
//   username: string;
//   // Add other user-related properties here
// }

interface AuthContextType {
//   user: User | null;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const login = () => {
    // setUser(user);
    console.log("AuthContext: login");
    setIsLoggedIn(true);
  };

  const logout = () => {
    // setUser(null);
    console.log("AuthContext: logout");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{  isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}