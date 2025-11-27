import React, { useState, useCallback } from 'react';
import { CALCULATOR_BUTTONS, INITIAL_STATE } from '../constants';
import { CalculatorState } from '../types';
import Display from './Display';
import MagicButton from './MagicButton';
import { getMathExplanation } from '../services/geminiService';

const Calculator: React.FC = () => {
  const [state, setState] = useState<CalculatorState>(INITIAL_STATE);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Core Calculator Logic
  const calculate = useCallback((a: string, b: string, op: string): string => {
    const num1 = parseFloat(a);
    const num2 = parseFloat(b);
    let result = 0;

    switch (op) {
      case '+': result = num1 + num2; break;
      case '-': result = num1 - num2; break;
      case '*': result = num1 * num2; break;
      case '/': 
        if (num2 === 0) throw new Error("Div by Zero");
        result = num1 / num2; 
        break;
      case '%': result = num1 % num2; break;
      default: return b;
    }

    // Handle floating point precision issues roughly
    return String(Math.round(result * 100000000) / 100000000);
  }, []);

  const handlePress = (value: string, type: string) => {
    // Reset AI response on new input
    if (aiResponse) setAiResponse(null);

    setState(prev => {
      // Clear Error State
      if (prev.isError) {
        return { ...INITIAL_STATE, currentInput: type === 'digit' ? value : '0' };
      }

      if (type === 'digit') {
        if (value === '.' && prev.currentInput.includes('.')) return prev;
        
        let newInput = prev.currentInput === '0' && value !== '.' ? value : prev.currentInput + value;
        
        // Check if we just finished a calculation (implied by no operator but we have a previous input which usually shouldn't happen unless we reset logic, 
        // but let's stick to standard behavior: if fresh start)
        // Simplified: if currentInput matches result of last calc, overwrite it. 
        // For this simple implementation, we assume continuous operations.
        
        return { ...prev, currentInput: newInput };
      }

      if (type === 'action') {
        if (value === 'clear') return INITIAL_STATE;
        if (value === 'delete') {
          const trimmed = prev.currentInput.slice(0, -1);
          return { ...prev, currentInput: trimmed || '0' };
        }
        if (value === '=') {
          if (!prev.operator || !prev.previousInput) return prev;
          try {
            const result = calculate(prev.previousInput, prev.currentInput, prev.operator);
            return {
              ...prev,
              currentInput: result,
              previousInput: '',
              operator: null,
              history: [`${prev.previousInput} ${prev.operator} ${prev.currentInput} = ${result}`],
            };
          } catch (e) {
            return { ...prev, currentInput: 'Error', isError: true };
          }
        }
      }

      if (type === 'operator') {
        if (prev.operator && prev.previousInput && prev.currentInput !== '0') {
           // Chain calculation
           try {
             const result = calculate(prev.previousInput, prev.currentInput, prev.operator);
             return {
               ...prev,
               previousInput: result,
               currentInput: '0',
               operator: value,
             };
           } catch(e) {
             return { ...prev, currentInput: 'Error', isError: true };
           }
        }

        return {
          ...prev,
          operator: value,
          previousInput: prev.currentInput,
          currentInput: '0',
        };
      }

      return prev;
    });
  };

  const handleMagicHelp = async () => {
    // We need a valid history item to explain
    const lastCalculation = state.history[state.history.length - 1];
    
    // Or if there is a value on screen that is interesting
    let promptExpression = "";
    let promptResult = state.currentInput;

    if (lastCalculation) {
      const parts = lastCalculation.split('=');
      promptExpression = parts[0].trim();
      promptResult = parts[1].trim();
    } else {
      promptExpression = "The number";
    }

    setIsLoading(true);
    const explanation = await getMathExplanation(promptExpression, promptResult);
    setAiResponse(explanation);
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="glass-panel rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-24 h-24 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>

        <h1 className="text-center text-xl font-bold text-gray-600 mb-4 tracking-wider">Kawaii Calc 🌸</h1>
        
        <Display 
          value={state.currentInput} 
          expression={
            state.operator 
            ? `${state.previousInput} ${state.operator}` 
            : (state.history.length > 0 ? 'Ans' : '')
          }
          isError={state.isError}
        />

        <div className="grid grid-cols-4 gap-3">
          {CALCULATOR_BUTTONS.map((btn) => (
            <button
              key={btn.label}
              onClick={() => handlePress(btn.value, btn.type)}
              className={`
                ${btn.className}
                h-14 rounded-2xl font-semibold text-lg shadow-sm transition-all duration-150
                active:scale-95 active:shadow-inner flex items-center justify-center
                ${btn.label === '0' ? 'col-span-2' : ''}
              `}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <MagicButton 
          onClick={handleMagicHelp} 
          isLoading={isLoading} 
          disabled={state.isError || (state.history.length === 0 && state.currentInput === '0')} 
        />

        {aiResponse && (
          <div className="mt-4 p-4 bg-white/90 rounded-2xl border-2 border-pink-200 text-gray-700 text-sm shadow-md animate-fade-in">
            <p className="font-bold text-pink-500 mb-1">✨ AI Explanation:</p>
            {aiResponse}
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;