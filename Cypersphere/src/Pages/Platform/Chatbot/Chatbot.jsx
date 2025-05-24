import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Shield, Bot, User, ArrowDown, Sparkles, Lock } from 'lucide-react';

// Mock API for demonstration - replace with your actual Gemini API
const mockStreamResponse = async function* (message) {
  const responses = [
    "I understand you're asking about cybersecurity. ",
    "Let me provide you with comprehensive information on this topic.\n\n",
    "Cybersecurity is a critical field that involves protecting digital systems, networks, and data from various threats. ",
    "Here are the key aspects you should know:\n\n",
    "**Types of Cyber Threats:**\n",
    "- Malware (viruses, ransomware, trojans)\n",
    "- Phishing attacks\n",
    "- Social engineering\n",
    "- Network intrusions\n\n",
    "**Best Practices:**\n",
    "- Use strong, unique passwords\n",
    "- Enable two-factor authentication\n",
    "- Keep software updated\n",
    "- Be cautious with email attachments\n\n",
    "Would you like me to elaborate on any specific aspect of cybersecurity?"
  ];
  
  for (const chunk of responses) {
    await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 100));
    yield chunk;
  }
};

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
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
    if (!text.trim()) return;

    const userMessage = { text, isUser: true, timestamp: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    setIsStreaming(true);
    setStreamingMessage('');

    try {
      // Replace this with your actual Gemini API streaming call
      const stream = mockStreamResponse(text);
      let fullResponse = '';

      for await (const chunk of stream) {
        fullResponse += chunk;
        setStreamingMessage(fullResponse);
      }

      setMessages(prev => [...prev, { 
        text: fullResponse, 
        isUser: false, 
        timestamp: Date.now() 
      }]);
      setStreamingMessage('');
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        text: "I apologize, but I encountered an error. Please try again.", 
        isUser: false,
        timestamp: Date.now()
      }]);
      setStreamingMessage('');
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl h-[90vh] bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 flex flex-col overflow-y-auto">
        <div className='h-full bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 flex flex-col overflow-y-auto'>
        {/* Chat Area */}
        <div className="flex-1 flex flex-col relative">
          {messages.length === 0 && !isStreaming ? (
            <div className="flex-1 flex flex-col justify-center items-center p-8 text-center">
              <div className="mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">Welcome to Cypersphere AI</h2>
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
        </div>
        {/* Input Area */}
        <div className="p-6 bg-white/5 backdrop-blur-sm border-t border-white/10">
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
  );
}

export default Chatbot;