import axios, { type AxiosResponse } from "axios";
import type { CommentRepository } from "../domain/CommentRepository";
import type { Comment } from "../domain/Comment";

const BASE_URL =
  "https://medialand-ra-default-rtdb.europe-west1.firebasedatabase.app";

type FirebaseComment = {
  filmId: string;
  userId: string;
  userName: string;
  perfil: string;
  text: string;
};

const FirebaseCommentRepository: CommentRepository = {
  getByFilmId: async (filmId: string): Promise<Comment[]> => {
    const response: AxiosResponse<Record<string, FirebaseComment | null> | null> =
      await axios.get(`${BASE_URL}/comments.json`);

    const comments: Comment[] = [];

    if (!response.data) return comments;

    for (const key in response.data) {
      const comment = response.data[key];

      if (!comment) continue;

      if (comment.filmId === filmId) {
        comments.push({
          id: key,
          filmId: comment.filmId,
          userId: comment.userId,
          userName: comment.userName,
          perfil: comment.perfil || "/user1.jpg",
          text: comment.text
        });
      }
    }

    return comments;
  },

  save: async (comment: Comment, idToken: string): Promise<void> => {
    await axios.post(
      `${BASE_URL}/comments.json`,
      {
        filmId: comment.filmId,
        userId: comment.userId,
        userName: comment.userName,
        perfil: comment.perfil,
        text: comment.text
      },
      {
        params: { auth: idToken }
      }
    );
  }
};

export default FirebaseCommentRepository;