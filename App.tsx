import React from 'react';
import Calculator from './components/Calculator';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Calculator />
      
      {/* Footer / Credits */}
      <div className="fixed bottom-4 text-center w-full text-gray-500 text-xs pointer-events-none">
        <p>Made with 💖 and Gemini AI</p>
      </div>
    </div>
  );
};

export default App;