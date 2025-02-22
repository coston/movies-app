import MovieDetailsCard from "@/components/movies/MovieDetailsCard";
import { Button } from "@/components/ui/button";
import { fetchMovieById } from "@/lib/api";
import { MovieDetails } from "@/lib/types";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const id = (await params).id;

  const movie: MovieDetails = await fetchMovieById(id);

  return {
    title: `${movie.title} - Movies App`,
    description: movie.summary,
  };
}

export default async function MovieById({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const movie: MovieDetails = await fetchMovieById(id);

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-8 max-w-6xl">
      <div className="mb-6">
        <Link href="/" passHref>
          <Button variant="outline" size="sm">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Movies
          </Button>
        </Link>
      </div>
      <MovieDetailsCard movie={movie} />
    </div>
  );
}
