import type { Rating } from "../domain/Rating";
import type { RatingRepository } from "../domain/RatingRepository";

const ratingService = (repository: RatingRepository) => {
    return {
        getByFilmId: (filmId: string) => repository.getByFilmId(filmId),
        getUserRating: (filmId: string, userId: string) => repository.getUserRating(filmId, userId),
        save: (rating: Rating) => repository.save(rating)
    }
}

export default ratingService