import FirebaseFilmRepository from "./FirebaseFilmRepository";
import FirebaseRatingRepository from "./FirebaseRatingRepository";
import FirebaseCommentRepository from "./FirebaseCommentRepository";
import FirebaseFavoriteRepository from "./FirebaseFavoriteRepository";

const filmRepository = FirebaseFilmRepository;
const ratingRepository = FirebaseRatingRepository;
const commentRepository = FirebaseCommentRepository;
const favoriteRepository = FirebaseFavoriteRepository;

export {
    filmRepository,
    ratingRepository,
    commentRepository,
    favoriteRepository
};