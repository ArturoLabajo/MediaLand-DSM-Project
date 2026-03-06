import type { FilmRepository } from "../domain/FilmRepository";

const filmService = (repository: FilmRepository) => {
    return {
        getAll: () => repository.getAll(),
        getById: (filmId: string) => repository.getById(filmId)
    }
}

export default filmService