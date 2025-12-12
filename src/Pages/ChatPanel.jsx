import { useState, useRef, useEffect, useCallback } from "react";
import { Send } from "lucide-react";
import { authService } from "../services/authService";

export default function ChatPanel({ matchData, onDismatch }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [ws, setWs] = useState(null);
  const [connected, setConnected] = useState(false);
  const [partnerInfo, setPartnerInfo] = useState(null); // { id, username }
  const [dismatching, setDismatching] = useState(false);
  const scrollRef = useRef();
  const currentUserId = parseInt(localStorage.getItem("userId"));
  const wsRef = useRef(null);
  const connectionNonceRef = useRef(0);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadChatHistory = useCallback(
    async (chatId) => {
      try {
        const response = await authService.getMessages(chatId, 1, 50);
        const loadedMessages = response.messages.map((msg) => ({
          id: msg.id,
          from: msg.sender_id === currentUserId ? "me" : "them",
          text: msg.content,
          created_at: msg.created_at,
        }));
        setMessages(loadedMessages);
      } catch (err) {
        console.error("Error cargando historial:", err);
      }
    },
    [currentUserId]
  );

  // Conectar al WebSocket cuando hay match
  useEffect(() => {
    if (!matchData || !matchData.has_active_match) {
      return;
    }

    // Close any previous socket to avoid duplicates (e.g., after refresh / fast remounts)
    if (wsRef.current) {
      try {
        wsRef.current.close();
      } catch (e) {
        // ignore
      }
      wsRef.current = null;
    }

    // New connection nonce. We ignore messages from old sockets.
    connectionNonceRef.current += 1;
    const myNonce = connectionNonceRef.current;

    const partnerId = matchData.partner_id;
    setPartnerInfo({ id: partnerId, username: null });

    // Conectar al WebSocket
    const websocket = authService.connectChatWebSocket(
      (data) => {
        if (connectionNonceRef.current !== myNonce) return;
        // Manejar mensajes entrantes
        if (data.type === "connected") {
          console.log("Conectado al chat:", data);
          setConnected(true);
          // partner_id confirmado por backend
          if (data.data?.partner_id) {
            setPartnerInfo((prev) => ({
              id: data.data.partner_id,
              username: prev?.username ?? null,
            }));
          }
          loadChatHistory(data.data.chat_id);
        } else if (data.type === "message") {
          const msg = data.data;
          const fromMe = msg.sender_id === currentUserId;

          // Dedup / reconcile optimistic message:
          // If this message is an echo of our own optimistic message, replace it.
          if (fromMe && msg.client_message_id) {
            setMessages((prev) => {
              const idx = prev.findIndex((m) => m.id === msg.client_message_id);
              if (idx >= 0) {
                const copy = [...prev];
                copy[idx] = {
                  id: msg.id,
                  from: "me",
                  text: msg.content,
                  created_at: msg.created_at,
                };
                return copy;
              }
              // If we didn't have a temp message, just append
              return [
                ...prev,
                {
                  id: msg.id,
                  from: "me",
                  text: msg.content,
                  created_at: msg.created_at,
                },
              ];
            });
            return;
          }

          setMessages((prev) => [
            ...prev,
            {
              id: msg.id,
              from: fromMe ? "me" : "them",
              text: msg.content,
              created_at: msg.created_at,
            },
          ]);
        } else if (data.type === "error") {
          console.error("Error del chat:", data.error);
        } else if (data.type === "chat_deactivated") {
          try {
            if (wsRef.current) wsRef.current.close();
          } catch (e) {}
          if (onDismatch) onDismatch();
        }
      },
      (error) => {
        if (connectionNonceRef.current !== myNonce) return;
        console.error("WebSocket error:", error);
        setConnected(false);
      },
      () => {
        if (connectionNonceRef.current !== myNonce) return;
        console.log("WebSocket cerrado");
        setConnected(false);
      }
    );

    wsRef.current = websocket;
    setWs(websocket);

    // Cleanup al desmontar
    return () => {
      if (websocket) {
        websocket.close();
      }
      if (wsRef.current === websocket) {
        wsRef.current = null;
      }
    };
  }, [matchData, currentUserId, loadChatHistory, onDismatch]);

  useEffect(() => {
    const loadPartnerName = async () => {
      if (!partnerInfo?.id) return;
      try {
        const profile = await authService.getProfileById(partnerInfo.id);
        setPartnerInfo((prev) => ({
          id: prev.id,
          username: profile?.username ?? prev.username,
        }));
      } catch (e) {}
    };
    loadPartnerName();
  }, [partnerInfo?.id]);

  const sendMessage = () => {
    if (!input.trim() || !ws || !connected) return;

    const content = input.trim();

    // Optimistic UI: mostrar el mensaje localmente (soluciona el caso de refresh donde a veces no llega el echo)
    // We'll use this temp id as client_message_id to reconcile when server echoes it back.
    const tempId = `tmp-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setMessages((prev) => [
      ...prev,
      {
        id: tempId, // temp id
        from: "me",
        text: content,
        created_at: new Date().toISOString(),
      },
    ]);

    authService.sendMessage(ws, content, tempId);
    setInput("");
  };

  const handleDismatch = async () => {
    if (dismatching) return;
    setDismatching(true);

    // UX: volver a tarjetas inmediatamente para el usuario que hace dismatch
    try {
      if (wsRef.current) wsRef.current.close();
    } catch (e) {}
    if (onDismatch) onDismatch();

    // Backend: intentar romper el match (best-effort)
    try {
      if (matchData?.relationship_id) {
        await authService.dismatch(matchData.relationship_id);
      }
    } catch (e) {
      // ignore
    } finally {
      setDismatching(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-white">
      {/* HEADER */}
      <div className="flex items-center gap-2 px-6 py-4 border-b">
        <div
          className={`w-3 h-3 rounded-full ${
            connected ? "bg-green-400" : "bg-gray-300"
          }`}
        ></div>
        <p className="text-lg font-semibold">
          {partnerInfo
            ? `Chat con ${partnerInfo.username || `usuario ${partnerInfo.id}`}`
            : "Cargando..."}
        </p>
        <div className="ml-auto">
          <button
            onClick={handleDismatch}
            disabled={dismatching}
            className="px-4 py-2 rounded-lg bg-[#CE603E] hover:bg-[#b14e32] text-white text-sm disabled:opacity-60 transition-colors"
          >
            {dismatching ? "..." : "Dismatch"}
          </button>
        </div>
      </div>

      {/* MENSAJES */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 && connected && (
          <div className="text-center text-gray-400 mt-8">
            ¡Es un match! Envía el primer mensaje 💬
          </div>
        )}
        {messages.map((msg, i) => (
          <div
            key={msg.id || i}
            className={`flex w-full ${
              msg.from === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl text-white text-sm ${
                msg.from === "me"
                  ? "bg-rose-400 rounded-br-none"
                  : "bg-slate-700 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={scrollRef}></div>
      </div>

      {/* INPUT */}
      <div className="border-t p-4">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Escribe un mensaje..."
            className="flex-1 bg-transparent outline-none text-sm"
          />
          <button onClick={sendMessage}>
            <Send size={20} className="opacity-60" />
          </button>
        </div>
      </div>
    </div>
  );
}
