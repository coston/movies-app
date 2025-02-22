"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import useQueryParams from "@/hooks/useQueryParams";

interface MoviesFiltersProps {
  genres: { title: string }[];
}

export default function MoviesFilters({ genres }: MoviesFiltersProps) {
  const { updateParams, searchParams } = useQueryParams();

  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Movie Search</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            type="text"
            placeholder="Search movies..."
            defaultValue={searchParams.get("search") || ""}
            onChange={(e) => updateParams({ search: e.target.value, page: 1 })}
          />
          <Select
            value={searchParams.get("genre") || "all"}
            onValueChange={(genre) => {
              const updatedGenre = genre === "all" ? "" : genre;
              if (updatedGenre !== searchParams.get("genre")) {
                updateParams({ genre: updatedGenre, page: 1 });
              }
              updateParams({ genre: updatedGenre, page: 1 });
            }}
          >
            <SelectTrigger
              className="w-full sm:w-[180px]"
              tabIndex={0}
              aria-label="Select Genre"
            >
              <SelectValue placeholder="All Genres" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genres</SelectItem>
              {genres.map(({ title }) => (
                <SelectItem key={title} value={title}>
                  {title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
