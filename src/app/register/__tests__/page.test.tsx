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
  });

  it("renders all input fields and button", () => {
    render(<RegisterPage />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
  });

  it("shows error when invalid email is submitted", () => {
    render(<RegisterPage />);
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "invalid-email" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    expect(screen.getByText(/Invalid email format/)).toBeInTheDocument();
  });

  it("shows error when passwords do not match", () => {
    render(<RegisterPage />);
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    expect(screen.getByText(/Passwords do not match/)).toBeInTheDocument();
  });

  it("shows success message and navigates to login on valid submission", async () => {
    render(<RegisterPage />);
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    expect(screen.getByText(/Registration successful!/)).toBeInTheDocument();

    // Wait for navigation trigger
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/login");
    });
  });
});
