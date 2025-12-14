import api from './api';
import { MovieSearchResponse, MovieDetails, Credits, VideoResponse } from '../types';

export const movieService = {
  getPopularMovies: async (page: number = 1): Promise<MovieSearchResponse> => {
    const response = await api.get<MovieSearchResponse>(`/movies/populares?page=${page}`);
    return response.data;
  },

  getNowPlayingMovies: async (page: number = 1): Promise<MovieSearchResponse> => {
    const url = `/movies/em-cartaz?page=${page}`;
    try {
      const response = await api.get<MovieSearchResponse>(url);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  searchMovies: async (query: string, page: number = 1): Promise<MovieSearchResponse> => {
    const response = await api.get<MovieSearchResponse>(`/movies/buscar?query=${encodeURIComponent(query)}&page=${page}`);
    return response.data;
  },

  getMovieDetails: async (id: number): Promise<MovieDetails> => {
    const response = await api.get<MovieDetails>(`/movies/${id}`);
    return response.data;
  },

  getMovieCredits: async (id: number): Promise<Credits> => {
    const response = await api.get<Credits>(`/movies/${id}/creditos`);
    return response.data;
  },

  getMovieVideos: async (id: number): Promise<VideoResponse> => {
    const response = await api.get<VideoResponse>(`/movies/${id}/videos`);
    return response.data;
  },

  getMoviesByGenre: async (genres: string, page: number = 1): Promise<MovieSearchResponse> => {
    const encodedGenres = encodeURIComponent(genres);
    const url = `/movies/genero?genres=${encodedGenres}&page=${page}`;
    try {
      const response = await api.get<MovieSearchResponse>(url);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }
};
