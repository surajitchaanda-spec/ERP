import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Button } from '../components/Button';

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('applies the full width prop', () => {
    render(<Button fullWidth>Full width</Button>);
    expect(screen.getByRole('button', { name: 'Full width' })).toHaveStyle({ width: '100%' });
  });
});
