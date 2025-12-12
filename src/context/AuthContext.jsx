import { createContext, useState, useContext, useEffect } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [completeProfile, setCompleteProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedCompleteProfile = localStorage.getItem("completeProfile");
    const savedUserId = localStorage.getItem("userId");

    if (savedToken) {
      setToken(savedToken);
    }
    if (savedCompleteProfile) {
      setCompleteProfile(JSON.parse(savedCompleteProfile));
    }
    if (savedUserId) {
      setUser({ id: parseInt(savedUserId) });
    }
    setLoading(false);
  }, []);

  const login = async (email, password, turnstile_token) => {
    try {
      setError(null);
      const response = await authService.login(
        email,
        password,
        turnstile_token
      );
      localStorage.setItem("token", response.access_token);
      localStorage.setItem(
        "completeProfile",
        JSON.stringify(response.complete_profile)
      );
      localStorage.setItem("userId", response.user_id);
      setToken(response.access_token);
      setCompleteProfile(response.complete_profile);
      setUser({ id: response.user_id });
      return response;
    } catch (err) {
      const errorMsg = err.response?.data?.detail || "Error en login";
      setError(
        typeof errorMsg === "string" ? errorMsg : JSON.stringify(errorMsg)
      );
      throw err;
    }
  };

  const register = async (email, password, turnstile_token) => {
    try {
      setError(null);
      const response = await authService.register(
        email,
        password,
        turnstile_token
      );
      localStorage.setItem("token", response.access_token);
      localStorage.setItem(
        "completeProfile",
        JSON.stringify(response.complete_profile)
      );
      localStorage.setItem("userId", response.user_id);
      setToken(response.access_token);
      setCompleteProfile(response.complete_profile);
      setUser({ id: response.user_id });
      return response;
    } catch (err) {
      const errorMsg = err.response?.data?.detail || "Error en registro";
      setError(
        typeof errorMsg === "string" ? errorMsg : JSON.stringify(errorMsg)
      );
      throw err;
    }
  };

  const updateToken = (newToken, newCompleteProfile) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("completeProfile", JSON.stringify(newCompleteProfile));
    setToken(newToken);
    setCompleteProfile(newCompleteProfile);
  };

  const logout = () => {
    authService.logout();
    localStorage.removeItem("completeProfile");
    localStorage.removeItem("userId");
    setToken(null);
    setUser(null);
    setCompleteProfile(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        completeProfile,
        loading,
        error,
        login,
        logout,
        register,
        updateToken,
      }}
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
