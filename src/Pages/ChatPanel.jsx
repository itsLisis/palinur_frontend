import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

export default function ChatPanel() {
  const [messages, setMessages] = useState([
    { from: "them", text: "Hola bro" },
    { from: "me", text: "¡Muy bien! ¿Y tú?" }
  ]);   

  const [input, setInput] = useState("");
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: "me", text: input.trim() }]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full w-full bg-white">

      {/* HEADER */}
      <div className="flex items-center gap-2 px-6 py-4 border-b">
        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
        <p className="text-lg font-semibold">Gerónimo, 21</p>
      </div>

      {/* MENSAJES */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex w-full ${msg.from === "me" ? "justify-end" : "justify-start"}`}
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
