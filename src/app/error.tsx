"use client";

import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="container mx-auto py-8 px-4 md:px-8 max-w-7xl">
      <h2 className="text-red-500 text-xl font-semibold">
        Oops, something went wrong.
      </h2>
      <p className="text-gray-500">
        {error.message || "An unexpected error occurred."}
      </p>
      <Button onClick={() => reset()} className="mt-4">
        Try Again
      </Button>
    </div>
  );
}
