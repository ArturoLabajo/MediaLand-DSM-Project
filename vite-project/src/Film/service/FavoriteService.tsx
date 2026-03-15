import FirebaseFavoriteRepository from "../infrastructure/FirebaseFavoriteRepository";

const FavoriteService = {
    addFavorite: async (userId: string, filmId: string, idToken: string) => {
        return await FirebaseFavoriteRepository.addFavorite(userId, filmId, idToken);
    },

    removeFavorite: async (userId: string, filmId: string, idToken: string) => {
        return await FirebaseFavoriteRepository.removeFavorite(userId, filmId, idToken);
    },

    isFavorite: async (filmId: string, userId: string, idToken: string) => {
        return await FirebaseFavoriteRepository.isFavorite(filmId, userId, idToken);
    },

    getFavoritesByUser: async (userId: string, idToken: string) => {
        return await FirebaseFavoriteRepository.getFavoritesByUser(userId, idToken);
    }
};

export default FavoriteService;