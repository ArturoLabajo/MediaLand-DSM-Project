import axios, { type AxiosResponse } from "axios";
import type { FilmRepository } from "../domain/FilmRepository";
import type { Film } from "../domain/Film";

const FirebaseFilmRepository: FilmRepository = {
    getAll: async () => {
        const response: AxiosResponse = await axios.get(
            "https://medialand-ra-default-rtdb.europe-west1.firebasedatabase.app/films.json"
        );

        let arrayFilms: Film[] = [];

        for (let key in response.data) {
            arrayFilms.push({
                id: key,
                title: response.data[key].title,
                releaseDate: response.data[key].releaseDate,
                director: response.data[key].director,
                synopsis: response.data[key].synopsis,
                ratingAverage: response.data[key].ratingAverage,
                type: response.data[key].type,
                category: response.data[key].category
            });
        }

        return arrayFilms;
    },

    getById: async (filmId: string) => {
        const response: AxiosResponse = await axios.get(
            'https://medialand-ra-default-rtdb.europe-west1.firebasedatabase.app/films.json?orderBy="$key"&equalTo="' + filmId + '"'
        );

        const film: Film = {
            id: filmId,
            title: response.data[filmId].title,
            releaseDate: response.data[filmId].releaseDate,
            director: response.data[filmId].director,
            synopsis: response.data[filmId].synopsis,
            ratingAverage: response.data[filmId].ratingAverage,
            type: response.data[filmId].type,
            category: response.data[filmId].category
        };

        return film;
    }
};

export default FirebaseFilmRepository;