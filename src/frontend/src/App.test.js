import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn link', () => {
  render(<App />);

  const stytchEmoji = screen.getByText(/🪡/i)

  expect(stytchEmoji).toBeInTheDocument();
});
