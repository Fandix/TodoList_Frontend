/**
 * Application-wide constants
 */

// Authentication
export const MIN_PASSWORD_LENGTH = 6;

// Pagination
export const TASKS_PER_PAGE = 10;

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
} as const;

// API Configuration
export const API_CONFIG = {
  GRAPHQL_ENDPOINT: process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:3000/graphql',
} as const;
