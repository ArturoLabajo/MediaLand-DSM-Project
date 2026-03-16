import type { Comment } from "../domain/Comment";
import type { CommentRepository } from "../domain/CommentRepository";

const commentService = (repository: CommentRepository) => {
  return {
    getByFilmId: (filmId: string) => repository.getByFilmId(filmId),
    save: (comment: Comment, idToken: string) =>
      repository.save(comment, idToken)
  };
};

export default commentService;