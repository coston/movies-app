import React from "react";
import { render, screen } from "@testing-library/react";
import MovieById from "./page";
import { fetchMovieById } from "@/lib/api";
import MovieDetails from "@/components/movies/MovieDetailsCard";

jest.mock("@/lib/api", () => ({
  fetchMovieById: jest.fn(),
}));

jest.mock("next/link", () => {
  return jest.fn(({ children }) => children);
});
jest.mock("@/components/movies/MovieDetailsCard", () => {
  return jest.fn((props) => (
    <div data-testid="movie-details" {...props}>
      Mocked MovieDetails
    </div>
  ));
});

describe("MovieById", () => {
  const mockMovie = {
    id: "1",
    title: "Test Movie",
    posterUrl: "http://example.com/poster.jpg",
    rating: "PG-13",
    ratingValue: 7.5,
    duration: "2h 30min",
    datePublished: "2023-01-01",
    summary: "A test movie summary",
    genres: [{ id: "1", title: "Action" }],
    directors: ["Test Director"],
    writers: ["Test Writer"],
    mainActors: ["Test Actor"],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders movie details when movie is found", async () => {
    (fetchMovieById as jest.Mock).mockResolvedValue(mockMovie);

    render(
      await (async () =>
        await MovieById({ params: Promise.resolve({ id: "1" }) }))()
    );

    expect(fetchMovieById).toHaveBeenCalledWith("1");
    expect(screen.getByText("Back to Movies")).toBeInTheDocument();
    expect(screen.getByTestId("movie-details")).toBeInTheDocument();
  });

  it('renders "Movie not found" when movie is not found', async () => {
    (fetchMovieById as jest.Mock).mockResolvedValue(null);

    render(
      await (async () =>
        await MovieById({ params: Promise.resolve({ id: "1" }) }))()
    );
    expect(fetchMovieById).toHaveBeenCalledWith("1");
    expect(screen.getByText("Movie not found")).toBeInTheDocument();
    expect(screen.queryByTestId("movie-details")).not.toBeInTheDocument();
  });

  it("passes the correct movie prop to MovieDetails", async () => {
    (fetchMovieById as jest.Mock).mockResolvedValue(mockMovie);

    render(
      await (async () =>
        await MovieById({ params: Promise.resolve({ id: "1" }) }))()
    );
    expect(MovieDetails).toHaveBeenCalledWith(
      expect.objectContaining({ movie: mockMovie }),
      undefined
    );
  });
});
