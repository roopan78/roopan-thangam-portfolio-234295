import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders portfolio header", () => {
  render(<App />);
  const heading = screen.getByRole("heading", { name: /roopan thangam/i });
  expect(heading).toBeInTheDocument();
});
