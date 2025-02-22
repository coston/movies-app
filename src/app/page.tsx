import MoviesFilters from "@/components/movies/MoviesFilters";
import MoviesList from "@/components/movies/MoviesList";
import { fetchGenres, fetchMovies } from "@/lib/api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Movies List - Movies App",
  description: "A list of movies with filters and pagination.",
};

export default async function MoviesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const sp = await searchParams;
  const page = Number(sp.page) || 1;
  const limit = Number(sp.limit) || 25;
  const search = sp.search || "";
  const genre = sp.genre || "";

  const movies = await fetchMovies({ page, limit, search, genre });
  const genres = await fetchGenres();

  return (
    <div className="container mx-auto py-8 px-4 md:px-8 lg:px-16 xl:px-24 max-w-7xl">
      <MoviesFilters genres={genres} />
      <MoviesList movies={movies} />
    </div>
  );
}
