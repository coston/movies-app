import { render, screen, fireEvent } from "@testing-library/react";
import MoviesFilters from "./MoviesFilters";
import useQueryParams from "@/hooks/useQueryParams";

jest.mock("@/hooks/useQueryParams");

const mockUpdateParams = jest.fn();
const mockSearchParams = new URLSearchParams();

(useQueryParams as jest.Mock).mockReturnValue({
  updateParams: mockUpdateParams,
  searchParams: mockSearchParams,
});

describe("MoviesFilters", () => {
  const genres = [{ title: "Action" }, { title: "Comedy" }, { title: "Drama" }];

  beforeEach(() => {
    mockUpdateParams.mockClear();
    mockSearchParams.set("search", "");
    mockSearchParams.set("genre", "");
  });

  it("renders correctly", () => {
    render(<MoviesFilters genres={genres} />);
    expect(screen.getByPlaceholderText("Search movies...")).toBeInTheDocument();
    expect(screen.getByText("All Genres")).toBeInTheDocument();
    fireEvent.click(screen.getByText("All Genres"));
    genres.forEach((genre) => {
      expect(screen.getByText(genre.title)).toBeInTheDocument();
    });
  });

  it("updates search params on input change", () => {
    render(<MoviesFilters genres={genres} />);
    const input = screen.getByPlaceholderText("Search movies...");
    fireEvent.change(input, { target: { value: "Inception" } });
    expect(mockUpdateParams).toHaveBeenCalledWith({
      search: "Inception",
      page: 1,
    });
  });

  it("updates the genre to an empty string when 'all' is selected", () => {
    mockSearchParams.set("genre", "Action");
    render(<MoviesFilters genres={genres} />);

    const selectTrigger = screen.getByText("Action");
    fireEvent.click(selectTrigger);

    const genreOption = screen.getByText("All Genres");
    fireEvent.click(genreOption);

    expect(mockUpdateParams).toHaveBeenCalledWith({ genre: "", page: 1 });
  });

  it("updates genre params on select change", () => {
    render(<MoviesFilters genres={genres} />);
    const selectTrigger = screen.getByText("All Genres");
    fireEvent.click(selectTrigger);
    const genreOption = screen.getByText("Action");
    fireEvent.click(genreOption);
    expect(mockUpdateParams).toHaveBeenCalledWith({ genre: "Action", page: 1 });
  });
});
