import { render, screen } from '@testing-library/react';
import App from './App';

test('renders 欢迎语', () => {
  render(<App />);
  const linkElement = screen.getByText(/欢迎你大帅比/i);
  expect(linkElement).toBeInTheDocument();
});
