import type { Film } from "../domain/Film";
import type { FilmRepository } from "../domain/FilmRepository";

export default class FirebaseFilmRepository implements FilmRepository {
  async getAll(): Promise<Film[]> {
    throw new Error("Método getAll no implementado todavía");
  }

  async getById(id: string): Promise<Film | null> {
    throw new Error("Método getById no implementado todavía");
  }
}