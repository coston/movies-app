"use client";

import { useState } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

interface MoviePosterProps {
  posterUrl?: string;
  title: string;
}

function MoviePoster({ posterUrl, title }: MoviePosterProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  return (
    <div className="relative w-full h-full">
      <Skeleton className="absolute inset-0 w-full h-full" />
      <Image
        // some image urls are invalid, so we handle that
        src={posterUrl && !isError ? posterUrl : "/placeholder.svg"}
        alt={`${title} poster`}
        fill
        sizes="(100vw)"
        className={`object-cover transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsError(true);
          setIsLoading(false);
        }}
      />
    </div>
  );
}

export default MoviePoster;
