import { createContext, useState, useContext, useEffect } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [completeProfile, setCompleteProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Verificar si hay token guardado al montar
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedCompleteProfile = localStorage.getItem("completeProfile");
    if (savedToken) {
      setToken(savedToken);
    }
    if (savedCompleteProfile) {
      setCompleteProfile(JSON.parse(savedCompleteProfile));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      const response = await authService.login(email, password);
      localStorage.setItem("token", response.access_token);
      localStorage.setItem("completeProfile", JSON.stringify(response.complete_profile));
      setToken(response.access_token);
      setCompleteProfile(response.complete_profile);
      return response;
    } catch (err) {
      const errorMsg = err.response?.data?.detail || "Error en login";
      setError(typeof errorMsg === "string" ? errorMsg : JSON.stringify(errorMsg));
      throw err;
    }
  };

  const register = async (email, password) => {
    try {
      setError(null);
      const response = await authService.register(email, password);
      localStorage.setItem("token", response.access_token);
      localStorage.setItem("completeProfile", JSON.stringify(response.complete_profile));
      setToken(response.access_token);
      setCompleteProfile(response.complete_profile);
      return response;
    } catch (err) {
      const errorMsg = err.response?.data?.detail || "Error en registro";
      setError(typeof errorMsg === "string" ? errorMsg : JSON.stringify(errorMsg));
      throw err;
    }
  };

  const logout = () => {
    authService.logout();
    localStorage.removeItem("completeProfile");
    setToken(null);
    setUser(null);
    setCompleteProfile(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, completeProfile, loading, error, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
}
