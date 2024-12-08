import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Define the context type
interface AuthContextType {
  isAuthenticated: boolean;
  logout: () => void;
}

// Create the context with the initial value
const AuthContext = createContext<AuthContextType>({ isAuthenticated: false, logout: () => {} });

// Define the props for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
