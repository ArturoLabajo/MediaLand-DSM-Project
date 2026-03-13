import axios, { type AxiosResponse } from "axios";
import type { CommentRepository } from "../domain/CommentRepository";
import type { Comment } from "../domain/Comment";

const FirebaseCommentRepository: CommentRepository = {
    getByFilmId: async (filmId: string) => {
        const response: AxiosResponse = await axios.get(
            "https://medialand-ra-default-rtdb.europe-west1.firebasedatabase.app/comments.json"
        );

        let arrayComments: Comment[] = [];

        if (!response.data) {
            return arrayComments;
        }

        for (let key in response.data) {
            if (response.data[key].filmId == filmId) {
                arrayComments.push({
                    id: key,
                    filmId: response.data[key].filmId,
                    userId: response.data[key].userId,
                    userName: response.data[key].userName,
                    text: response.data[key].text
                });
            }
        }

        return arrayComments;
    },

    save: async (comment: Comment) => {
        await axios.post(
            "https://medialand-ra-default-rtdb.europe-west1.firebasedatabase.app/comments.json",
            {
                filmId: comment.filmId,
                userId: comment.userId,
                userName: comment.userName,
                text: comment.text
            }
        );
    }
};

export default FirebaseCommentRepository;