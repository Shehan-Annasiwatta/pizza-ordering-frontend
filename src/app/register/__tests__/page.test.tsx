import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegisterPage from "../page";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("RegisterPage", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    jest.useFakeTimers(); // 👈 ADD THIS
  });

  afterEach(() => {
    jest.runOnlyPendingTimers(); // prevent leaks
    jest.useRealTimers();
  });

  it("renders all input fields and button", () => {
    render(<RegisterPage />);
    expect(screen.getByTestId("name-input")).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("confirmPassword-input")).toBeInTheDocument();
    expect(screen.getByTestId("register-button")).toBeInTheDocument();
  });

  it("shows error when invalid email is submitted", () => {
    render(<RegisterPage />);
    fireEvent.change(screen.getByTestId("name-input"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "invalid-email" },
    });
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByTestId("confirmPassword-input"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByTestId("register-button"));
    expect(screen.getByText(/Invalid email format/i)).toBeInTheDocument();
  });

  it("shows error when passwords do not match", () => {
    render(<RegisterPage />);
    fireEvent.change(screen.getByTestId("name-input"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByTestId("confirmPassword-input"), {
      target: { value: "wrongpass" },
    });
    fireEvent.click(screen.getByTestId("register-button"));
    expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
  });

  it("shows success message and navigates to login on valid submission", async () => {
    render(<RegisterPage />);
    fireEvent.change(screen.getByTestId("name-input"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByTestId("confirmPassword-input"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByTestId("register-button"));

    expect(screen.getByText(/Registration successful/i)).toBeInTheDocument();

    // 👇 advance timers manually
    jest.advanceTimersByTime(1500);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/login");
    });
  });
});
