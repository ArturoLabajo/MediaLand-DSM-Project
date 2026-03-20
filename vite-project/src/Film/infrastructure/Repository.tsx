import FirebaseFilmRepository from "./FirebaseFilmRepository";
import FirebaseRatingRepository from "./FirebaseRatingRepository";
import FirebaseCommentRepository from "./FirebaseCommentRepository";
import FirebaseFavoriteRepository from "./FirebaseFavoriteRepository";

import favoriteService from "../service/FavoriteService";
import commentService from "../service/CommentService";

export const filmRepository = FirebaseFilmRepository;
export const ratingRepository = FirebaseRatingRepository;
export const commentRepository = FirebaseCommentRepository;
export const favoriteRepository = FirebaseFavoriteRepository;

export const favoriteServiceInstance = favoriteService(favoriteRepository);
export const commentServiceInstance = commentService(commentRepository);