import { fetchMovies, fetchMovieById, fetchGenres } from "./api";
import { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();

describe("API Client", () => {
  const API_BASE_URL = process.env.API_BASE_URL;

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe("getToken (through other functions)", () => {
    it("should fetch and use auth token", async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ token: "fake-token" }));
      fetchMock.mockResponseOnce(
        JSON.stringify({
          data: [],
          totalPages: 0,
        })
      );

      await fetchMovies({});

      expect(fetchMock.mock.calls[0][0]).toBe(`${API_BASE_URL}/auth/token`);
      expect(fetchMock.mock.calls[1][1]?.headers).toHaveProperty(
        "Authorization",
        "Bearer fake-token"
      );
    });

    it("should throw error when token fetch fails", async () => {
      jest.spyOn(console, "error").mockImplementation(() => {}); // Suppress console.error
      fetchMock.mockResponseOnce(JSON.stringify({}), { status: 401 });

      await expect(fetchMovies({})).rejects.toThrow("Failed to fetch movies");
    });
  });

  describe("fetchMovies", () => {
    beforeEach(() => {
      fetchMock.mockResponseOnce(JSON.stringify({ token: "fake-token" }));
    });

    it("should fetch movies with default parameters", async () => {
      const mockResponse = {
        data: [{ id: "1", title: "Test Movie" }],
        totalPages: 1,
      };
      fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

      const result = await fetchMovies({});

      expect(fetchMock.mock.calls[1][0]).toBe(
        `${API_BASE_URL}/movies?page=1&limit=25`
      );
      expect(result).toEqual(mockResponse);
    });

    it("should include search and genre parameters when provided", async () => {
      const mockResponse = {
        data: [],
        totalPages: 0,
      };
      fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

      await fetchMovies({
        search: "test",
        genre: "action",
        page: 2,
        limit: 10,
      });

      const url = new URL(("https://" + fetchMock.mock.calls[1][0]) as string);
      expect(url.searchParams.get("search")).toBe("test");
      expect(url.searchParams.get("genre")).toBe("action");
      expect(url.searchParams.get("page")).toBe("2");
      expect(url.searchParams.get("limit")).toBe("10");
    });

    it("should throw error when movies fetch fails", async () => {
      jest.spyOn(console, "error").mockImplementation(() => {}); // Suppress console.error
      fetchMock.mockResponseOnce(JSON.stringify({}), { status: 500 });

      await expect(fetchMovies({})).rejects.toThrow("Failed to fetch movies");
    });
  });

  describe("fetchMovieById", () => {
    beforeEach(() => {
      fetchMock.mockResponseOnce(JSON.stringify({ token: "fake-token" }));
    });

    it("should fetch a specific movie by id", async () => {
      const mockMovie = { id: "123", title: "Test Movie" };
      fetchMock.mockResponseOnce(JSON.stringify(mockMovie));

      const result = await fetchMovieById("123");

      expect(fetchMock.mock.calls[1][0]).toBe(`${API_BASE_URL}/movies/123`);
      expect(result).toEqual(mockMovie);
    });

    it("should throw error when movie fetch fails", async () => {
      jest.spyOn(console, "error").mockImplementation(() => {}); // Suppress console.error
      fetchMock.mockResponseOnce(JSON.stringify({}), { status: 404 });

      await expect(fetchMovieById("999")).rejects.toThrow(
        "Failed to fetch movie with id 999"
      );
    });
  });

  describe("fetchGenres", () => {
    beforeEach(() => {
      fetchMock.mockResponseOnce(JSON.stringify({ token: "fake-token" }));
    });

    it("should fetch genres using GraphQL", async () => {
      const mockGenres = {
        data: {
          genres: {
            nodes: [
              { title: "Action", id: "1" },
              { title: "Comedy", id: "2" },
            ],
          },
        },
      };
      fetchMock.mockResponseOnce(JSON.stringify(mockGenres));

      const result = await fetchGenres();

      expect(fetchMock.mock.calls[1][0]).toBe(`${API_BASE_URL}/graphql`);
      expect(fetchMock.mock.calls[1][1]?.method).toBe("POST");
      expect(fetchMock.mock.calls[1][1]?.headers).toHaveProperty(
        "Content-Type",
        "application/json"
      );
      expect(
        JSON.parse(fetchMock.mock.calls[1][1]?.body as string)
      ).toHaveProperty("query");
      expect(result).toEqual(mockGenres.data.genres.nodes);
    });

    it("should throw error when genres fetch fails", async () => {
      jest.spyOn(console, "error").mockImplementation(() => {}); // Suppress console.error
      fetchMock.mockResponseOnce(JSON.stringify({}), { status: 500 });

      await expect(fetchGenres()).rejects.toThrow("Failed to fetch genres");
    });
  });
});
