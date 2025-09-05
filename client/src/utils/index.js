import {surpriseMePrompts} from '../constants';

export function getRandomPrompt(prompt) {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);

  const randomPrompt = surpriseMePrompts[randomIndex];

  if(randomPrompt === prompt)
    return getRandomPrompt(prompt);

  return randomPrompt;
}

// API base URL for different environments
export const getApiBaseUrl = () => {
  // Use environment variable if available, otherwise fallback to localhost for development
  return import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
};
