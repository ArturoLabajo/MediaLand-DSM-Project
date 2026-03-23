import type { Rating } from "./Rating";

// operaciones para gestionar valoraciones
export interface RatingRepository {
  getByFilmId(filmId: string): Promise<Rating[]>; // obtener valoraciones asociadas a una peli
  getUserRating(filmId: string, userId: string): Promise<Rating | null>; // obtiene valoraciones de un usuario sobre una peli
  save(rating: Rating, idToken?: string): Promise<void>; // guarda valoracion en el sistema
  update(ratingId: string, rating: Rating, idToken?: string): Promise<void>; // actualiza una valoracion existente
}