import LocalFilmRepository from "./LocalFilmRespository";
//import FirebaseFilmRepository from "./FirebaseFilmRepository"; Para mas adelante
import FirebaseRatingRepository from "./FirebaseRatingRepository";
import FirebaseCommentRepository from "./FirebaseCommentRepository";
import FirebaseFavoriteRepository from "./FirebaseFavoriteRepository";

// De momento usamos el local para films
const filmRepository = new LocalFilmRepository();

// Luego lo cambiaremos
// const filmRepository = new FirebaseFilmRepository();

const ratingRepository = new FirebaseRatingRepository();
const commentRepository = new FirebaseCommentRepository();
const favoriteRepository = new FirebaseFavoriteRepository();

export {
  filmRepository,
  ratingRepository,
  commentRepository,
  favoriteRepository,
};