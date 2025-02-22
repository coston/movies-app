import { render, screen, fireEvent } from "@testing-library/react";
import MoviesList from "./MoviesList";
import { MovieSummary } from "@/lib/types";
import { useRouter } from "next/navigation";
import useQueryParams from "@/hooks/useQueryParams";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/hooks/useQueryParams", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockMovies: { data: MovieSummary[]; totalPages: number } = {
  data: [
    { id: 1, title: "Movie 1", posterUrl: "https://c.co/1", rating: "PG-13" },
    { id: 2, title: "Movie 2", posterUrl: "https://c.co/2", rating: "PG-13" },
  ],
  totalPages: 2,
};

describe("MoviesList", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      prefetch: jest.fn(),
    });
    (useQueryParams as jest.Mock).mockReturnValue({
      searchParams: new URLSearchParams("page=1"),
      updateParams: jest.fn(),
    });
  });

  it("renders 'No movies found.' when there are no movies", () => {
    render(<MoviesList movies={{ data: [], totalPages: 0 }} totalCount={0} />);
    expect(screen.getByText("No movies found.")).toBeInTheDocument();
  });

  it("renders the list of movies", () => {
    render(<MoviesList movies={mockMovies} totalCount={0} />);
    expect(screen.getByText("Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Movie 2")).toBeInTheDocument();
  });

  it("calls router.prefetch on mouse enter of a movie link", () => {
    const { getByText } = render(
      <MoviesList movies={mockMovies} totalCount={0} />
    );
    fireEvent.mouseEnter(getByText("Movie 1"));
    expect(useRouter().prefetch).toHaveBeenCalledWith("/1");
  });

  it("calls updateParams on page change", () => {
    const { getByText } = render(
      <MoviesList movies={mockMovies} totalCount={0} />
    );
    fireEvent.click(getByText("Next"));
    expect(useQueryParams().updateParams).toHaveBeenCalledWith({ page: 2 });
  });

  describe("MoviesList", () => {
    beforeEach(() => {
      (useRouter as jest.Mock).mockReturnValue({
        prefetch: jest.fn(),
      });
      (useQueryParams as jest.Mock).mockReturnValue({
        searchParams: new URLSearchParams("page=1"),
        updateParams: jest.fn(),
      });
    });

    it("renders 'No movies found.' when there are no movies", () => {
      render(
        <MoviesList movies={{ data: [], totalPages: 0 }} totalCount={0} />
      );
      expect(screen.getByText("No movies found.")).toBeInTheDocument();
    });

    it("renders the list of movies", () => {
      render(<MoviesList movies={mockMovies} totalCount={2} />);
      expect(screen.getByText("Movie 1")).toBeInTheDocument();
      expect(screen.getByText("Movie 2")).toBeInTheDocument();
    });

    it("calls router.prefetch on mouse enter of a movie link", () => {
      const { getByText } = render(
        <MoviesList movies={mockMovies} totalCount={2} />
      );
      fireEvent.mouseEnter(getByText("Movie 1"));
      expect(useRouter().prefetch).toHaveBeenCalledWith("/1");
    });

    it("calls updateParams on page change", () => {
      const { getByText } = render(
        <MoviesList movies={mockMovies} totalCount={2} />
      );
      fireEvent.click(getByText("Next"));
      expect(useQueryParams().updateParams).toHaveBeenCalledWith({ page: 2 });
    });

    it("displays the correct range of results", () => {
      render(<MoviesList movies={mockMovies} totalCount={50} />);
      expect(screen.getByText("Showing 1-2 of 50 results")).toBeInTheDocument();
    });
  });
});
