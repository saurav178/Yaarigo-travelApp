import React, { useState, useEffect, useRef } from 'react';

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

const ChatWindow: React.FC<ChatWindowProps> = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        message: message.trim(),
        timestamp: new Date().toISOString(),
        sender: 'user',
        userId: 'current-user'
      };

      setMessages(prev => [...prev, newMessage]);
      setMessage('');
      setIsLoading(true);

      try {
        const response: Response = await fetch('/profile/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: newMessage.message,
            userId: newMessage.userId
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          // Add the response message
          setMessages(prev => [...prev, data.response]);
        }
      } catch (error) {
        console.error('Failed to send message:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handlePhotoSelect = () => {
    photoInputRef.current?.click();
    setShowOptions(false);
  };

  const handleDocumentSelect = () => {
    documentInputRef.current?.click();
    setShowOptions(false);
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
    setShowOptions(false);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Handle photo upload
      console.log('Photo selected:', file.name);
      // Add photo message to chat
      const newMessage: Message = {
        id: Date.now(),
        message: `📷 Photo: ${file.name}`,
        timestamp: new Date().toISOString(),
        sender: 'user',
        userId: 'current-user'
      };
      setMessages(prev => [...prev, newMessage]);
    }
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Handle document upload
      console.log('Document selected:', file.name);
      // Add document message to chat
      const newMessage: Message = {
        id: Date.now(),
        message: `📄 Document: ${file.name}`,
        timestamp: new Date().toISOString(),
        sender: 'user',
        userId: 'current-user'
      };
      setMessages(prev => [...prev, newMessage]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Handle file upload
      console.log('File selected:', file.name);
      // Add file message to chat
      const newMessage: Message = {
        id: Date.now(),
        message: `📁 File: ${file.name}`,
        timestamp: new Date().toISOString(),
        sender: 'user',
        userId: 'current-user'
      };
      setMessages(prev => [...prev, newMessage]);
    }
  };

  const emojis = ['😊', '😂', '😍', '👍', '❤️', '😢', '😎', '🤔', '😴', '😡', '🙌', '👏', '💯', '🔥', '✨'];

  return (
    <div className="fixed bottom-10 right-10 w-80 md:w-96 lg:w-[400px] bg-white text-black shadow-2xl border border-gray-300 overflow-hidden flex flex-col h-96">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-gray-100">
        <div className="flex items-center gap-1">
          <span className="font-semibold text-[15px]">Megha Chauhan</span>
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <div className="flex items-center gap-4">
          {/* Minimize */}
          <button className="text-gray-600 hover:text-black">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="2" d="M5 12h14" />
            </svg>
          </button>

          {/* Close */}
          <button className="text-red-500 hover:text-red-700" onClick={onClose}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 max-h-64">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center pt-8 pb-6">
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
              </svg>
            </div>

            <h2 className="mt-3 text-[17px] font-semibold">Megha Chauhan</h2>

            {/* Encryption message */}
            <p className="text-gray-600 text-center text-[13px] px-6 mt-3 leading-snug">
              🔒 Messages and calls are secured with end-to-end encryption.
              Only people in this chat can read, listen to or share them.
              <span className="text-blue-500 hover:underline cursor-pointer"> Learn more</span>
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-black'
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-black max-w-xs px-3 py-2 rounded-lg">
                  <p className="text-sm">Typing...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Options Menu */}
      {showOptions && (
        <div className="absolute bottom-16 left-4 bg-white border border-gray-300 rounded-lg p-2 shadow-lg">
          <div className="space-y-2">
            <button onClick={handlePhotoSelect} className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100 rounded">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Photo
            </button>
            <button onClick={handleDocumentSelect} className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100 rounded">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
              Document
            </button>
            <button onClick={handleFileSelect} className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100 rounded">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-9 0V1m10 3V1m0 3l1 1v16a2 2 0 01-2 2H6a2 2 0 01-2-2V5l1-1z" />
              </svg>
              File
            </button>
          </div>
        </div>
      )}

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-16 left-4 bg-white border border-gray-300 rounded-lg p-2 shadow-lg grid grid-cols-5 gap-2">
          {emojis.map((emoji, index) => (
            <button
              key={index}
              className="text-2xl hover:bg-gray-100 p-1 rounded"
              onClick={() => handleEmojiSelect(emoji)}
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      {/* Hidden file inputs */}
      <input
        type="file"
        ref={photoInputRef}
        onChange={handlePhotoChange}
        accept="image/*"
        style={{ display: 'none' }}
      />
      <input
        type="file"
        ref={documentInputRef}
        onChange={handleDocumentChange}
        accept=".pdf,.doc,.docx,.txt"
        style={{ display: 'none' }}
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {/* Message input bar */}
      <div className="flex items-center px-4 py-2 border-t border-gray-300">
        <button className="text-blue-500 mr-2 p-2 hover:bg-gray-100 rounded-full relative" onClick={() => setShowOptions(!showOptions)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-gray-100 text-black rounded-full px-4 py-2 mr-2 focus:outline-none"
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button className="text-blue-500 mr-2 p-2 hover:bg-gray-100 rounded-full" onClick={handleSend}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" transform="rotate(90)">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
        <button className="text-blue-500 p-2 hover:bg-gray-100 rounded-full relative" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
          <span className="text-2xl text-blue-500">😊</span>
          <span className="absolute -top-1 -right-1 text-xs bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center">+</span>
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
