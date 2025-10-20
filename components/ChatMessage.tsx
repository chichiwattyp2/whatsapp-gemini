
import React from 'react';
import type { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

const CheckIcon: React.FC<{ delivered: boolean }> = ({ delivered }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 inline-block ml-1 ${delivered ? 'text-blue-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        {delivered && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" style={{ transform: 'translateX(-4px)' }}/>}
    </svg>
);


const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const messageAlignment = isUser ? 'justify-end' : 'justify-start';
  const messageBubbleColor = isUser ? 'bg-[#DCF8C6]' : 'bg-white';

  return (
    <div className={`flex ${messageAlignment} mb-3`}>
      <div className={`rounded-lg px-3 py-2 max-w-sm shadow-sm ${messageBubbleColor}`}>
        <p className="text-sm text-gray-800">{message.text}</p>
        <div className="text-right text-xs text-gray-400 mt-1">
          {message.timestamp}
          {isUser && <CheckIcon delivered={true} />}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
