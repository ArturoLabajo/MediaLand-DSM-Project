import type { Comment } from "./Comment";

export interface CommentRepository {
  getByFilmId(filmId: string): Promise<Comment[]>;
  save(comment: Comment): Promise<void>;
}