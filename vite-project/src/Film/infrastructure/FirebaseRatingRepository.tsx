import type { Rating } from "../domain/Rating";
import type { RatingRepository } from "../domain/RatingRepository";

export default class FirebaseRatingRepository implements RatingRepository {
  async getByFilmId(filmId: string): Promise<Rating[]> {
    throw new Error("Método getByFilmId no implementado todavía");
  }

  async getUserRating(filmId: string, userId: string): Promise<Rating | null> {
    throw new Error("Método getUserRating no implementado todavía");
  }

  async save(rating: Rating): Promise<void> {
    throw new Error("Método save no implementado todavía");
  }
}