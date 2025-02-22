import { render, screen } from "@testing-library/react";
import MovieSummaryCard from "./MovieSummaryCard";
import { MovieSummary } from "@/lib/types";

const mockMovie: MovieSummary = {
  id: 1,
  title: "Inception",
  posterUrl: "https://example.com/inception.jpg",
  rating: "PG-13",
};

describe("MovieSummaryCard", () => {
  it("renders movie title", () => {
    render(<MovieSummaryCard movie={mockMovie} />);
    const titleElement = screen.getByText(/Inception/i);
    expect(titleElement).toBeInTheDocument();
  });

  it("renders movie poster", () => {
    render(<MovieSummaryCard movie={mockMovie} />);
    const posterElement = screen.getByAltText(/Inception/i);
    expect(posterElement).toBeInTheDocument();
    expect(posterElement).toHaveAttribute("src", expect.any(String));
  });

  it("renders movie rating", () => {
    render(<MovieSummaryCard movie={mockMovie} />);
    const ratingElement = screen.getByText(/PG-13/i);
    expect(ratingElement).toBeInTheDocument();
  });

  it("does not render rating badge if rating is not provided", () => {
    const movieWithoutRating = { ...mockMovie, rating: undefined };
    render(<MovieSummaryCard movie={movieWithoutRating} />);
    const ratingElement = screen.queryByText(/PG-13/i);
    expect(ratingElement).not.toBeInTheDocument();
  });
});
