import type { Comment } from "../domain/Comment";
import type { CommentRepository } from "../domain/CommentRepository";

export default class FirebaseCommentRepository implements CommentRepository {
  async getByFilmId(filmId: string): Promise<Comment[]> {
    throw new Error("Método getByFilmId no implementado todavía");
  }

  async save(comment: Comment): Promise<void> {
    throw new Error("Método save no implementado todavía");
  }
}