export type MovieSummary = {
  id: number;
  title: string;
  posterUrl?: string;
  rating?: string;
};

type Genre = {
  id: string;
  title: string;
};

export type MovieDetails = {
  id: string;
  title: string;
  posterUrl: string;
  rating: string;
  ratingValue: number;
  duration: string;
  datePublished: string;
  summary: string;
  genres: Genre[];
  directors: string[];
  writers: string[];
  mainActors: string[];
};
