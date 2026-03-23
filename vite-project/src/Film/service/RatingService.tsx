import type { Rating } from "../domain/Rating";
import type { RatingRepository } from "../domain/RatingRepository";

// servicio de valoracion
const ratingService = (repository: RatingRepository) => {
  return {
    // obtiene las valoraciones de una pelicula
    getByFilmId: (filmId: string) => repository.getByFilmId(filmId),

    // obtiene la valoracion de un usuario para una pelicula
    getUserRating: (filmId: string, userId: string) =>
      repository.getUserRating(filmId, userId),

    // guarda una nueva valoracio
    save: (rating: Rating, idToken: string) =>
      repository.save(rating, idToken),

    // actualiza una valoracion existente
    update: (ratingId: string, rating: Rating, idToken: string) =>
      repository.update(ratingId, rating, idToken),

    // calcula la valoracion media de una pelicula
    getAverageByFilmId: async (filmId: string) => {
      const ratings = await repository.getByFilmId(filmId);

      // si no hay valoraciones la media es 0
      if (ratings.length === 0) return 0;

      // suma total de todas las valoraciones
      const total = ratings.reduce((sum, rating) => sum + rating.value, 0);
      
      // media = suma / n de valoraciones
      return total / ratings.length;
    }
  };
};

export default ratingService;