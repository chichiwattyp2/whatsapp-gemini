
import React from 'react';

const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
);

const MoreVertIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
    </svg>
);

const Header: React.FC = () => {
    return (
        <header className="bg-[#075E54] text-white p-3 flex items-center shadow-md z-10">
            <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden mr-3">
                 <img src="https://picsum.photos/seed/ai/200" alt="AI Assistant Profile" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
                <h1 className="text-lg font-semibold">AI Assistant</h1>
                <p className="text-xs text-gray-200">online</p>
            </div>
            <div className="flex items-center space-x-4">
                <PhoneIcon />
                <MoreVertIcon />
            </div>
        </header>
    );
};

export default Header;
