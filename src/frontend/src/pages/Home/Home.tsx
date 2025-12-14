import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useMoviesByGenre, usePopularMovies, useNowPlayingMovies } from '../../hooks/useMovies';
import MovieRow from '../../components/MovieRow/MovieRow';
import MovieCarousel from '../../components/MovieCarousel/MovieCarousel';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { getGenreIds } from '../../utils/genreMapping';

const Home: React.FC = () => {
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(1);
  const [page3, setPage3] = useState(1);
  const [page4, setPage4] = useState(1);
  const [page5, setPage5] = useState(1);
  const [popularPage, setPopularPage] = useState(1);
  const [nowPlayingPage, setNowPlayingPage] = useState(1);

  const { data: popularData, loading: popularLoading, error: popularError } = usePopularMovies(popularPage);
  const { data: nowPlayingData, loading: nowPlayingLoading, error: nowPlayingError } = useNowPlayingMovies(nowPlayingPage);
  const { data: data1, loading: loading1, error: error1 } = useMoviesByGenre(getGenreIds('acao-e-suspense'), page1);
  const { data: data2, loading: loading2, error: error2 } = useMoviesByGenre(getGenreIds('acao'), page2);
  const { data: data3, loading: loading3, error: error3 } = useMoviesByGenre(getGenreIds('animacao'), page3);
  const { data: data4, loading: loading4, error: error4 } = useMoviesByGenre(getGenreIds('comedia'), page4);
  const { data: data5, loading: loading5, error: error5 } = useMoviesByGenre(getGenreIds('drama'), page5);

  if (popularLoading && !popularData && nowPlayingLoading && !nowPlayingData) {
    return <LoadingSpinner fullScreen />;
  }

  if (popularError && nowPlayingError) {
    return <ErrorMessage message={popularError || nowPlayingError} />;
  }

  return (
    <Box sx={{ py: { xs: 2, sm: 3, md: 4 }, width: '100%', overflowX: 'hidden' }}>
      {nowPlayingData && (
        <MovieCarousel movies={nowPlayingData.results} />
      )}
      {nowPlayingLoading && !nowPlayingData && (
        <LoadingSpinner fullScreen />
      )}
      {nowPlayingError && (
        <ErrorMessage message={nowPlayingError} />
      )}

      {popularData && (
        <MovieRow
          title="🎬 Filmes Populares"
          movies={popularData.results}
          categorySlug="populares"
        />
      )}
      {popularLoading && !popularData && (
        <LoadingSpinner fullScreen />
      )}
      {popularError && (
        <ErrorMessage message={popularError} />
      )}

      {data1 && (
        <MovieRow
          title="🎬 Ação e Suspense"
          movies={data1.results}
          categorySlug="acao-e-suspense"
        />
      )}

      {data2 && (
        <MovieRow
          title="💥 Ação Pura"
          movies={data2.results}
          categorySlug="acao"
        />
      )}

      {data3 && (
        <MovieRow
          title="🎨 Animação"
          movies={data3.results}
          categorySlug="animacao"
        />
      )}

      {data4 && (
        <MovieRow
          title="😂 Comédia"
          movies={data4.results}
          categorySlug="comedia"
        />
      )}

      {data5 && (
        <MovieRow
          title="🎭 Drama"
          movies={data5.results}
          categorySlug="drama"
        />
      )}

      {(loading1 || loading2 || loading3 || loading4 || loading5) && (
        <Box sx={{ px: { xs: 2, md: 4 }, py: 2 }}>
          <LoadingSpinner />
        </Box>
      )}

      {(error1 || error2 || error3 || error4 || error5) && (
        <Box sx={{ px: { xs: 2, md: 4 }, py: 2 }}>
          <ErrorMessage message={error1 || error2 || error3 || error4 || error5 || 'Erro ao carregar filmes'} />
        </Box>
      )}
    </Box>
  );
};

export default Home;
