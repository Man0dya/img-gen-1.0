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
  // Use environment variable if available, otherwise use Netlify Functions
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl) return envUrl;

  // Check if we're in production (Netlify)
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    return ''; // Use relative URLs for Netlify Functions
  }

  // Development fallback
  return 'http://localhost:8080';
};

// Netlify Functions URLs
export const getFunctionUrl = (functionName) => {
  const baseUrl = getApiBaseUrl();
  if (baseUrl === '') {
    // Production - use relative path to Netlify Functions
    return `/.netlify/functions/${functionName}`;
  } else {
    // Development - use full URL
    return `${baseUrl}/.netlify/functions/${functionName}`;
  }
};
