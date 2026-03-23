// Estructura de datos de comentarios
export interface Comment {
  id: string; // id unico del comentario
  filmId: string; // id de la peli o serie que pertenece
  userId: string; // id del usuario que comento
  userName: string; // nombre del usuario
  perfil: string; // ruta imgen del usuario
  text: string; // texto del comentario
};