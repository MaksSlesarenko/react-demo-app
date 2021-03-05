import { render, screen } from "@testing-library/react";
import DateFormat from "./DateFormat";

test("renders old date", () => {
  render(<DateFormat time={1614561036} />);
  const element = screen.getByText(/3\:10 3\/1\/2021/i);
  expect(element).toBeInTheDocument();
});

test("renders Yesterday's date", () => {
  const now = new Date();
  now.setDate(now.getDate() - 1);

  render(<DateFormat time={now.getTime() / 1000} />);
  const element = screen.getByText(/Yesterday at /i);
  expect(element).toBeInTheDocument();
});

test("renders Today's date", () => {
  const now = new Date();

  render(<DateFormat time={now.getTime() / 1000} />);
  const element = screen.getByText(/Today at /i);
  expect(element).toBeInTheDocument();
});
