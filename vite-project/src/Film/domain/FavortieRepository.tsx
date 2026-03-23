import type { Favorite } from "./Favorite";

// Operaciones para gestionar los favortios
export interface FavoriteRepository {
  getFavoritesByUser(userId: string, idToken: string): Promise<Favorite[]>; // Obtener favorito de un usuarios
  isFavorite(filmId: string, userId: string, idToken: string): Promise<boolean>; // Comprobar si pelicula es favorita
  addFavorite(userId: string, filmId: string, idToken: string): Promise<Favorite>; // Añadir a favoritos
  removeFavorite(userId: string, filmId: string, idToken: string): Promise<void>; // Eliminar de favoritos
}