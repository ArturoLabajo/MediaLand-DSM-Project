import FirebaseFilmRepository from "./FirebaseFilmRepository";
import FirebaseRatingRepository from "./FirebaseRatingRepository";
import FirebaseCommentRepository from "./FirebaseCommentRepository";
import FirebaseFavoriteRepository from "./FirebaseFavoriteRepository";

import favoriteService from "../service/FavoriteService";
import commentService from "../service/CommentService";
import ratingService from "../service/RatingService";


export const filmRepository = FirebaseFilmRepository;
export const ratingRepository = FirebaseRatingRepository;
export const commentRepository = FirebaseCommentRepository;
export const favoriteRepository = FirebaseFavoriteRepository;

export const favoriteServiceInstance = favoriteService(favoriteRepository);
export const commentServiceInstance = commentService(commentRepository);
export const ratingServiceInstance = ratingService(ratingRepository);