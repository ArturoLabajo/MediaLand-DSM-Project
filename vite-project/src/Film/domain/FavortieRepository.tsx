import type { Favorite } from "./Favorite";

export interface FavoriteRepository {
  getFavoritesByUser(userId: number, idToken: string): Promise<Favorite[]>;
  isFavorite(filmId: number, userId: string, idToken: string): Promise<boolean>;
  addFavorite(userId: string, filmId: string, idToken: string): Promise<void>;
  removeFavorite(userId: string, filmId: string, idToken: string): Promise<void>;
}