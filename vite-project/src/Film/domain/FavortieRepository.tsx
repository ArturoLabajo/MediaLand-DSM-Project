import type { Favorite } from "./Favorite";

export interface FavoriteRepository {
  getFavoritesByUser(userId: string, idToken: string): Promise<Favorite[]>;
  isFavorite(filmId: string, userId: string, idToken: string): Promise<boolean>;
  addFavorite(userId: string, filmId: string, idToken: string): Promise<Favorite>;
  removeFavorite(userId: string, filmId: string, idToken: string): Promise<void>;
}