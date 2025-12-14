import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Container, Typography, Box, Grid } from '@mui/material';
import { useMoviesByGenre } from '../../hooks/useMovies';
import MovieCard from '../../components/MovieCard/MovieCard';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { getGenreIds } from '../../utils/genreMapping';
import { Movie } from '../../types';

const Category: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || categoryName || '';
  const [page, setPage] = useState(1);
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerTarget = useRef<HTMLDivElement | null>(null);
  const genreIds = getGenreIds(categoryParam);
  const { data, loading, error } = useMoviesByGenre(genreIds, page);

  const categoryNames: { [key: string]: string } = {
    'acao-e-suspense': '🎬 Ação e Suspense',
    'acao': '💥 Ação Pura',
    'animacao': '🎨 Animação',
    'comedia': '😂 Comédia',
    'drama': '🎭 Drama',
    'terror': '👻 Terror',
    'ficcao-cientifica': '🚀 Ficção Científica',
    'romance': '💕 Romance',
  };

  const displayName = categoryNames[categoryParam] || categoryParam || '🎬 Filmes';

  useEffect(() => {
    setPage(1);
    setAllMovies([]);
    setHasMore(true);
  }, [categoryParam]);

  useEffect(() => {
    if (data) {
      // Use local page state instead of data.page since API might not return correct page number
      if (page === 1) {
        setAllMovies(data.results);
      } else {
        setAllMovies((prev) => {
          const existingIds = new Set(prev.map(m => m.id));
          const uniqueNewMovies = data.results.filter(m => !existingIds.has(m.id));
          const newMovies = [...prev, ...uniqueNewMovies];
          return newMovies;
        });
      }
      // Use local page state for comparison, but validate with data.totalPages
      const hasMorePages = page < data.totalPages;
      setHasMore(hasMorePages);
      setIsLoadingMore(false);
    }
  }, [data, page]);

  const loadMore = useCallback(() => {
    const condition1 = !isLoadingMore;
    const condition2 = hasMore;
    const condition3 = (page === 1 ? !loading : true);
    if (condition1 && condition2 && condition3) {
      setIsLoadingMore(true);
      setPage((prev) => prev + 1);
    } else {
    }
  }, [isLoadingMore, hasMore, loading, page]);

  useEffect(() => {
    if (!hasMore || isLoadingMore) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const condition1 = entries[0]?.isIntersecting;
        const condition2 = hasMore;
        const condition3 = !isLoadingMore;
        const condition4 = (page === 1 ? !loading : true);
        if (condition1 && condition2 && condition3 && condition4) {
          loadMore();
        } else {
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    const currentTarget = observerTarget.current;
    
    if (currentTarget) {
      observer.observe(currentTarget);
    } else {
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
      observer.disconnect();
    };
  }, [hasMore, loading, isLoadingMore, loadMore, page, allMovies.length]);

  useEffect(() => {
  }, [allMovies.length, hasMore, isLoadingMore]);

  return (
    <Container maxWidth="xl" sx={{ py: 6, px: { xs: 2, md: 4 }, width: '100%', overflowX: 'hidden' }}>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
          }}
        >
          {displayName}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Dá uma olhada nessa seleção massa de {displayName.replace(/[🎬💥🎨😂🎭👻🚀💕]/g, '').toLowerCase().trim()}
        </Typography>
      </Box>
      
      {loading && page === 1 && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {allMovies.length > 0 && (
        <>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {allMovies.map((movie) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
          <Box 
            ref={observerTarget}
            sx={{ py: 4, display: 'flex', justifyContent: 'center' }}
          >
            {isLoadingMore && <LoadingSpinner />}
            {!hasMore && allMovies.length > 0 && (
              <Typography variant="body2" color="text.secondary">
                Fim dos filmes disponíveis
              </Typography>
            )}
          </Box>
        </>
      )}
      {!loading && allMovies.length === 0 && !error && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            😕 Nenhum filme encontrado
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Tenta outra categoria aí
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Category;
