export interface User {
  id: number;
  nome: string;
  tipoUsuario: string;
}

export interface LoginRequest {
  usuario: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
  id: number;
  nome: string;
  tipoUsuario: string;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  releaseDate: string;
  voteAverage: number;
  posterPath: string | null;
  backdropPath: string | null;
}

export interface MovieSearchResponse {
  page: number;
  results: Movie[];
  totalPages: number;
  totalResults: number;
}

export interface MovieDetails extends Movie {
  runtime: number;
  voteCount: number;
  genres: Genre[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profilePath: string | null;
  order: number;
}

export interface Credits {
  cast: Cast[];
  crew: Crew[];
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  department: string;
  profilePath: string | null;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface VideoResponse {
  id: number;
  results: Video[];
}
