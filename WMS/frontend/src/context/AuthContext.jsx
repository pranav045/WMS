import React, { createContext, useState, useContext, useEffect } from 'react';
import API from "../api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await API.get("/auth/me");

      if (response.data.success) {
        setUser(response.data.user);
      } else {
        logout();
      }

    } catch (err) {
      console.error("Auth check failed:", err.response?.data || err.message);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete API.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error, setError }}>
      {children}
    </AuthContext.Provider>
  );
};
