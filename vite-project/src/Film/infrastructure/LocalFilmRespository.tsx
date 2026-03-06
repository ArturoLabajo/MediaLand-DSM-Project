import type { Film } from "../domain/Film";
import type { FilmRepository } from "../domain/FilmRepository";

export default class LocalFilmRepository implements FilmRepository {
  private films: Film[] = [
    {
      id: "1",
      title: "Titanic",
      releaseDate: "1997",
      director: "James Cameron",
      synopsis: "Una aristócrata de diecisiete años se enamora de un amable pero pobre artista a bordo del lujoso y desafortunado R.M.S. Titanic.",
      ratingAverage: 8.0,
      type: "MOVIE",
      category: "Romance",
    },
    {
      id: "2",
      title: "Back to the Future",
      releaseDate: "1985",
      director: "Robert Zemeckis",
      synopsis: "Marty McFly viaja al pasado en un DeLorean.",
      ratingAverage: 8.5,
      type: "MOVIE",
      category: "Sci-Fi",
    },
    {
      id: "3",
      title: "Losts",
      releaseDate: "2004-2010",
      director: "J.J Abrams",
      synopsis: "Los supervivientes de un accidente aéreo se ven obligados a trabajar juntos para sobrevivir en una isla tropical aparentemente desierta.",
      ratingAverage: 8.3,
      type: "SERIE",
      category: "Drama",
    },
    {
      id: "4",
      title: "The Black Tower",
      releaseDate: "1987-01-01",
      director: "John Smith",
      synopsis: "Una historia inquietante y oscura.",
      ratingAverage: 2.4,
      type: "MOVIE",
      category: "Thriller",
    },
    {
      id: "5",
      title: "Inception",
      releaseDate: "2010-07-16",
      director: "Christopher Nolan",
      synopsis: "Un ladrón entra en los sueños de sus víctimas.",
      ratingAverage: 4.7,
      type: "MOVIE",
      category: "Sci-Fi",
    },
    {
      id: "6",
      title: "The Dark Knight",
      releaseDate: "2008-07-18",
      director: "Christopher Nolan",
      synopsis: "Batman se enfrenta al Joker.",
      ratingAverage: 4.8,
      type: "MOVIE",
      category: "Action",
    },
    {
      id: "7",
      title: "Stranger Things",
      releaseDate: "2016-2026",
      director: "Duffer Brothers",
      synopsis: "Sucesos extraños en un pequeño pueblo.",
      ratingAverage: 4.3,
      type: "SERIE",
      category: "Sci-Fi",
    },
    {
      id: "8",
      title: "Interstellar",
      releaseDate: "2014-11-07",
      director: "Christopher Nolan",
      synopsis: "Una misión espacial para salvar a la humanidad.",
      ratingAverage: 4.6,
      type: "MOVIE",
      category: "Sci-Fi",
    },
    {
      id: "9",
      title: "Dark",
      releaseDate: "2017-2020",
      director: "Baran bo Odar",
      synopsis: "Una misión espacial para salvar a la humanidad.",
      ratingAverage: 8.7,
      type: "MOVIE",
      category: "Drama",
    },
  ];

  async getAll(): Promise<Film[]> {
    return this.films;
  }

  async getById(id: string): Promise<Film | null> {
    const film = this.films.find((film) => film.id === id);
    return film || null;
  }
}