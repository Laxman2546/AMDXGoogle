import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ConditionForm from '../components/ConditionForm';

describe('ConditionForm Component', () => {
  it('disables submit button if no condition is selected', () => {
    const handleSubmit = vi.fn();
    render(<ConditionForm onSubmit={handleSubmit} isLoading={false} />);

    const button = screen.getByRole('button', { name: /Get Advice/i });
    expect(button.disabled).toBe(true);

    fireEvent.change(screen.getByLabelText(/How are you feeling/i), { target: { name: 'condition', value: 'fever' } });
    expect(button.disabled).toBe(false);
  });
});
