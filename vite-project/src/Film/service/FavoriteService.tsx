import FirebaseFavoriteRepository from "../infrastructure/FirebaseFavoriteRepository";

const FavoriteService = {
  addFavorite: (userId: string, filmId: string, idToken: string) => {
    return FirebaseFavoriteRepository.addFavorite(userId, filmId, idToken);
  },

  removeFavorite: (userId: string, filmId: string, idToken: string) => {
    return FirebaseFavoriteRepository.removeFavorite(userId, filmId, idToken);
  },

  isFavorite: (filmId: string, userId: string, idToken: string) => {
    return FirebaseFavoriteRepository.isFavorite(filmId, userId, idToken);
  },

  getFavoritesByUser: (userId: string, idToken: string) => {
    return FirebaseFavoriteRepository.getFavoritesByUser(userId, idToken);
  }
};

export default FavoriteService;