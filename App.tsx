import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Message } from './types';
import { sendChatMessage, resetChat } from './services/geminiService';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import TypingIndicator from './components/TypingIndicator';
import Header from './components/Header';
import ApiKeyScreen from './components/ApiKeyScreen';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hey! I'm your AI assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkApiKey = async () => {
      try {
        if (window.aistudio && await window.aistudio.hasSelectedApiKey()) {
          setHasApiKey(true);
        }
      } catch (e) {
        console.error("Error checking for API key:", e);
      }
    };
    checkApiKey();
  }, []);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSelectKey = async () => {
    try {
      await window.aistudio.openSelectKey();
      // Assume success to avoid race conditions where hasSelectedApiKey() might not be immediately true.
      setHasApiKey(true);
      setError(null); // Clear previous errors
    } catch (e) {
      console.error("Error opening select key dialog:", e);
      setError("Could not open the API key selection dialog.");
    }
  };

  const handleSendMessage = useCallback(async (inputText: string) => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const aiResponseText = await sendChatMessage(inputText);

      const aiMessage: Message = {
        id: Date.now() + 1,
        text: aiResponseText,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      let errorMessageText = 'Sorry, I had trouble connecting. Please try again.';
      if (err instanceof Error && err.message.includes('Requested entity was not found')) {
          errorMessageText = 'Your API key appears to be invalid. Please select a valid key.';
          setHasApiKey(false);
          resetChat();
      }
      
      setError(errorMessageText);
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: errorMessageText,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {hasApiKey ? (
        <div className="w-full max-w-lg h-full sm:h-[90vh] sm:max-h-[700px] flex flex-col bg-[#E5DDD5] shadow-2xl rounded-lg overflow-hidden">
          <Header />
          <div 
            className="flex-1 p-4 overflow-y-auto"
            style={{
              backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAEBDgMAAABUv37XAAAABlBMVEXd3d3///+SIKJ1AAABUUlEQVRo3u3YMREAMAzEsM7/oXcPghxQDm3N923S1i8BBAICgYAAYCAgEAQEAoGAAEAgIBAMBAKBgABAICAQDAQCgYAAQCAgEAwEAoGAAEAgIBAMBAKBgABAICAQDAQCgYAAQCAgEAwEAoGAAEAgIBAMBAKBgABAICAQDAQCgYAAQCAgEAwEAoGAAEAgIBAMBAKBgABAICAQDAQCgYAAQCAgEAwEAoGAAEAgIBAMBAKBgABAICAQDAQCgYAAQCAgEAwEAoGAAEAgIBAMBAKBgABAICAQDAQCgYAAQCAgEAwEAoGAAEAgIBAMBAKBgABAICAQDAQCgYAAQCAgEAwEAoGAAEAgIBAMBAKBgABAICAQDAQCgYAAQCAgEAwEAoGAAEAgIBAMAAN4uFweYAncaMceAAAAAElFTkSuQmCC")`,
            }}
          >
            {messages.map(message => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={chatEndRef} />
          </div>
          {error && <div className="text-center text-red-500 text-sm p-2">{error}</div>}
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      ) : (
        <ApiKeyScreen onSelectKey={handleSelectKey} error={error} />
      )}
    </div>
  );
};

export default App;