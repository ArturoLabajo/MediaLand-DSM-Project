import type { FavoriteRepository } from "../domain/FavortieRepository";

// servicio de favoritos
const favoriteService = (repository: FavoriteRepository) => {
  return {
    // obtiene favoritos de un usuario
    getFavoritesByUser: (userId: string, idToken: string) =>
      repository.getFavoritesByUser(userId, idToken),

    // comprueba si una peli esta en favortios
    isFavorite: (filmId: string, userId: string, idToken: string) =>
      repository.isFavorite(filmId, userId, idToken),

    // añade una pelicula a favoritos
    addFavorite: (filmId: string, userId: string, idToken: string) =>
      repository.addFavorite(filmId, userId, idToken),

    // elimina una película de favoritos
    removeFavorite: (filmId: string, userId: string, idToken: string) =>
      repository.removeFavorite(filmId, userId, idToken)
  };
};

export default favoriteService;