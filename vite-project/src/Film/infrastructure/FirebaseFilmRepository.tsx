import axios, { type AxiosResponse } from "axios";
import type { Film } from "../domain/Film";
import type { FilmRepository } from "../domain/FilmRepository";
import type { FilmType } from "../domain/Film";

const BASE_URL =
  "https://medialand-ra-default-rtdb.europe-west1.firebasedatabase.app";

type FirebaseFilm = {
  title: string;
  releaseDate: string | number;
  director: string;
  synopsis: string;
  ratingAverage: number;
  type: string;
  category: string;
  image: string | number;
};

const mapFilmType = (value: string): FilmType => {
  const normalized = value.toUpperCase();

  if (normalized === "MOVIE") return "MOVIE" as FilmType;
  if (normalized === "SERIE") return "SERIES" as FilmType;
  if (normalized === "SERIES") return "SERIES" as FilmType;

  return "MOVIE" as FilmType;
};

const mapFirebaseFilmToDomain = (id: string, film: FirebaseFilm): Film => {
  return {
    id,
    title: film.title,
    releaseDate: String(film.releaseDate),
    director: film.director,
    synopsis: film.synopsis,
    ratingAverage: Number(film.ratingAverage),
    type: mapFilmType(film.type),
    category: film.category,
    image: String(film.image),
  };
};

const FirebaseFilmRepository: FilmRepository = {
  getAll: async (): Promise<Film[]> => {
    const response: AxiosResponse<Record<string, FirebaseFilm | null> | null> =
      await axios.get(`${BASE_URL}/films.json`);

    const films: Film[] = [];

    if (!response.data) {
      return films;
    }

    for (const key in response.data) {
      const film = response.data[key];

      if (!film) continue;

      films.push(mapFirebaseFilmToDomain(key, film));
    }

    return films;
  },

  getById: async (id: string): Promise<Film | null> => {
    const response: AxiosResponse<FirebaseFilm | null> =
      await axios.get(`${BASE_URL}/films/${id}.json`);

    if (!response.data) {
      return null;
    }

    return mapFirebaseFilmToDomain(id, response.data);
  },
  updateRatingAverage: async (
    id: string,
    ratingAverage: number,
    idToken?: string
  ): Promise<void> => {
    const authParam = idToken ? `?auth=${idToken}` : "";

    await axios.patch(`${BASE_URL}/films/${id}.json${authParam}`, {
      ratingAverage
    });
  }
};

export default FirebaseFilmRepository;