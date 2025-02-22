import React from "react";
import { render, screen } from "@testing-library/react";
import MoviesPage from "./page";
import { fetchMovies, fetchGenres } from "@/lib/api";

jest.mock("@/lib/api", () => ({
  fetchMovies: jest.fn(),
  fetchGenres: jest.fn(),
}));
jest.mock("@/components/movies/MoviesFilters", () => {
  return jest.fn(() => (
    <div data-testid="movies-filters">Mocked MoviesFilters</div>
  ));
});
jest.mock("@/components/movies/MoviesList", () => {
  return jest.fn(() => <div data-testid="movies-list">Mocked MoviesList</div>);
});

describe("MoviesPage", () => {
  const mockMovies = [
    { id: "1", title: "Test Movie 1" },
    { id: "2", title: "Test Movie 2" },
  ];
  const mockGenres = [
    { id: "1", title: "Action" },
    { id: "2", title: "Comedy" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders filters and movies list components", async () => {
    (fetchMovies as jest.Mock).mockResolvedValue(mockMovies);
    (fetchGenres as jest.Mock).mockResolvedValue(mockGenres);

    render(
      await (async () =>
        await MoviesPage({
          searchParams: Promise.resolve({ page: "1", limit: "25" }),
        }))()
    );

    expect(fetchMovies).toHaveBeenCalledWith({
      page: 1,
      limit: 25,
      search: "",
      genre: "",
    });
    expect(fetchGenres).toHaveBeenCalled();

    expect(screen.getByTestId("movies-filters")).toBeInTheDocument();
    expect(screen.getByTestId("movies-list")).toBeInTheDocument();
  });
});
