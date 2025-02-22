import { renderHook } from "@testing-library/react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import useQueryParams from "./useQueryParams";

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

describe("useQueryParams", () => {
  const mockUseSearchParams = useSearchParams as jest.Mock;
  const mockUseRouter = useRouter as jest.Mock;
  const mockUsePathname = usePathname as jest.Mock;

  let mockPush: jest.Mock;

  beforeEach(() => {
    mockPush = jest.fn();
    mockUseRouter.mockReturnValue({ push: mockPush });
    mockUsePathname.mockReturnValue("/movies");
  });

  it("updates query parameters correctly", () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams("page=1&limit=10"));

    const { result } = renderHook(() => useQueryParams());

    result.current.updateParams({ search: "action", genre: "comedy" });

    expect(mockPush).toHaveBeenCalledWith(
      "/movies?page=1&limit=10&search=action&genre=comedy"
    );
  });

  it("removes query parameters when set to undefined", () => {
    mockUseSearchParams.mockReturnValue(
      new URLSearchParams("page=1&limit=10&search=oldValue")
    );

    const { result } = renderHook(() => useQueryParams());

    result.current.updateParams({ search: undefined });

    expect(mockPush).toHaveBeenCalledWith("/movies?page=1&limit=10");
  });

  it("adds new parameters while preserving existing ones", () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams("sort=desc"));

    const { result } = renderHook(() => useQueryParams());

    result.current.updateParams({ page: 2, genre: "horror" });

    expect(mockPush).toHaveBeenCalledWith(
      "/movies?sort=desc&page=2&genre=horror"
    );
  });
});
