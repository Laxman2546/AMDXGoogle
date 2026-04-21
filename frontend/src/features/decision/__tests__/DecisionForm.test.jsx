import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DecisionForm from '../components/DecisionForm';

describe('DecisionForm Component', () => {
  it('renders all inputs and submits correctly', () => {
    const handleSubmit = vi.fn();
    render(<DecisionForm onSubmit={handleSubmit} isLoading={false} />);

    // Check elements exist
    expect(screen.getByLabelText(/Time of Day/i)).toBeDefined();
    expect(screen.getByLabelText(/Budget/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /Get Decision/i })).toBeDefined();

    // Interact with form
    fireEvent.change(screen.getByLabelText(/Time of Day/i), { target: { name: 'time', value: 'Morning' } });
    fireEvent.change(screen.getByLabelText(/Budget/i), { target: { name: 'budget', value: '500' } });

    // Submit
    fireEvent.click(screen.getByRole('button', { name: /Get Decision/i }));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith({
      time: 'Morning',
      budget: '500',
      goal: 'normal',
      dietPreference: 'veg'
    });
  });
});
