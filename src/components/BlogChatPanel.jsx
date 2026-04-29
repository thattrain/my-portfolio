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
  } catch { /* sessionStorage unavailable */ }
  return [];
}

export default function BlogChatPanel({ systemPrompt, storageKey, welcomeMessage }) {
  const [messages, setMessages] = useState(() => getStoredMessages(storageKey));
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(messages));
    } catch { /* sessionStorage unavailable */ }
  }, [messages, storageKey]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
          console.log(`[BlogChatPanel] Using model: ${model}`);
          break;
        }
        console.log(`[BlogChatPanel] Model ${model} failed (${response.status}), trying next...`);
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
          } catch { /* malformed SSE line — skip */ }
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

  return (
    <div
      className="hidden lg:flex flex-col w-80 shrink-0 sticky top-24"
      style={{
        maxHeight: "calc(100vh - 6rem)",
        background: "#0d1a2e",
        border: "1px solid rgba(74, 144, 217, 0.3)",
        borderRadius: "16px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
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
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#4A90D9", boxShadow: "0 0 8px rgba(74, 144, 217, 0.6)" }} />
        <span className="text-sm font-semibold flex-1" style={{ color: "#d9ecff" }}>Ask about this post</span>
        <button
          onClick={() => { setMessages([]); sessionStorage.removeItem(storageKey); }}
          className="text-xl leading-none cursor-pointer hover:opacity-70 transition-opacity"
          style={{ color: "#4A90D9" }}
          aria-label="Reset chat"
          title="New conversation"
        >↺</button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-2.5 p-4">
        {displayMessages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[90%] px-3.5 py-2.5 text-[13px] leading-relaxed ${msg.role === "user" ? "self-end" : "self-start"}`}
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

      {/* Input */}
      <div className="flex gap-2 items-center shrink-0" style={{ padding: "12px 14px", borderTop: "1px solid rgba(74, 144, 217, 0.2)" }}>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about this post..."
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
