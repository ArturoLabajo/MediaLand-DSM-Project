import type { Favorite } from "./Favorite";

export interface FavoriteRepository {
  getByUserId(userId: string): Promise<Favorite[]>;
  isFavorite(filmId: string, userId: string): Promise<boolean>;
  save(favorite: Favorite): Promise<void>;
  remove(filmId: string, userId: string): Promise<void>;
}