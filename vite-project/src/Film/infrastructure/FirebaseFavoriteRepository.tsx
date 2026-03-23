import axios, { type AxiosResponse } from "axios";
import type { FavoriteRepository } from "../domain/FavortieRepository";
import type { Favorite } from "../domain/Favorite";

//URL del Firebase
const BASE_URL =
  "https://medialand-ra-default-rtdb.europe-west1.firebasedatabase.app";

  // tipo del almacenamiento en el Firebase
type FirebaseFavorite = {
  id: number;
  filmId: string;
  userId: string;
};

// implementacion del repositorio usando Firebase
const FirebaseFavoriteRepository: FavoriteRepository = {

  // obtenemos los favortios de un usuario
  getFavoritesByUser: async (
    userId: string,
    idToken: string
  ): Promise<Favorite[]> => {

    const response: AxiosResponse<Record<string, FirebaseFavorite | null> | null> =
      await axios.get(`${BASE_URL}/favorites.json`, {
        params: { auth: idToken }
      });

    const favorites: Favorite[] = [];

    // si no hay favoritos devolvemos vacio
    if (!response.data) return favorites;

    for (const key in response.data) {

      const favorite = response.data[key];

      if (!favorite) continue;

      // solo se añaden los favortios del usuario actual
      if (favorite.userId === userId) {
        favorites.push({
          id: favorite.id,
          filmId: favorite.filmId,
          userId: favorite.userId
        });
      }
    }

    return favorites;
  },

  // comprueba si una peli esta marcada como favorita
  isFavorite: async (
    filmId: string,
    userId: string,
    idToken: string
  ): Promise<boolean> => {

    const response: AxiosResponse<Record<string, FirebaseFavorite | null> | null> =
      await axios.get(`${BASE_URL}/favorites.json`, {
        params: { auth: idToken }
      });

    if (!response.data) return false;

    for (const key in response.data) {

      const favorite = response.data[key];

      if (!favorite) continue;

      if (favorite.filmId === filmId && favorite.userId === userId) {
        return true;
      }
    }

    return false;
  },

  // anadimos una nueva peli o serie a favortios
  addFavorite: async (
    userId: string,
    filmId: string,
    idToken: string
  ): Promise<Favorite> => {

    const counterResponse: AxiosResponse<number | null> =
      await axios.get(`${BASE_URL}/counters/favorites.json`, {
        params: { auth: idToken }
      });

    const currentCounter = counterResponse.data ?? 0;
    const newId = currentCounter + 1;

    const newFavorite: Favorite = {
      id: newId,
      filmId,
      userId
    };

    // guardamos el nuevo favorito
    await axios.put(
      `${BASE_URL}/favorites/${newId}.json`,
      newFavorite,
      { params: { auth: idToken } }
    );

    // actualiza el contador global 
    await axios.put(
      `${BASE_URL}/counters/favorites.json`,
      newId,
      { params: { auth: idToken } }
    );

    return newFavorite;
  },

  // elimina contenido de favortios de un usuario
  removeFavorite: async (
    userId: string,
    filmId: string,
    idToken: string
  ): Promise<void> => {

    const response: AxiosResponse<Record<string, FirebaseFavorite | null> | null> =
      await axios.get(`${BASE_URL}/favorites.json`, {
        params: { auth: idToken }
      });

    if (!response.data) return;

    for (const key in response.data) {

      const favorite = response.data[key];

      if (!favorite) continue;

      if (favorite.filmId === filmId && favorite.userId === userId) {

        await axios.delete(
          `${BASE_URL}/favorites/${key}.json`,
          { params: { auth: idToken } }
        );

        return;
      }
    }
  }
};

export default FirebaseFavoriteRepository;