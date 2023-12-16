import { render, screen } from "@testing-library/react";
import Disclaimer from "../Disclaimer";

test("renders disclaimer modal", () => {
  render(<Disclaimer />);
  const disclaimerElement = screen.getByRole("heading", { name: "Disclaimer" });
  expect(disclaimerElement.textContent).toBe("Disclaimer");
});
