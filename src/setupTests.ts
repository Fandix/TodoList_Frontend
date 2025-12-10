// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Jest's JSDOM environment doesn't provide TextEncoder/TextDecoder by default,
// but React Router's server-side helpers expect them to exist.
import { TextEncoder, TextDecoder } from 'util';

if (typeof global.TextEncoder === 'undefined') {
  // @ts-expect-error - we're intentionally adding the polyfill to the global scope for tests
  global.TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === 'undefined') {
  // @ts-expect-error - we're intentionally adding the polyfill to the global scope for tests
  global.TextDecoder = TextDecoder;
}
