import FirebaseFilmRepository from "../infrastructure/FirebaseFilmRepository";

const FilmService = {
  getAll: () => {
    return FirebaseFilmRepository.getAll();
  },

  getById: (id: string) => {
    return FirebaseFilmRepository.getById(id);
  },
};

export default FilmService;