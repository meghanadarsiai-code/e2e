import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ReactMarkdown from "react-markdown";
import { apiService } from "../utils/api";
import "./chat_page.css";

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = React.useRef(null);

  const loadMessages = async () => {
    try {
      const response = await apiService.chat.history();
      setMessages(response.data.messages || []);
    } catch (error) {
      Swal.fire("Error", "Unable to load chat history", "error");
    }
  };

  const clearChat = async () => {
    try {
      await apiService.chat.clear();
      setMessages([]);
    } catch (error) {
      Swal.fire("Error", "Unable to clear chat", "error");
    }
  };

  const sendMessage = async () => {
    if (!messageInput.trim()) return;
    const currentText = messageInput.trim();
    setMessageInput("");
    setMessages((prev) => [...prev, { role: "user", content: currentText }]);
    setLoading(true);
    try {
      const response = await apiService.chat.send({ message: currentText });
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.data.message || "No response" },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Failed to get AI response. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="chat-page-container">
      <div className="chat-header">
        <h2 className="mb-0">AI Study Assistant</h2>
        <button className="btn btn-outline-danger btn-sm" onClick={clearChat}>
          Clear History
        </button>
      </div>

      <div className="chat-window">
        <div className="messages-area">
          {!messages.length && (
            <div className="text-center text-muted mt-5">
              <p>Ask about coding concepts, course plans, or revision strategy.</p>
            </div>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message-wrapper ${message.role === "user" ? "user" : "bot"}`}
            >
              <div className="message-bubble">
                <div className="message-sender">
                  {message.role === "user" ? "You" : "Assistant"}
                </div>
                <div className="markdown-body">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="message-wrapper bot">
              <div className="message-bubble">
                <div className="message-sender">Assistant</div>
                Thinking...
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        <div className="input-area">
          <input
            className="form-control chat-input"
            placeholder="Type your question"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            disabled={loading}
          />
          <button
            className="btn btn-primary send-btn"
            onClick={sendMessage}
            disabled={loading || !messageInput.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
