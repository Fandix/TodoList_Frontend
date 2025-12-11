export const MIN_PASSWORD_LENGTH = 6;

export const TASKS_PER_PAGE = 10;

export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
} as const;

export const API_CONFIG = {
  GRAPHQL_ENDPOINT: process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:3000/graphql',
} as const;
