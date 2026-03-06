import type { Favorite } from "../domain/Favorite";
import type { FavoriteRepository } from "../domain/FavortieRepository";

const favoriteService = (repository: FavoriteRepository) => {
    return {
        getByUserId: (userId: string) => repository.getByUserId(userId),
        isFavorite: (filmId: string, userId: string) => repository.isFavorite(filmId, userId),
        save: (favorite: Favorite) => repository.save(favorite),
        remove: (filmId: string, userId: string) => repository.remove(filmId, userId)
    }
}

export default favoriteService