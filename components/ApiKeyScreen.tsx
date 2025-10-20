import React from 'react';

interface ApiKeyScreenProps {
  onSelectKey: () => void;
  error?: string | null;
}

const ApiKeyScreen: React.FC<ApiKeyScreenProps> = ({ onSelectKey, error }) => {
  return (
    <div className="w-full max-w-lg h-full sm:h-auto bg-white shadow-2xl rounded-lg overflow-hidden p-8 text-center flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to AI WhatsApp Responder</h1>
      <p className="text-gray-600 mb-6">
        To start chatting, please select a Google AI API key. Your key is used only for this session and is not stored.
      </p>
      <button
        onClick={onSelectKey}
        className="bg-[#128C7E] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#075E54] transition duration-300 shadow-md"
      >
        Select API Key
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <p className="text-xs text-gray-500 mt-8">
        For information on API keys and billing, please visit the{' '}
        <a 
          href="https://ai.google.dev/gemini-api/docs/billing" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[#128C7E] hover:underline"
        >
          official documentation
        </a>.
      </p>
    </div>
  );
};

export default ApiKeyScreen;
