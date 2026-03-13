import axios, { type AxiosResponse } from "axios";
import type { RatingRepository } from "../domain/RatingRepository";
import type { Rating } from "../domain/Rating";

const FirebaseRatingRepository: RatingRepository = {
    getByFilmId: async (filmId: string) => {
        const response: AxiosResponse = await axios.get(
            "https://medialand-ra-default-rtdb.europe-west1.firebasedatabase.app/ratings.json"
        );

        let arrayRatings: Rating[] = [];

        if (!response.data) {
            return arrayRatings;
        }

        for (let key in response.data) {
            if (response.data[key].filmId == filmId) {
                arrayRatings.push({
                    filmId: response.data[key].filmId,
                    userId: response.data[key].userId,
                    value: response.data[key].value
                });
            }
        }

        return arrayRatings;
    },

    getUserRating: async (filmId: string, userId: string) => {
        const response: AxiosResponse = await axios.get(
            "https://medialand-ra-default-rtdb.europe-west1.firebasedatabase.app/ratings.json"
        );

        if (!response.data) {
            return null;
        }

        for (let key in response.data) {
            if (
                response.data[key].filmId == filmId &&
                response.data[key].userId == userId
            ) {
                const rating: Rating = {
                    filmId: response.data[key].filmId,
                    userId: response.data[key].userId,
                    value: response.data[key].value
                };

                return rating;
            }
        }

        return null;
    },

    save: async (rating: Rating) => {
        await axios.post(
            "https://medialand-ra-default-rtdb.europe-west1.firebasedatabase.app/ratings.json",
            {
                filmId: rating.filmId,
                userId: rating.userId,
                value: rating.value
            }
        );
    }
};

export default FirebaseRatingRepository;