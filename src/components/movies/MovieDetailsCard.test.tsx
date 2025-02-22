import { render, screen } from "@testing-library/react";
import MovieDetailsCard from "./MovieDetailsCard";

const mockMovie = {
  id: "1",
  title: "Inception",
  posterUrl: "/inception.jpg",
  rating: "PG-13",
  ratingValue: 8.8,
  duration: "PT2H28M",
  datePublished: "2010-07-16",
  summary:
    "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
  genres: [
    { id: "1", title: "Action" },
    { id: "2", title: "Sci-Fi" },
  ],
  directors: ["Christopher Nolan"],
  writers: ["Doug Nolan"],
  mainActors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
};

describe("MovieDetailsCard", () => {
  it("renders movie details correctly", () => {
    render(<MovieDetailsCard movie={mockMovie} />);

    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByText("PG-13")).toBeInTheDocument();
    expect(screen.getByText("8.8/10")).toBeInTheDocument();
    expect(screen.getByText("2h 28m")).toBeInTheDocument();
    expect(screen.getByText("July 16, 2010")).toBeInTheDocument();
    expect(screen.getByText(mockMovie.summary)).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText("Sci-Fi")).toBeInTheDocument();
    expect(screen.getByText("Christopher Nolan")).toBeInTheDocument();
    expect(screen.getByText("Doug Nolan")).toBeInTheDocument();
    expect(
      screen.getByText("Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page")
    ).toBeInTheDocument();
  });

  it("renders movie poster correctly", () => {
    render(<MovieDetailsCard movie={mockMovie} />);
    const poster = screen.getByAltText("Inception poster");
    expect(poster).toBeInTheDocument();
    expect(poster).toHaveAttribute("src", expect.any(String));
  });
});
