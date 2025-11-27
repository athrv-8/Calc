export enum CalculatorActionType {
  ADD_DIGIT = 'ADD_DIGIT',
  ADD_OPERATOR = 'ADD_OPERATOR',
  CLEAR = 'CLEAR',
  DELETE = 'DELETE',
  CALCULATE = 'CALCULATE',
  SET_RESULT = 'SET_RESULT',
}

export interface CalculatorState {
  currentInput: string;
  previousInput: string;
  operator: string | null;
  history: string[];
  isError: boolean;
}

export interface ButtonConfig {
  label: string;
  value: string;
  type: 'digit' | 'operator' | 'action' | 'special';
  className?: string;
}