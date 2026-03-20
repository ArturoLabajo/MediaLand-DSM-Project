import type { FavoriteRepository } from "../domain/FavortieRepository";

const favoriteService = (repository: FavoriteRepository) => {
  return {
    getFavoritesByUser: (userId: string, idToken: string) =>
      repository.getFavoritesByUser(userId, idToken),

    isFavorite: (filmId: string, userId: string, idToken: string) =>
      repository.isFavorite(filmId, userId, idToken),

    addFavorite: (filmId: string, userId: string, idToken: string) =>
      repository.addFavorite(filmId, userId, idToken),

    removeFavorite: (filmId: string, userId: string, idToken: string) =>
      repository.removeFavorite(filmId, userId, idToken)
  };
};

export default favoriteService;