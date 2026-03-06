import type { Comment } from "../domain/Comment";
import type { CommentRepository } from "../domain/CommentRepository";

const commentService = (repository: CommentRepository) => {
    return {
        getByFilmId: (filmId: string) => repository.getByFilmId(filmId),
        save: (comment: Comment) => repository.save(comment)
    }
}

export default commentService