import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the SQP dashboard shell', () => {
  render(<App />);
  expect(screen.getByText(/Real-Time Monitoring Dashboard/i)).toBeDefined();
  expect(screen.getByRole('button', { name: /Supply Dashboard/i })).toBeDefined();
  expect(screen.getByText(/Current Date/i)).toBeDefined();
});
