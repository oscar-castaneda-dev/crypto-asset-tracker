import { screen } from "@testing-library/react";
import { Header } from "@/components/layout/header";
import { renderWithProvider } from "@/tests/utils";

describe("Header", () => {
  it("renders site title", () => {
    renderWithProvider(<Header />);
    expect(screen.getByText(/crypto asset tracker/i)).toBeInTheDocument();
  });

  it("renders ModeToggle component", () => {
    renderWithProvider(<Header />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
