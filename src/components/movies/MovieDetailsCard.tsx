import { Card, CardContent } from "@/components/ui/card";
import { Star, Clock } from "lucide-react";
import MoviePoster from "./MoviePoster";
import { MovieDetails as Movie } from "@/lib/types";

export default function MovieDetailsCard({ movie }: { movie: Movie }) {
  const duration = movie.duration
    .replace("PT", "")
    .replace("H", "h ")
    .replace("M", "m")
    .toLowerCase();

  const releaseDate = new Date(movie.datePublished).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    }
  );

  return (
    <Card>
      <CardContent className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3">
            <div className="relative aspect-[2/3] w-full">
              <MoviePoster posterUrl={movie.posterUrl} title={movie.title} />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="text-4xl font-bold">{movie.title}</h1>
              <Card className="px-2 text-lg">{movie.rating}</Card>
            </div>

            <div className="flex items-center gap-6 text-muted-foreground mb-6">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-primary stroke-primary" />
                <span>{movie.ratingValue.toFixed(1)}/10</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-5 h-5" />
                <span>{duration}</span>
              </div>
              <span>{releaseDate}</span>
            </div>

            <p className="text-lg mb-6">{movie.summary}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres.map((genre) => (
                <Card className="px-4 py-2" key={genre.id}>
                  {genre.title}
                </Card>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <h2 className="font-semibold mb-2">Directors</h2>
                <p className="text-muted-foreground">
                  {movie.directors?.join(", ")}
                </p>
              </div>

              <div>
                <h2 className="font-semibold mb-2">Writers</h2>
                <p className="text-muted-foreground">
                  {movie.writers?.join(", ")}
                </p>
              </div>

              <div>
                <h2 className="font-semibold mb-2">Main Cast</h2>
                <p className="text-muted-foreground">
                  {movie.mainActors?.join(", ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
