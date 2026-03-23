import type { Film } from "./Film";

// Operaciones para realizar sobre peliculas
export interface FilmRepository {
  getAll(): Promise<Film[]>; // obtener todo el contenido del catalogo
  getById(id: string): Promise<Film | null>; // obtener pelicula por id
  updateRatingAverage(
    id: string,
    ratingAverage: number,
    idToken?: string
  ): Promise<void>; // actualiza la valoracion media 
}