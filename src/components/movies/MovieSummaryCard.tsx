import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MoviePoster from "./MoviePoster";
import { MovieSummary } from "@/lib/types";

export default function MovieSummaryCard({ movie }: { movie: MovieSummary }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[2/3] w-full">
        <MoviePoster posterUrl={movie.posterUrl} title={movie.title} />
      </div>
      <CardContent className="p-2">
        <div className="flex items-start justify-between gap-2">
          <h2 className="font-semibold text-sm line-clamp-2 flex-grow">
            {movie.title}
          </h2>
          {movie.rating && (
            <Badge variant="secondary" className="text-xs whitespace-nowrap">
              {movie.rating}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
