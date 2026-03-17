import type { Rating } from "../domain/Rating";
import type { RatingRepository } from "../domain/RatingRepository";

const RatingService = (repository: RatingRepository) => {
  return {
    getByFilmId: (filmId: string) => repository.getByFilmId(filmId),

    getUserRating: (filmId: string, userId: string) =>
      repository.getUserRating(filmId, userId),

    save: (rating: Rating, idToken?: string) =>
      repository.save(rating, idToken),

    update: (ratingId: string, rating: Rating, idToken?: string) =>
      repository.update(ratingId, rating, idToken),

    getAverageByFilmId: async (filmId: string) => {
      const ratings = await repository.getByFilmId(filmId);

      if (ratings.length === 0) return 0;

      const sum = ratings.reduce((acc, rating) => acc + rating.value, 0);
      return sum / ratings.length;
    },
  };
};

export default RatingService;