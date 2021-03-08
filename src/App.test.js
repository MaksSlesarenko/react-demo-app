import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./modules/stories/Stories", () => "h1");

test("render layout", () => {
  const res = render(<App />);
  expect(res).toMatchSnapshot("<div><h1 /></div>");
});
