import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation'; // Importing useRouter hook
import RegisterPage from '../../app/register/page'; // Correct import path

// Mocking the Next.js useRouter with jest.spyOn
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('RegisterPage', () => {
  it('renders registration form with name, email, password, and confirm password fields', () => {
    render(<RegisterPage />);

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Register/i })
    ).toBeInTheDocument();
  });

  it('shows error message when fields are empty', async () => {
    render(<RegisterPage />);

    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    // Check if error message is displayed
    await waitFor(() =>
      expect(
        screen.getByText(/Email and password are required/i)
      ).toBeInTheDocument()
    );
  });

  it('shows error when email format is invalid', async () => {
    render(<RegisterPage />);

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'invalid-email' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    // Check if the "Invalid email format" error appears
    await waitFor(() =>
      expect(screen.getByText(/Invalid email format/i)).toBeInTheDocument()
    );
  });

  it('shows error when passwords do not match', async () => {
    render(<RegisterPage />);

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: 'password321' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    // Check if the "Passwords do not match" error appears
    await waitFor(() =>
      expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument()
    );
  });

  it('shows success message on valid registration', async () => {
    render(<RegisterPage />);

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    // Check if success message appears
    await waitFor(() =>
      expect(
        screen.getByText(/Registration successful! Redirecting to login.../i)
      ).toBeInTheDocument()
    );
  });

  it('navigates to login page on successful registration', async () => {
    // Mocking useRouter's push method
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValueOnce({ push: mockPush });

    render(<RegisterPage />);

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    // Check if push was called to navigate to login page
    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/login'));
  });
});
