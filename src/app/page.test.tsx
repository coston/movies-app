import { render } from "@testing-library/react";
import MoviesPage from "./page";
import { fetchMovies, fetchGenres, fetchMoviesCount } from "@/lib/api";
import MoviesFilters from "@/components/movies/MoviesFilters";
import MoviesList from "@/components/movies/MoviesList";

jest.mock("@/lib/api", () => ({
  fetchMovies: jest.fn(),
  fetchGenres: jest.fn(),
  fetchMoviesCount: jest.fn(),
}));
jest.mock("@/components/movies/MoviesFilters");
jest.mock("@/components/movies/MoviesList");

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
    (fetchMoviesCount as jest.Mock).mockResolvedValue(3);

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

    expect(MoviesFilters).toHaveBeenCalledWith(
      expect.objectContaining({ genres: mockGenres }),
      undefined
    );
    expect(MoviesList).toHaveBeenCalledWith(
      expect.objectContaining({ movies: mockMovies, totalCount: 3 }),
      undefined
    );
  });
});
