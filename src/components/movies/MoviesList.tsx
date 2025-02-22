"use client";

import { Card, CardContent } from "../ui/card";
import MovieSummaryCard from "./MovieSummaryCard";
import { MovieSummary } from "@/lib/types";
import useQueryParams from "@/hooks/useQueryParams";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Pagination from "./Pagination";

interface MoviesListProps {
  movies: { data: MovieSummary[]; totalPages: number };
  totalCount: number;
}

export default function MoviesList({ movies, totalCount }: MoviesListProps) {
  const { searchParams } = useQueryParams();
  const router = useRouter();

  if (!movies?.data?.length) {
    return <p>No movies found.</p>;
  }
  const currentPage = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || movies.data.length;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Showing {movies.data.length > 0 ? (currentPage - 1) * limit + 1 : 0}
            -{Math.min(currentPage * limit, totalCount)} of {totalCount} results
          </p>
        </div>
        <div className="grid gap-6  xs:grid-cols-1 sm:grid-cols-3 md:grid-cols-5">
          {movies.data.map((movie) => (
            <Link
              key={movie.id}
              href={`/${movie.id}`}
              onMouseEnter={() => router.prefetch(`/${movie.id}`)}
            >
              <MovieSummaryCard movie={movie} />
            </Link>
          ))}
        </div>
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={movies.totalPages}
          />
        </div>
      </CardContent>
    </Card>
  );
}
