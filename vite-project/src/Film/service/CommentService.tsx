import type { Comment } from "../domain/Comment";
import type { CommentRepository } from "../domain/CommentRepository";

// Servicio de comentarios 
const commentService = (repository: CommentRepository) => {
  return {
    getByFilmId: (filmId: string) => repository.getByFilmId(filmId), // obtiene comentarios asociados a una peli
    save: (comment: Comment, idToken: string) =>
      repository.save(comment, idToken) // guarda un nuevo comentario
  };
};

export default commentService;