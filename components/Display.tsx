import React from 'react';

interface DisplayProps {
  value: string;
  expression: string;
  isError: boolean;
}

const Display: React.FC<DisplayProps> = ({ value, expression, isError }) => {
  return (
    <div className="bg-white/80 rounded-2xl p-4 mb-4 text-right shadow-inner border border-white">
      <div className="text-gray-400 text-sm h-6 font-medium overflow-hidden text-ellipsis whitespace-nowrap">
        {expression}
      </div>
      <div 
        className={`
          text-4xl font-bold overflow-hidden text-ellipsis whitespace-nowrap tracking-wide
          ${isError ? 'text-red-500' : 'text-gray-700'}
        `}
      >
        {value}
      </div>
    </div>
  );
};

export default Display;