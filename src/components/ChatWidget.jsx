import { useState, useEffect, useRef } from "react";
import Markdown from "react-markdown";

const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODELS = [
  "nvidia/nemotron-3-nano-30b-a3b:free",
  "nvidia/nemotron-nano-9b-v2:free",
  "google/gemma-4-31b-it:free",
  "qwen/qwen3-next-80b-a3b-instruct:free",
  "openai/gpt-oss-20b:free",
];

function getStoredMessages(storageKey) {
  try {
    const stored = sessionStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export default function ChatWidget({ systemPrompt, storageKey, welcomeMessage, className = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => getStoredMessages(storageKey));
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("portfolio-chat-visited");
    if (!hasVisited) {
      const timer = setTimeout(() => setShowTooltip(true), 1500);
      const hideTimer = setTimeout(() => {
        setShowTooltip(false);
        sessionStorage.setItem("portfolio-chat-visited", "true");
      }, 6000);
      return () => { clearTimeout(timer); clearTimeout(hideTimer); };
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(messages));
    } catch {}
  }, [messages, storageKey]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const displayMessages = messages.length === 0
    ? [{ role: "assistant", content: welcomeMessage }]
    : messages;

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
      setMessages([...updatedMessages, { role: "assistant", content: "Chat is not configured. Missing API key." }]);
      setIsStreaming(false);
      return;
    }

    const apiMessages = [{ role: "system", content: systemPrompt }, ...updatedMessages];

    try {
      let response = null;
      for (const model of MODELS) {
        response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
          body: JSON.stringify({ model, messages: apiMessages, stream: true }),
        });
        if (response.ok) {
          console.log(`[ChatWidget] Using model: ${model}`);
          break;
        }
        console.log(`[ChatWidget] Model ${model} failed (${response.status}), trying next...`);
        if (response.status !== 429 && response.status !== 503) break;
      }

      if (!response.ok) {
        setMessages([...updatedMessages, { role: "assistant", content: "Sorry, all models are busy right now. Please try again in a moment." }]);
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
        for (const line of chunk.split("\n")) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6);
          if (data === "[DONE]") break;
          try {
            const parsed = JSON.parse(data);
            const token = parsed.choices?.[0]?.delta?.content;
            if (token) {
              assistantContent += token;
              setMessages([...updatedMessages, { role: "assistant", content: assistantContent }]);
            }
          } catch {}
        }
      }

      if (!assistantContent) {
        setMessages([...updatedMessages, { role: "assistant", content: "I didn't get a response. Please try again." }]);
      }
    } catch {
      setMessages([...updatedMessages, { role: "assistant", content: "Unable to connect. Please check your internet connection." }]);
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
      <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
        {showTooltip && (
          <div
            className="absolute bottom-18 right-0 whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold"
            style={{
              background: "linear-gradient(135deg, #1a2540, #0d1a2e)",
              color: "#d9ecff",
              border: "1px solid rgba(74, 144, 217, 0.5)",
              boxShadow: "0 4px 16px rgba(74, 144, 217, 0.3)",
              animation: "chatFadeIn 0.4s ease-out, chatTooltipPulse 2s ease-in-out infinite",
            }}
          >
            {welcomeMessage.startsWith("Hi! Ask me anything about «")
              ? "💬 Ask about this post!"
              : "👋 Chat with AI about me!"}
          </div>
        )}
        <button
          onClick={() => { setIsOpen(true); setShowTooltip(false); sessionStorage.setItem("portfolio-chat-visited", "true"); }}
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #4A90D9, #003580)",
            boxShadow: showTooltip
              ? "0 0 24px rgba(74, 144, 217, 0.7), 0 4px 20px rgba(74, 144, 217, 0.4)"
              : "0 4px 20px rgba(74, 144, 217, 0.4)",
            animation: showTooltip ? "chatBounce 1.2s ease-in-out infinite" : "none",
            transition: "transform 0.2s",
          }}
          aria-label="Open chat"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex flex-col max-sm:bottom-2 max-sm:right-2 max-sm:left-2 ${className}`}
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
      <div
        className="flex items-center gap-2.5 shrink-0"
        style={{
          padding: "14px 16px",
          background: "linear-gradient(135deg, #1a2540, #0d1a2e)",
          borderBottom: "1px solid rgba(74, 144, 217, 0.2)",
          borderRadius: "16px 16px 0 0",
        }}
      >
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#4A90D9", boxShadow: "0 0 8px rgba(74, 144, 217, 0.6)" }} />
        <span className="text-sm font-semibold flex-1" style={{ color: "#d9ecff" }}>Ask me anything</span>
        <button
          onClick={() => { setMessages([]); sessionStorage.removeItem(storageKey); }}
          className="text-xl leading-none cursor-pointer hover:opacity-70 transition-opacity"
          style={{ color: "#4A90D9" }}
          aria-label="Reset chat"
          title="New conversation"
        >↺</button>
        <button
          onClick={() => setIsOpen(false)}
          className="text-xl leading-none cursor-pointer hover:opacity-70 transition-opacity"
          style={{ color: "#4A90D9" }}
          aria-label="Close chat"
        >✕</button>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col gap-2.5 p-4">
        {displayMessages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[85%] px-3.5 py-2.5 text-[13px] leading-relaxed ${msg.role === "user" ? "self-end" : "self-start"}`}
            style={{
              background: msg.role === "user" ? "linear-gradient(135deg, #003580, #4A90D9)" : "#1a2540",
              color: msg.role === "user" ? "white" : "#d9ecff",
              borderRadius: msg.role === "user" ? "12px 12px 4px 12px" : "12px 12px 12px 4px",
            }}
          >
            <div className="chat-markdown"><Markdown>{msg.content}</Markdown></div>
            {isStreaming && i === displayMessages.length - 1 && msg.role === "assistant" && (
              <span className="inline-block w-1.5 h-4 ml-0.5 align-middle animate-pulse" style={{ background: "#4A90D9" }} />
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2 items-center shrink-0" style={{ padding: "12px 14px", borderTop: "1px solid rgba(74, 144, 217, 0.2)" }}>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          disabled={isStreaming}
          className="flex-1 text-[13px] outline-none disabled:opacity-50"
          style={{ background: "#0a0f1e", border: "1px solid rgba(74, 144, 217, 0.3)", borderRadius: "10px", padding: "10px 14px", color: "#d9ecff" }}
        />
        <button
          onClick={handleSend}
          disabled={isStreaming || !input.trim()}
          className="w-9 h-9 flex items-center justify-center shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: "linear-gradient(135deg, #4A90D9, #003580)", borderRadius: "10px" }}
          aria-label="Send message"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
