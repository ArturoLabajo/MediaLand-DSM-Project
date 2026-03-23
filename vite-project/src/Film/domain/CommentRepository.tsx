import type { Comment } from "./Comment";

// Operacions que se pueden realizar
export interface CommentRepository {
  getByFilmId(filmId: string): Promise<Comment[]>; // Obtenemos comentarios asociados a una peli o serie
  save(comment: Comment, idToken: string): Promise<void>; // Guarda nuevos comentarios
}