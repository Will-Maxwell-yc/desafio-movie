import { useState, useEffect } from 'react';
import { movieService } from '../services/movieService';
import { MovieSearchResponse, MovieDetails, Credits, VideoResponse } from '../types';

export const usePopularMovies = (page: number = 1) => {
  const [data, setData] = useState<MovieSearchResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await movieService.getPopularMovies(page);
        setData(result);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Erro ao carregar filmes');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  return { data, loading, error };
};

export const useNowPlayingMovies = (page: number = 1) => {
  const [data, setData] = useState<MovieSearchResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await movieService.getNowPlayingMovies(page);
        setData(result);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Erro ao carregar filmes em cartaz');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  return { data, loading, error };
};

export const useMovieSearch = (query: string, page: number = 1) => {
  const [data, setData] = useState<MovieSearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setData(null);
      return;
    }

    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await movieService.searchMovies(query, page);
        setData(result);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Erro ao buscar filmes');
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchMovies();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query, page]);

  return { data, loading, error };
};

export const useMovieDetails = (id: number) => {
  const [data, setData] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await movieService.getMovieDetails(id);
        setData(result);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Erro ao carregar detalhes do filme');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetails();
    }
  }, [id]);

  return { data, loading, error };
};

export const useMovieCredits = (id: number) => {
  const [data, setData] = useState<Credits | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await movieService.getMovieCredits(id);
        setData(result);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Erro ao carregar créditos');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCredits();
    }
  }, [id]);

  return { data, loading, error };
};

export const useMovieVideos = (id: number) => {
  const [data, setData] = useState<VideoResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await movieService.getMovieVideos(id);
        setData(result);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Erro ao carregar vídeos');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchVideos();
    }
  }, [id]);

  return { data, loading, error };
};

export const useMoviesByGenre = (genres: string, page: number = 1) => {
  const [data, setData] = useState<MovieSearchResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await movieService.getMoviesByGenre(genres, page);
        setData(result);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Erro ao carregar filmes por gênero');
      } finally {
        setLoading(false);
      }
    };

    if (genres) {
      fetchMovies();
    }
  }, [genres, page]);

  return { data, loading, error };
};
