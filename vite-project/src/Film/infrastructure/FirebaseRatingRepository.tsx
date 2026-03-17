import axios from "axios";
import type { Rating } from "../domain/Rating";
import type { RatingRepository } from "../domain/RatingRepository";

const BASE_URL =
  "https://medialand-ra-default-rtdb.europe-west1.firebasedatabase.app";

const FirebaseRatingRepository: RatingRepository = {
  getByFilmId: async (filmId: string): Promise<Rating[]> => {
    const response = await axios.get(`${BASE_URL}/ratings.json`);
    const data = response.data;

    if (!data) return [];

    return Object.entries(data)
      .map(([key, value]: [string, any]) => ({
        ratingId: key,
        filmId: String(value.filmId),
        userId: String(value.userId),
        value: Number(value.value),
      }))
      .filter((rating) => rating.filmId === filmId);
  },

  getUserRating: async (
    filmId: string,
    userId: string
  ): Promise<Rating | null> => {
    const response = await axios.get(`${BASE_URL}/ratings.json`);
    const data = response.data;

    if (!data) return null;

    const ratings: Rating[] = Object.entries(data).map(
      ([key, value]: [string, any]) => ({
        ratingId: key,
        filmId: String(value.filmId),
        userId: String(value.userId),
        value: Number(value.value),
      })
    );

    const userRating = ratings.find(
      (rating) => rating.filmId === filmId && rating.userId === userId
    );

    return userRating || null;
  },

  save: async (rating: Rating, idToken?: string): Promise<void> => {
    const authParam = idToken ? `?auth=${idToken}` : "";

    await axios.post(`${BASE_URL}/ratings.json${authParam}`, {
      filmId: rating.filmId,
      userId: rating.userId,
      value: rating.value,
    });
  },

  update: async (
    ratingId: string,
    rating: Rating,
    idToken?: string
  ): Promise<void> => {
    const authParam = idToken ? `?auth=${idToken}` : "";

    await axios.patch(`${BASE_URL}/ratings/${ratingId}.json${authParam}`, {
      filmId: rating.filmId,
      userId: rating.userId,
      value: rating.value,
    });
  },
};

export default FirebaseRatingRepository;