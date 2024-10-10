import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./Login";
import { AuthProvider } from "./AuthContext";

test("renders login form", () => {
  render(
    <AuthProvider>
      <Router>
        <Login />
      </Router>
    </AuthProvider>,
  );

  const usernameInput = screen.getByPlaceholderText("Username");
  const passwordInput = screen.getByPlaceholderText("Password");
  const loginButton = screen.getByText("Login");

  expect(usernameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
});

test("displays error message on invalid login", () => {
  render(
    <AuthProvider>
      <Router>
        <Login />
      </Router>
    </AuthProvider>,
  );

  const usernameInput = screen.getByPlaceholderText("Username");
  const passwordInput = screen.getByPlaceholderText("Password");
  const loginButton = screen.getByText("Login");

  fireEvent.change(usernameInput, { target: { value: "wronguser" } });
  fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
  fireEvent.click(loginButton);

  const errorMessage = screen.getByText("Invalid username or password");
  expect(errorMessage).toBeInTheDocument();
});
