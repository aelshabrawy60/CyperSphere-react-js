import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Shield, Bot, User, ArrowDown, Sparkles, Lock } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Replace this with your actual Gemini setup:
// const genAI = new GoogleGenerativeAI("YOUR_API_KEY");
const genAI = new GoogleGenerativeAI("AIzaSyBjuyyFRTJ5b4XOSAVosrfZShx1K-e6FyE");

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 0.7,
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
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [chatSession, setChatSession] = useState(null);
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);

  const suggestionQuestions = [
    { text: "What is a cyberattack?", icon: "⚡" },
    { text: "How does encryption work?", icon: "🔐" },
    { text: "Is public Wi-Fi safe to use?", icon: "📶" },
    { text: "What is two-factor authentication?", icon: "🛡️" },
    { text: "How to create strong passwords?", icon: "🔑" },
    { text: "What is a VPN?", icon: "🌐" }
  ];

  useEffect(() => {
    // Initialize chat session with cybersecurity context
    const session = model.startChat({
      generationConfig,
      history: [],
    });
    setChatSession(session);
  }, []);

  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage, scrollToBottom]);

  const sendMessage = async (text) => {
    if (!text.trim() || !chatSession) return;

    const userMessage = { text, isUser: true, timestamp: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    setIsStreaming(true);
    setStreamingMessage('');

    try {
      // Add system prompt context to the first message
      const messageWithContext = messages.length === 0 
        ? `${systemPrompt}\n\nUser: ${text}` 
        : text;

      // Try streaming first
      const result = await chatSession.sendMessageStream(messageWithContext);
      let fullResponse = '';

      // The correct way to handle streaming in Google Generative AI
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        fullResponse += chunkText;
        setStreamingMessage(fullResponse);
      }

      // Add the complete message to chat history
      setMessages(prev => [...prev, { 
        text: fullResponse, 
        isUser: false, 
        timestamp: Date.now() 
      }]);
      setStreamingMessage('');
      
    } catch (streamError) {
      console.warn('Streaming failed, falling back to non-streaming:', streamError);
      
      try {
        // Fallback to non-streaming if streaming fails
        const messageWithContext = messages.length === 0 
          ? `${systemPrompt}\n\nUser: ${text}` 
          : text;

        const result = await chatSession.sendMessage(messageWithContext);
        const response = result.response.text();

        setMessages(prev => [...prev, { 
          text: response, 
          isUser: false, 
          timestamp: Date.now() 
        }]);
        setStreamingMessage('');
        
      } catch (error) {
        console.error('Both streaming and non-streaming failed:', error);
        let errorMessage = "I apologize, but I encountered an error. ";
        
        if (error.message) {
          if (error.message.includes('API_KEY_INVALID')) {
            errorMessage += "Invalid API key. Please check your Google AI API key.";
          } else if (error.message.includes('PERMISSION_DENIED')) {
            errorMessage += "Permission denied. Please check your API key permissions.";
          } else if (error.message.includes('QUOTA_EXCEEDED')) {
            errorMessage += "API quota exceeded. Please try again later.";
          } else {
            errorMessage += `Error: ${error.message}`;
          }
        } else {
          errorMessage += "Please check your API key and network connection.";
        }
        
        setMessages(prev => [...prev, { 
          text: errorMessage, 
          isUser: false,
          timestamp: Date.now()
        }]);
        setStreamingMessage('');
      }
    }

    setIsLoading(false);
    setIsStreaming(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputText);
    }
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

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br  flex items-center justify-center p-4">
      <div className="w-full max-w-4xl h-[90vh] bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 flex flex-col overflow-hidden">
        <div className='h-full bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 flex flex-col overflow-hidden'>
          
          {/* Chat Area */}
          <div className="flex-1 flex flex-col relative min-h-0">
            {messages.length === 0 && !isStreaming ? (
              <div className="flex-1 flex flex-col justify-center items-center p-8 text-center">
                <div className="mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-3">Welcome to CyberSphere AI</h2>
                  <p className="text-gray-300 text-lg max-w-2xl">
                    Get expert cybersecurity advice, learn about threats, and discover best practices to protect your digital life.
                  </p>
                </div>

                <div className="w-full max-w-3xl">
                  <p className="text-gray-400 mb-4 text-sm">Try asking about:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {suggestionQuestions.map((question, index) => (
                      <button
                        key={index}
                        className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 p-4 rounded-xl text-left transition-all duration-200 hover:scale-105"
                        onClick={() => handleSuggestionClick(question.text)}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-xl">{question.icon}</span>
                          <span className="text-white text-sm group-hover:text-blue-300">{question.text}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-6 space-y-6"
                style={{ scrollBehavior: 'smooth' }}
              >
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!message.isUser && (
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    
                    <div className={`max-w-[70%] ${message.isUser ? 'order-1' : ''}`}>
                      <div
                        className={`p-4 rounded-2xl ${
                          message.isUser
                            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
                            : 'bg-white/10 backdrop-blur-sm text-white border border-white/10'
                        }`}
                      >
                        <div className="prose prose-invert max-w-none">
                          {message.text.split('\n').map((line, i) => {
                            if (line.startsWith('**') && line.endsWith('**')) {
                              return <div key={i} className="font-bold mt-3 mb-1 text-blue-300">{line.slice(2, -2)}</div>;
                            }
                            if (line.startsWith('- ')) {
                              return <div key={i} className="ml-4 opacity-90">• {line.slice(2)}</div>;
                            }
                            return line ? <div key={i} className="mb-1">{line}</div> : <div key={i} className="h-2"></div>;
                          })}
                        </div>
                      </div>
                      <div className={`text-xs text-gray-400 mt-1 ${message.isUser ? 'text-right' : 'text-left'}`}>
                        {formatTime(message.timestamp)}
                      </div>
                    </div>

                    {message.isUser && (
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}

                {/* Streaming Message */}
                {isStreaming && streamingMessage && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="max-w-[70%]">
                      <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm text-white border border-white/10">
                        <div className="prose prose-invert max-w-none">
                          {streamingMessage.split('\n').map((line, i) => {
                            if (line.startsWith('**') && line.endsWith('**')) {
                              return <div key={i} className="font-bold mt-3 mb-1 text-blue-300">{line.slice(2, -2)}</div>;
                            }
                            if (line.startsWith('- ')) {
                              return <div key={i} className="ml-4 opacity-90">• {line.slice(2)}</div>;
                            }
                            return line ? <div key={i} className="mb-1">{line}</div> : <div key={i} className="h-2"></div>;
                          })}
                          <span className="inline-block w-2 h-5 bg-blue-400 ml-1 animate-pulse"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Loading indicator */}
                {isLoading && !streamingMessage && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Scroll to bottom button */}
            {showScrollButton && (
              <button
                className="absolute bottom-24 right-8 bg-blue-600 hover:bg-blue-700 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105 z-10"
                onClick={scrollToBottom}
              >
                <ArrowDown className="w-5 h-5 text-white" />
              </button>
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 bg-white/5 backdrop-blur-sm border-t border-white/10 flex-shrink-0">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about cybersecurity..."
                  className="w-full p-4 pr-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  disabled={isLoading}
                />
                <Lock className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              <button
                onClick={() => sendMessage(inputText)}
                className="bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 p-4 rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                disabled={isLoading || !inputText.trim()}
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;