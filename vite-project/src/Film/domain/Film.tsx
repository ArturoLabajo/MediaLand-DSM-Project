export type FilmType = "MOVIE" | "SERIE";

export interface Film {
  id: string;
  title: string;
  releaseDate: string;
  director: string;
  synopsis: string;
  ratingAverage: number;
  type: FilmType;
  category: string;
  image: string;
}