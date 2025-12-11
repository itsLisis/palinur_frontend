import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor para agregar el token a cada solicitud
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export const authService = {
  api,
  
  register: async (email, password, turnstile_token) => {
    const response = await api.post("/auth/register", {
      email,
      password,
      turnstile_token,
    });
    return response.data;
  },

  login: async (email, password, turnstile_token) => {
    const response = await api.post("/auth/login", {
      email,
      password,
      turnstile_token,
    });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  getUserProfile: async () => {
    const response = await api.get("/user/profile");
    return response.data;
  },

  uploadProfileImage: async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    
    const response = await api.post("/user/profile/upload-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  deleteProfileImage: async (imageId) => {
    const response = await api.delete(`/user/profile/image/${imageId}`);
    return response.data;
  },

  getRandomProfile: async () => {
    const response = await api.get("/user/profiles/random");
    return response.data;
  },
};
