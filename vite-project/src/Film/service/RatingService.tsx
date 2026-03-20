import type { Rating } from "../domain/Rating";
import type { RatingRepository } from "../domain/RatingRepository";

const ratingService = (repository: RatingRepository) => {
  return {
    getByFilmId: (filmId: string) => repository.getByFilmId(filmId),

    getUserRating: (filmId: string, userId: string) =>
      repository.getUserRating(filmId, userId),

    save: (rating: Rating, idToken: string) =>
      repository.save(rating, idToken),

    update: (ratingId: string, rating: Rating, idToken: string) =>
      repository.update(ratingId, rating, idToken),

    getAverageByFilmId: async (filmId: string) => {
      const ratings = await repository.getByFilmId(filmId);

      if (ratings.length === 0) return 0;

      const total = ratings.reduce((sum, rating) => sum + rating.value, 0);
      return total / ratings.length;
    }
  };
};

export default ratingService;