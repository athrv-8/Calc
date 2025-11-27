import React from 'react';

interface MagicButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled: boolean;
}

const MagicButton: React.FC<MagicButtonProps> = ({ onClick, isLoading, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        w-full mt-4 py-3 rounded-2xl font-bold text-white transition-all transform duration-200
        flex items-center justify-center gap-2 shadow-md
        ${disabled 
          ? 'bg-gray-300 cursor-not-allowed' 
          : 'bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 hover:scale-[1.02] active:scale-95'
        }
      `}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Thinking...</span>
        </>
      ) : (
        <>
          <span className="text-xl">✨</span>
          <span>Magic Math Help</span>
        </>
      )}
    </button>
  );
};

export default MagicButton;