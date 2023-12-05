import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "./Login";
import { toBeInTheDocument } from "@testing-library/jest-dom/matchers";

jest.mock("axios", () => ({
  __esModule: true,

  default: {
    get: () => ({
      data: { id: 1, name: "John" }
    })
  }
}));

test("username input should be rendered", () => {
  render(<Login />)
  const usernameInputElement = screen.getByPlaceholderText(/username/i)
  expect(usernameInputElement).toBeInTheDocument();
});

test("username input should be empty", () => {
  render(<Login />)
  const usernameInputElement = screen.getByPlaceholderText(/username/i);
  expect(usernameInputElement.value).toBe("");
});

test("username input should change", () => {
  render(<Login />)
  const usernameInputElement = screen.getByPlaceholderText(/username/i);
  const testValue = "test"

  fireEvent.change(usernameInputElement, { target: { value: testValue } });
  expect(usernameInputElement.value).toBe(testValue);
});

test("password input should be rendered", () => {
  render(<Login />)
  const passwordInputElement = screen.getByPlaceholderText(/password/i)
  expect(passwordInputElement).toBeInTheDocument()
});

test("password input should be empty", () => {
  render(<Login />)
  const passwordInputElement = screen.getByPlaceholderText(/password/i)
  expect(passwordInputElement.value).toBe("")
});

test("password input should change", () => {
  render(<Login />);
  const passwordInputElement = screen.getByPlaceholderText(/password/i);
  const testValue = "test";

  fireEvent.change(passwordInputElement, { target: { value: testValue } });
  expect(passwordInputElement.value).toBe(testValue);
});

test("button should be rendered", () => {
  render(<Login />)
  const buttonElement = screen.getByRole("button")
  expect(buttonElement).toBeInTheDocument()
});

test("button should be disabled by default", () => {
  render(<Login />)
  const buttonElement = screen.getByRole("button")
  expect(buttonElement).toBeDisabled()
});

test("loading should not be rendered", () => {
  render(<Login />)
  const buttonElement = screen.getByRole("button")
  expect(buttonElement).not.toHaveTextContent("Loading...")
});

test("button should not be disabled when username and password are filled", () => {
  render(<Login />)
  const buttonElement = screen.getByRole("button")
  const usernameInputElement = screen.getByPlaceholderText(/username/i);
  const passwordInputElement = screen.getByPlaceholderText(/password/i);

  const testValue = "test";

  fireEvent.change(usernameInputElement, { target: { value: testValue } });
  fireEvent.change(passwordInputElement, { target: { value: testValue } });
  expect(buttonElement).not.toBeDisabled()
});

test("error message should be hidden by default", () => {
  render(<Login />)
  const errorElement = screen.getByTestId("error-message")
  expect(errorElement).not.toBeVisible()
});

test("loading should be rendered when button is clicked", () => {
  render(<Login />);
  const buttonElement = screen.getByRole("button");
  const usernameInputElement = screen.getByPlaceholderText(/username/i);
  const passwordInputElement = screen.getByPlaceholderText(/password/i);

  const testValue = "test";

  fireEvent.change(usernameInputElement, { target: { value: testValue } });
  fireEvent.change(passwordInputElement, { target: { value: testValue } });
  fireEvent.click(buttonElement);

  expect(buttonElement).toHaveTextContent("Loading...");
});

test("loading should not be rendered after fetching", async () => {
  render(<Login />);
  const buttonElement = screen.getByRole("button");
  const usernameInputElement = screen.getByPlaceholderText(/username/i);
  const passwordInputElement = screen.getByPlaceholderText(/password/i);

  const testValue = "test";

  fireEvent.change(usernameInputElement, { target: { value: testValue } });
  fireEvent.change(passwordInputElement, { target: { value: testValue } });
  fireEvent.click(buttonElement);

  await waitFor(() => expect(buttonElement).not.toHaveTextContent("Loading..."));
});

test("user should be rendered after fetching", async () => {
  render(<Login />);
  const buttonElement = screen.getByRole("button");
  const usernameInputElement = screen.getByPlaceholderText(/username/i);
  const passwordInputElement = screen.getByPlaceholderText(/password/i);

  const testValue = "test";

  fireEvent.change(usernameInputElement, { target: { value: testValue } });
  fireEvent.change(passwordInputElement, { target: { value: testValue } });
  fireEvent.click(buttonElement);

  const userItem = await screen.findByText("John");

  expect(userItem).toBeInTheDocument();
});