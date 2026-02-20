'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, X, ChevronDown } from 'lucide-react';
import { 
  ChatMessage, 
  trips, 
  faqs, 
  queryResponses, 
  greetingResponses, 
  fallbackResponse,
  Trip 
} from './chatbot-data';

interface ChatbotProps {
  onTripSelect?: (trip: Trip) => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ onTripSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: greetingResponses[Math.floor(Math.random() * greetingResponses.length)],
      sender: 'bot',
      timestamp: new Date(),
      suggestions: ['Show me trips', 'What destinations?', 'How to book?', 'Trip prices']
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Generate a unique ID
  const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Add a new message
  const addMessage = (text: string, sender: 'user' | 'bot', trips?: Trip[], suggestions?: string[]) => {
    const newMessage: ChatMessage = {
      id: generateId(),
      text,
      sender,
      timestamp: new Date(),
      trips,
      suggestions
    };
    setMessages(prev => [...prev, newMessage]);
  };

  // Process user input and generate bot response
  const processUserInput = (input: string) => {
    const lowerInput = input.toLowerCase();
    
    // Check for trip-related queries
    if (lowerInput.includes('show') && lowerInput.includes('trip') || 
        lowerInput.includes('available trips') ||
        lowerInput.includes('list trips')) {
      addMessage('Here are some available trips:', 'bot', trips.slice(0, 3), [
        'Filter by budget',
        'Show more trips',
        'Cheapest trips',
        'Top rated'
      ]);
      return;
    }

    // Check for destination-specific queries
    const destinations = ['banaue', 'palawan', 'siargao', 'bohol', 'cebu', 'manila'];
    for (const dest of destinations) {
      if (lowerInput.includes(dest)) {
        const filteredTrips = trips.filter((trip: { to: string; from: string; }) => 
          trip.to.toLowerCase().includes(dest) || 
          trip.from.toLowerCase().includes(dest)
        );
        if (filteredTrips.length > 0) {
          addMessage(`I found ${filteredTrips.length} trip(s) to/from ${dest}:`, 'bot', filteredTrips);
        } else {
          addMessage(`Sorry, I couldn't find any trips to/from ${dest}.`, 'bot');
        }
        return;
      }
    }

    // Check FAQs
    for (const faq of faqs) {
      if (lowerInput.includes(faq.question.toLowerCase().split(' ')[0]) ||
          lowerInput.includes('cancel') && faq.category === 'policy') {
        addMessage(faq.answer, 'bot', undefined, [
          'More FAQs',
          'Book a trip',
          'Contact support'
        ]);
        return;
      }
    }

    // Check query responses based on keywords
    for (const query of queryResponses) {
      if (query.keywords.some((keyword: string) => lowerInput.includes(keyword))) {
        addMessage(query.response, 'bot', undefined, [
          'Show trips',
          'Check prices',
          'Ask something else'
        ]);
        return;
      }
    }

    // Handle greetings
    if (lowerInput.match(/^(hi|hello|hey|greetings|good morning|good afternoon)/)) {
      addMessage(greetingResponses[Math.floor(Math.random() * greetingResponses.length)], 'bot', undefined, [
        'Show trips',
        'Destinations',
        'How to book?',
        'Prices'
      ]);
      return;
    }

    // Handle help command
    if (lowerInput.includes('help') || lowerInput.includes('what can you do')) {
      addMessage(
        "I can help you with:\n• Finding trips by destination\n• Checking prices and availability\n• Answering FAQs about bookings\n• Providing trip recommendations\n\nTry asking: 'Show trips to Palawan' or 'How do I book?'",
        'bot',
        undefined,
        ['Show all trips', 'FAQ', 'Contact']
      );
      return;
    }

    // Default fallback
    addMessage(fallbackResponse, 'bot', undefined, [
      'Show trips',
      'FAQ',
      'Help',
      'Contact'
    ]);
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Add user message
    addMessage(inputText, 'user');
    
    // Simulate bot typing
    setIsTyping(true);
    
    // Process and add bot response after delay
    setTimeout(() => {
      setIsTyping(false);
      processUserInput(inputText);
    }, 1000);

    setInputText('');
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  // Handle trip selection
  const handleTripSelect = (trip: Trip) => {
    if (onTripSelect) {
      onTripSelect(trip);
    }
    addMessage(`You selected: ${trip.title}. What would you like to know about this trip?`, 'bot', undefined, [
      'View details',
      'Check availability',
      'Book now',
      'Similar trips'
    ]);
  };

  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-all z-50 flex items-center justify-center"
        aria-label="Open chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[440px] bg-white shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-200">
          {/* Header */}
          <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MessageCircle size={20} />
              <h3 className="font-semibold">Yaarigo Assistant</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-blue-700 p-1 rounded">
              <ChevronDown size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-800 shadow-sm border border-gray-200'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  
                  {/* Trip cards in bot messages */}
                  {message.trips && message.trips.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.trips.map((trip) => (
                        <div
                          key={trip.id}
                          className="bg-white border border-gray-200 rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => handleTripSelect(trip)}
                        >
                          <h4 className="font-semibold text-gray-800">{trip.title}</h4>
                          <p className="text-xs text-gray-600">Guide: {trip.guideName}</p>
                          <div className="flex justify-between mt-2 text-xs">
                            <span className="text-gray-500">From: {trip.from}</span>
                            <span className="text-gray-500">To: {trip.to}</span>
                          </div>
                          <div className="flex justify-between mt-1 text-xs">
                            <span className="text-green-600 font-medium">
                              ₱{trip.minPrice.toLocaleString()} - ₱{trip.maxPrice.toLocaleString()}
                            </span>
                            {trip.matchPercentage && (
                              <span className="text-blue-600 font-medium">
                                {trip.matchPercentage}% Match
                              </span>
                            )}
                          </div>
                          {trip.spotsLeft && (
                            <div className="mt-2 text-xs text-orange-600 font-medium">
                              {trip.spotsLeft} spots left
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Suggestions */}
                  {message.suggestions && message.sender === 'bot' && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.suggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 rounded-2xl px-4 py-2 shadow-sm border border-gray-200">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about trips, destinations, or help..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;