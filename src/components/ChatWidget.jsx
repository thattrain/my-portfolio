import { useState, useEffect, useRef } from "react";
import { getSystemPrompt, getChatName } from "../constants/chatContext";

const STORAGE_KEY = "portfolio-chat-messages";
const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "meta-llama/llama-3.1-8b-instruct:free";

function getStoredMessages() {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function storeMessages(messages) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch {}
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(getStoredMessages);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    storeMessages(messages);
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const welcomeMessage = {
    role: "assistant",
    content: `Hi! I'm an AI assistant. Ask me anything about ${getChatName()}'s experience, skills, or projects.`,
  };

  const displayMessages = messages.length === 0 ? [welcomeMessage] : messages;

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || isStreaming) return;

    const userMessage = { role: "user", content: trimmed };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsStreaming(true);

    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    if (!apiKey) {
      setMessages([
        ...updatedMessages,
        { role: "assistant", content: "Chat is not configured. Missing API key." },
      ]);
      setIsStreaming(false);
      return;
    }

    const apiMessages = [
      { role: "system", content: getSystemPrompt() },
      ...updatedMessages,
    ];

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: MODEL,
          messages: apiMessages,
          stream: true,
        }),
      });

      if (response.status === 429) {
        setMessages([
          ...updatedMessages,
          { role: "assistant", content: "Too many requests. Please wait a moment." },
        ]);
        setIsStreaming(false);
        return;
      }

      if (!response.ok) {
        setMessages([
          ...updatedMessages,
          { role: "assistant", content: "Sorry, something went wrong. Please try again." },
        ]);
        setIsStreaming(false);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      setMessages([...updatedMessages, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6);
          if (data === "[DONE]") break;

          try {
            const parsed = JSON.parse(data);
            const token = parsed.choices?.[0]?.delta?.content;
            if (token) {
              assistantContent += token;
              setMessages([
                ...updatedMessages,
                { role: "assistant", content: assistantContent },
              ]);
            }
          } catch {}
        }
      }

      if (!assistantContent) {
        setMessages([
          ...updatedMessages,
          { role: "assistant", content: "I didn't get a response. Please try again." },
        ]);
      }
    } catch {
      setMessages([
        ...updatedMessages,
        { role: "assistant", content: "Unable to connect. Please check your internet connection." },
      ]);
    } finally {
      setIsStreaming(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110 cursor-pointer"
        style={{
          background: "linear-gradient(135deg, #4A90D9, #003580)",
          boxShadow: "0 4px 20px rgba(74, 144, 217, 0.4)",
        }}
        aria-label="Open chat"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>
    );
  }

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col max-sm:bottom-2 max-sm:right-2 max-sm:left-2"
      style={{
        width: "380px",
        height: "500px",
        maxWidth: "calc(100vw - 16px)",
        maxHeight: "70vh",
        background: "#0d1a2e",
        border: "1px solid rgba(74, 144, 217, 0.3)",
        borderRadius: "16px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
        animation: "chatSlideUp 0.3s ease-out",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2.5 shrink-0"
        style={{
          padding: "14px 16px",
          background: "linear-gradient(135deg, #1a2540, #0d1a2e)",
          borderBottom: "1px solid rgba(74, 144, 217, 0.2)",
          borderRadius: "16px 16px 0 0",
        }}
      >
        <div
          className="w-2.5 h-2.5 rounded-full"
          style={{
            background: "#4A90D9",
            boxShadow: "0 0 8px rgba(74, 144, 217, 0.6)",
          }}
        />
        <span className="text-sm font-semibold flex-1" style={{ color: "#d9ecff" }}>
          Ask me anything
        </span>
        <button
          onClick={() => setIsOpen(false)}
          className="text-lg leading-none cursor-pointer hover:opacity-70 transition-opacity"
          style={{ color: "#4A90D9" }}
          aria-label="Close chat"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-2.5 p-4">
        {displayMessages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[85%] px-3.5 py-2.5 text-[13px] leading-relaxed ${
              msg.role === "user" ? "self-end" : "self-start"
            }`}
            style={{
              background:
                msg.role === "user"
                  ? "linear-gradient(135deg, #003580, #4A90D9)"
                  : "#1a2540",
              color: msg.role === "user" ? "white" : "#d9ecff",
              borderRadius:
                msg.role === "user"
                  ? "12px 12px 4px 12px"
                  : "12px 12px 12px 4px",
            }}
          >
            {msg.content}
            {isStreaming && i === displayMessages.length - 1 && msg.role === "assistant" && (
              <span className="inline-block w-1.5 h-4 ml-0.5 align-middle animate-pulse" style={{ background: "#4A90D9" }} />
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        className="flex gap-2 items-center shrink-0"
        style={{
          padding: "12px 14px",
          borderTop: "1px solid rgba(74, 144, 217, 0.2)",
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          disabled={isStreaming}
          className="flex-1 text-[13px] outline-none disabled:opacity-50"
          style={{
            background: "#0a0f1e",
            border: "1px solid rgba(74, 144, 217, 0.3)",
            borderRadius: "10px",
            padding: "10px 14px",
            color: "#d9ecff",
          }}
        />
        <button
          onClick={handleSend}
          disabled={isStreaming || !input.trim()}
          className="w-9 h-9 flex items-center justify-center shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: "linear-gradient(135deg, #4A90D9, #003580)",
            borderRadius: "10px",
          }}
          aria-label="Send message"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
