import axios, { type AxiosResponse } from "axios";
import type { FavoriteRepository } from "../domain/FavortieRepository";
import type { Favorite } from "../domain/Favorite";

const FirebaseFavoriteRepository: FavoriteRepository = {
    getByUserId: async (userId: string) => {
        const response: AxiosResponse = await axios.get(
            "https://medialand-ra-default-rtdb.europe-west1.firebasedatabase.app/favorites.json"
        );

        let arrayFavorites: Favorite[] = [];

        if (!response.data) {
            return arrayFavorites;
        }

        for (let key in response.data) {
            if (response.data[key].userId == userId) {
                arrayFavorites.push({
                    filmId: response.data[key].filmId,
                    userId: response.data[key].userId
                });
            }
        }

        return arrayFavorites;
    },

    isFavorite: async (filmId: string, userId: string) => {
        const response: AxiosResponse = await axios.get(
            "https://medialand-ra-default-rtdb.europe-west1.firebasedatabase.app/favorites.json"
        );

        if (!response.data) {
            return false;
        }

        for (let key in response.data) {
            if (
                response.data[key].filmId == filmId &&
                response.data[key].userId == userId
            ) {
                return true;
            }
        }

        return false;
    },

    save: async (favorite: Favorite) => {
        await axios.post(
            "https://medialand-ra-default-rtdb.europe-west1.firebasedatabase.app/favorites.json",
            {
                filmId: favorite.filmId,
                userId: favorite.userId
            }
        );
    },

    remove: async (filmId: string, userId: string) => {
        const response: AxiosResponse = await axios.get(
            "https://medialand-ra-default-rtdb.europe-west1.firebasedatabase.app/favorites.json"
        );

        if (!response.data) {
            return;
        }

        for (let key in response.data) {
            if (
                response.data[key].filmId == filmId &&
                response.data[key].userId == userId
            ) {
                await axios.delete(
                    "https://medialand-ra-default-rtdb.europe-west1.firebasedatabase.app/favorites/" + key + ".json"
                );
                return;
            }
        }
    }
};

export default FirebaseFavoriteRepository;