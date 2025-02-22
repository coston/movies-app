import { MovieSummary } from "@/lib/types";

const API_BASE_URL = process.env.API_BASE_URL;

interface MoviesResponse {
  data: MovieSummary[];
  totalPages: number;
}

async function getToken(): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/token`, {
      next: { revalidate: 10800 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch auth token: ${response.statusText}`);
    }

    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error("Error fetching auth token:", error);
    throw new Error("Failed to fetch auth token");
  }
}

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  try {
    const token = await getToken();
    const response = await fetch(url, {
      ...options,
      next: { revalidate: 10800 },
      cache: "force-cache",
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    console.log({ response });

    if (!response.ok) {
      throw new Error(
        `Request failed with status ${response.status}: ${response.statusText}`
      );
    }

    return response;
  } catch (error) {
    console.error(`Error fetching URL ${url}:`, error);
    throw new Error(`Failed to fetch data from ${url}`);
  }
}

export async function fetchMovies(params: {
  page?: number;
  limit?: number;
  search?: string;
  genre?: string;
}): Promise<MoviesResponse> {
  const queryParams = new URLSearchParams({
    page: params.page?.toString() || "1",
    limit: params.limit?.toString() || "25",
    ...(params.search && { search: params.search }),
    ...(params.genre && { genre: params.genre }),
  });

  try {
    const response = await fetchWithAuth(
      `${API_BASE_URL}/movies?${queryParams.toString()}`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw new Error("Failed to fetch movies");
  }
}

export async function fetchMovieById(id: string) {
  try {
    const response = await fetchWithAuth(`${API_BASE_URL}/movies/${id}`);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching movie with id ${id}:`, error);
    throw new Error(`Failed to fetch movie with id ${id}`);
  }
}

export async function fetchGenres() {
  const query = `
query GetGenres {
  genres {
    nodes {
      title
    }
  }
}
`;

  try {
    const response = await fetchWithAuth(`${API_BASE_URL}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const { data } = await response.json();
    return data?.genres?.nodes?.map(
      (genre: { title: string; id: string }) => genre
    );
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw new Error("Failed to fetch genres");
  }
}
