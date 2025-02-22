// Pagination.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import Pagination from "./Pagination"; // adjust the path as needed
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

import { usePathname, useSearchParams } from "next/navigation";

describe("Pagination Component", () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue("/test");
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams({}));
  });

  it("renders a disabled Previous button when currentPage is 1", () => {
    render(<Pagination currentPage={1} totalPages={5} />);
    const previousButton = screen.getByRole("button", { name: /previous/i });

    expect(previousButton).toBeDisabled();
    expect(previousButton.closest("a")).toBeNull();
  });

  it("renders an active Previous button when currentPage is greater than 1", () => {
    render(<Pagination currentPage={2} totalPages={5} />);
    const previousButton = screen.getByRole("button", { name: /previous/i });
    expect(previousButton).not.toBeDisabled();

    const link = previousButton.closest("a");
    expect(link).not.toBeNull();
    expect(link).toHaveAttribute("href", "/test?page=1");
  });

  it("renders a disabled Next button when currentPage equals totalPages", () => {
    render(<Pagination currentPage={5} totalPages={5} />);
    const nextButton = screen.getByRole("button", { name: /next/i });

    expect(nextButton).toBeDisabled();
    expect(nextButton.closest("a")).toBeNull();
  });

  it("renders an active Next button when currentPage is less than totalPages", () => {
    render(<Pagination currentPage={3} totalPages={5} />);
    const nextButton = screen.getByRole("button", { name: /next/i });

    expect(nextButton).not.toBeDisabled();

    const link = nextButton.closest("a");
    expect(link).not.toBeNull();
    expect(link).toHaveAttribute("href", "/test?page=4");
  });

  it("displays the current page text correctly", () => {
    render(<Pagination currentPage={3} totalPages={5} />);

    expect(screen.getByText("Page 3 of 5")).toBeInTheDocument();
  });
});
