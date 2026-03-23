import axios, { type AxiosResponse } from "axios";
import type { CommentRepository } from "../domain/CommentRepository";
import type { Comment } from "../domain/Comment";

// URL Firebase
const BASE_URL =
  "https://medialand-ra-default-rtdb.europe-west1.firebasedatabase.app";

  // tipo de como se almacenan los comentarios en firebase
type FirebaseComment = {
  filmId: string;
  userId: string;
  userName: string;
  perfil: string;
  text: string;
};

// implementacion del repositorio de comentarios utilizando Firebase
const FirebaseCommentRepository: CommentRepository = {
  // obtenemos todos los comentario s de una pelicula
  getByFilmId: async (filmId: string): Promise<Comment[]> => {
    const response: AxiosResponse<Record<string, FirebaseComment | null> | null> =
      await axios.get(`${BASE_URL}/comments.json`);

    const comments: Comment[] = [];

    // si no hay datos devolvemos vacio
    if (!response.data) return comments;

    // recorremos todos los comentarios almacenados
    for (const key in response.data) {
      const comment = response.data[key];

      if (!comment) continue;

      // filtrado por pelicula
      if (comment.filmId === filmId) {
        comments.push({
          id: key, // usamos la key como id
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

  // se guarda comentario en Firebase
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
        // Firebase requiere el token para escribir
        params: { auth: idToken }
      }
    );
  }
};

export default FirebaseCommentRepository;