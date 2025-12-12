import { formatDate, capitalize } from './format';

describe('formatDate', () => {
  it('should format a valid date string', () => {
    const result = formatDate('2024-12-25');
    expect(result).toMatch(/12\/25\/24/);
  });

  it('should return empty string for null', () => {
    expect(formatDate(null)).toBe('');
  });

  it('should return empty string for undefined', () => {
    expect(formatDate(undefined)).toBe('');
  });

  it('should return empty string for empty string', () => {
    expect(formatDate('')).toBe('');
  });

  it('should handle ISO date strings', () => {
    const result = formatDate('2024-01-15T10:30:00Z');
    expect(result).toMatch(/01\/15\/24/);
  });
});

describe('capitalize', () => {
  it('should capitalize the first letter of a string', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('should handle single character strings', () => {
    expect(capitalize('a')).toBe('A');
  });

  it('should handle already capitalized strings', () => {
    expect(capitalize('Hello')).toBe('Hello');
  });

  it('should return empty string for empty input', () => {
    expect(capitalize('')).toBe('');
  });

  it('should handle strings with spaces', () => {
    expect(capitalize('hello world')).toBe('Hello world');
  });

  it('should handle strings with numbers', () => {
    expect(capitalize('123abc')).toBe('123abc');
  });
});
