import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

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

  getProfileOptions: async () => {
    const response = await api.get("/user/options");
    return response.data;
  },

  updateUserProfile: async ({ introduction, interest_ids }) => {
    const response = await api.patch("/user/profile", {
      introduction,
      interest_ids,
    });
    return response.data;
  },

  getProfileById: async (userId) => {
    const response = await api.get(`/user/profile/${userId}`);
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

  deleteAccount: async () => {
    const response = await api.delete("/user/account");
    return response.data;
  },

  getRandomProfile: async () => {
    const response = await api.get("/user/profiles/random");
    return response.data;
  },

  // ============ MATCHING SERVICE ============

  getPotentialMatches: async () => {
    const response = await api.get("/matching/potential");
    return response.data;
  },

  swipeUser: async (userId, isLike) => {
    const response = await api.post("/matching/swipe", {
      user_id: userId,
      is_like: isLike,
      date: new Date().toISOString(),
    });
    return response.data;
  },

  getActiveMatch: async (userId) => {
    const response = await api.get(
      `/matching/relationships/user/${userId}/active`
    );
    return response.data;
  },

  dismatch: async (relationshipId) => {
    const response = await api.post("/matching/dismatch", null, {
      params: { relationship_id: relationshipId },
    });
    return response.data;
  },

  getConnectionsHistory: async () => {
    const response = await api.get("/matching/connections");
    return response.data;
  },

  // ============ CHAT SERVICE ============

  getChats: async (skip = 0, limit = 20) => {
    const response = await api.get("/chat/chats", {
      params: { skip, limit },
    });
    return response.data;
  },

  getMessages: async (chatId, page = 1, pageSize = 50) => {
    const response = await api.get(`/chat/chats/${chatId}/messages`, {
      params: { page, page_size: pageSize },
    });
    return response.data;
  },

  markMessagesAsRead: async (chatId) => {
    const response = await api.post(`/chat/chats/${chatId}/read`);
    return response.data;
  },

  getChatByRelationship: async (relationshipId) => {
    const response = await api.get(
      `/chat/chats/by-relationship/${relationshipId}`
    );
    return response.data;
  },

  // WebSocket para chat en tiempo real
  connectChatWebSocket: (onMessage, onError, onClose) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token available");
    }

    const wsBaseUrl = (
      process.env.REACT_APP_API_URL || "http://localhost:8000"
    ).replace("http", "ws");
    const wsUrl = `${wsBaseUrl}/chat/ws/${token}`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      if (onError) onError(error);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
      if (onClose) onClose();
    };

    return ws;
  },

  sendMessage: (ws, content, client_message_id = null) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          type: "message",
          content: content,
          client_message_id,
        })
      );
    }
  },

  sendTyping: (ws, isTyping) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          type: "typing",
          is_typing: isTyping,
        })
      );
    }
  },

  markMessageRead: (ws, messageId) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          type: "read",
          message_id: messageId,
        })
      );
    }
  },
};
