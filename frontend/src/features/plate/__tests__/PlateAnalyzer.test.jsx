import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PlateAnalyzer from '../components/PlateAnalyzer';

describe('PlateAnalyzer Component', () => {
  it('allows text input and submits payload', () => {
    const handleSubmit = vi.fn();
    render(<PlateAnalyzer onSubmit={handleSubmit} isLoading={false} />);

    const textarea = screen.getByLabelText(/Describe your food/i);
    fireEvent.change(textarea, { target: { value: 'Apple and banana' } });

    fireEvent.click(screen.getByRole('button', { name: /Analyze Meal/i }));

    expect(handleSubmit).toHaveBeenCalledWith({ description: 'Apple and banana' });
  });
});
