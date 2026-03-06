import type { Film } from "./Film";

export interface FilmRepository {
  getAll(): Promise<Film[]>;
  getById(id: string): Promise<Film | null>;
}
// Sacamos catalogo e id por ficha