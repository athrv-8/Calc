import { ButtonConfig } from './types';

export const CALCULATOR_BUTTONS: ButtonConfig[] = [
  { label: 'C', value: 'clear', type: 'action', className: 'bg-red-200 text-red-600 hover:bg-red-300' },
  { label: 'DEL', value: 'delete', type: 'action', className: 'bg-orange-200 text-orange-600 hover:bg-orange-300' },
  { label: '%', value: '%', type: 'operator', className: 'bg-kawaii-purple text-white hover:bg-purple-300' },
  { label: '÷', value: '/', type: 'operator', className: 'bg-kawaii-purple text-white hover:bg-purple-300' },
  
  { label: '7', value: '7', type: 'digit', className: 'bg-white text-kawaii-dark hover:bg-gray-100' },
  { label: '8', value: '8', type: 'digit', className: 'bg-white text-kawaii-dark hover:bg-gray-100' },
  { label: '9', value: '9', type: 'digit', className: 'bg-white text-kawaii-dark hover:bg-gray-100' },
  { label: '×', value: '*', type: 'operator', className: 'bg-kawaii-purple text-white hover:bg-purple-300' },
  
  { label: '4', value: '4', type: 'digit', className: 'bg-white text-kawaii-dark hover:bg-gray-100' },
  { label: '5', value: '5', type: 'digit', className: 'bg-white text-kawaii-dark hover:bg-gray-100' },
  { label: '6', value: '6', type: 'digit', className: 'bg-white text-kawaii-dark hover:bg-gray-100' },
  { label: '-', value: '-', type: 'operator', className: 'bg-kawaii-purple text-white hover:bg-purple-300' },
  
  { label: '1', value: '1', type: 'digit', className: 'bg-white text-kawaii-dark hover:bg-gray-100' },
  { label: '2', value: '2', type: 'digit', className: 'bg-white text-kawaii-dark hover:bg-gray-100' },
  { label: '3', value: '3', type: 'digit', className: 'bg-white text-kawaii-dark hover:bg-gray-100' },
  { label: '+', value: '+', type: 'operator', className: 'bg-kawaii-purple text-white hover:bg-purple-300' },
  
  { label: '0', value: '0', type: 'digit', className: 'col-span-2 bg-white text-kawaii-dark hover:bg-gray-100 rounded-full' },
  { label: '.', value: '.', type: 'digit', className: 'bg-white text-kawaii-dark hover:bg-gray-100' },
  { label: '=', value: '=', type: 'action', className: 'bg-kawaii-pink text-pink-600 hover:bg-pink-300' },
];

export const INITIAL_STATE = {
  currentInput: '0',
  previousInput: '',
  operator: null,
  history: [],
  isError: false,
};