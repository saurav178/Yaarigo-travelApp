"use client";
import React, { useState } from "react";

interface Message {
  id: number;
  message: string;
  timestamp: string;
  sender: string;
  userId: string;
}

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatWindow({ isOpen, onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    setIsLoading(true);
    const userMessage = {
      id: Date.now(),
      message: newMessage,
      timestamp: new Date().toISOString(),
      sender: "user",
      userId: "current-user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: newMessage,
          userId: "current-user",
        }),
      });

      const data = await response.json();
      if (data.success) {
        setMessages((prev) => [...prev, data.response]);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-[30%] right-10 w-96 bg-white shadow-2xl rounded-2xl overflow-hidden z-50 animate-slide-up">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-[#1D4350] text-white">
        <h3 className="text-lg font-semibold">Chat with Jane Cooper</h3>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-300 text-2xl"
        >
          ×
        </button>
      </div>

      {/* Chat Messages */}
      <div className="max-h-80 overflow-y-auto p-4 bg-gray-50">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500 text-sm">
            Start a conversation with Jane Cooper
          </p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-3 ${
                msg.sender === "user" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block px-3 py-2 rounded-lg max-w-xs ${
                  msg.sender === "user"
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.message}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Chat Input */}
      <div className="p-3 border-t border-gray-200 flex items-center gap-2 bg-white">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          onClick={handleSendMessage}
          disabled={!newMessage.trim() || isLoading}
          className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 disabled:bg-gray-400 transition"
        >
          {isLoading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
