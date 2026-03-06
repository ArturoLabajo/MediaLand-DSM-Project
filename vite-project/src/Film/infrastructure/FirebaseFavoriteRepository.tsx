import type { Favorite } from "../domain/Favorite";
import type { FavoriteRepository } from "../domain/FavortieRepository";

export default class FirebaseFavoriteRepository implements FavoriteRepository {
  async getByUserId(userId: string): Promise<Favorite[]> {
    throw new Error("Método getByUserId no implementado todavía");
  }

  async isFavorite(filmId: string, userId: string): Promise<boolean> {
    throw new Error("Método isFavorite no implementado todavía");
  }

  async save(favorite: Favorite): Promise<void> {
    throw new Error("Método save no implementado todavía");
  }

  async remove(filmId: string, userId: string): Promise<void> {
    throw new Error("Método remove no implementado todavía");
  }
}