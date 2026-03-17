import type { Film } from "./Film";

export interface FilmRepository {
  getAll(): Promise<Film[]>;
  getById(id: string): Promise<Film | null>;
  updateRatingAverage(
    id: string,
    ratingAverage: number,
    idToken?: string
  ): Promise<void>;
}