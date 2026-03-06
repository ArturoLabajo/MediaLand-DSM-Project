import type { Rating } from "./Rating";

export interface RatingRepository {
  getByFilmId(filmId: string): Promise<Rating[]>;
  getUserRating(filmId: string, userId: string): Promise<Rating | null>;
  save(rating: Rating): Promise<void>;
}