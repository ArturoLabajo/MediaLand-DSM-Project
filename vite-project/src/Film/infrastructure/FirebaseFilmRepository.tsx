import axios, { type AxiosResponse } from "axios";
import type { Film } from "../domain/Film";
import type { FilmRepository } from "../domain/FilmRepository";
import type { FilmType } from "../domain/Film";

// URL Firebase
const BASE_URL =
  "https://medialand-ra-default-rtdb.europe-west1.firebasedatabase.app";

// tipo de almacenamiento en Firebase
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

// convierte tipos a como se definen en el dominio
const mapFilmType = (value: string): FilmType => {
  const normalized = value.toUpperCase();

  if (normalized === "MOVIE") return "MOVIE" as FilmType;
  if (normalized === "SERIE") return "SERIES" as FilmType;
  if (normalized === "SERIES") return "SERIES" as FilmType;

  // Si llega un valor inesperado usamos MOVIE por defecto
  return "MOVIE" as FilmType;
};

// Normalizamos los datos para que tengan formato correcto
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

// Implentacion en la base de datos con Firebase
const FirebaseFilmRepository: FilmRepository = {
  // obtiene las pelis almacenadas
  getAll: async (): Promise<Film[]> => {
    const response: AxiosResponse<Record<string, FirebaseFilm | null> | null> =
      await axios.get(`${BASE_URL}/films.json`);

    const films: Film[] = [];

    // si no hay datos en Firebase devolvemos vacio
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

  // obtiene una pelicula concreta a partir de su id
  getById: async (id: string): Promise<Film | null> => {
    const response: AxiosResponse<FirebaseFilm | null> =
      await axios.get(`${BASE_URL}/films/${id}.json`);

    if (!response.data) {
      return null;
    }

    return mapFirebaseFilmToDomain(id, response.data);
  },

  // actualiza la valozarion media de una pelicula
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