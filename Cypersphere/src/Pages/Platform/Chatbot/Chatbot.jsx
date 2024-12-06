import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { RiSendPlaneFill } from 'react-icons/ri';
import { FaRandom } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import ReactMarkdown from 'react-markdown';
import './Chatbot.css';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI("AIzaSyBjuyyFRTJ5b4XOSAVosrfZShx1K-e6FyE");

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 0.7, // Reduced for more focused responses
  topP: 0.8,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Cybersecurity system prompt
const systemPrompt = `You are a cybersecurity expert AI assistant. Your role is to:
- Provide accurate, up-to-date information about cybersecurity topics
- Explain security concepts in clear, understandable terms
- Offer practical advice for improving digital security
- Stay current with the latest cybersecurity threats and best practices
- Avoid providing harmful or malicious information
- Emphasize the importance of ethical behavior in cybersecurity

When discussing technical topics:
- Break down complex concepts into simple explanations
- Provide real-world examples when relevant
- Recommend reliable security tools and practices
- Cite authoritative sources when appropriate`;

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const chatContainerRef = useRef(null);

  const suggestionQuestions = [
    "What is a cyberattack?",
    "What is encryption?",
    "Is it safe to use public Wi-Fi?"
  ];

  useEffect(() => {
    // Initialize chat session with cybersecurity context
    const session = model.startChat({
      generationConfig,
      history: [],
      context: systemPrompt,
    });
    setChatSession(session);
  }, []);

  const sendMessage = async (text) => {
    if (!text.trim() || !chatSession) return;

    setMessages(prev => [...prev, { text, isUser: true }]);
    setInputText('');
    setIsLoading(true);

    try {
      const result = await chatSession.sendMessage(text);
      const answer = result.response.text();

      setMessages(prev => [...prev, { text: answer, isUser: false }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        text: "I apologize, but I encountered an error. Please try again.", 
        isUser: false 
      }]);
    }

    setIsLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputText);
  };

  const handleSuggestionClick = (question) => {
    sendMessage(question);
  };

  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      const handleScroll = () => {
        const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
        setShowScrollButton(!isNearBottom);
      };
      
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  return (
    <div className="chatbot-container p-4 d-flex align-items-center justify-content-center">
      <div className={`chat-container ${messages.length > 0 ? 'has-messages' : ''}`}>
        {!messages.length > 0 && (
          <h1 className='mb-5'>Hi, How can I help you today?</h1>
        )}
                
        {messages.length > 0 && (
          <div className="messages-container" ref={chatContainerRef}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}
              >
                {message.isUser ? (
                  message.text
                ) : (
                  <ReactMarkdown>{message.text}</ReactMarkdown>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            )}
          </div>
        )}

        {showScrollButton && (
          <button className="scroll-bottom-btn visible" onClick={scrollToBottom}>
            <IoIosArrowDown size={20} color="white" />
          </button>
        )}

        {!messages.length > 0 && (
          <div className="suggestions-container mt-4">
            {suggestionQuestions.map((question, index) => (
              <button
                key={index}
                className="suggestion-btn"
                onClick={() => handleSuggestionClick(question)}
              >
                {question}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="input-container d-flex align-items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message here..."
            className="chat-input p-3"
          />
          <button type="submit" className="send-button" disabled={isLoading}>
            <RiSendPlaneFill />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chatbot;
