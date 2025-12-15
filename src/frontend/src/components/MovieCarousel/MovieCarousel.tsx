import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Chip, useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useAuth } from '../../context/AuthContext';
import { Movie } from '../../types';
import { TMDB_IMAGE_BASE_URL_ORIGINAL } from '../../utils/constants';

interface MovieCarouselProps {
  movies: Movie[];
  interval?: number;
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ movies, interval = 6000 }) => {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const next = () =>
    setCurrent((prev) => (prev + 1) % movies.length);

  const prev = () =>
    setCurrent((prev) =>
      prev === 0 ? movies.length - 1 : prev - 1
    );

  useEffect(() => {
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [current, interval]);

  const handleMovieClick = (movieId: number) => {
    if (isAuthenticated) {
      navigate(`/movie/${movieId}`);
    } else {
      navigate('/login');
    }
  };

  if (movies.length === 0) return null;

  return (
    <Box sx={{ width: '100%', mb: 8, position: 'relative', px: 4 }}>
      <Typography
        variant="h5"
        component="h2"
        sx={{
          fontWeight: 600,
          color: 'text.primary',
          mb: 4,
        }}
      >
        🎭 Nos Cinemas
      </Typography>

      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: '70vh', sm: '60vh', md: '70vh' },
          overflow: 'hidden',
          borderRadius: '16px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
        }}
        onTouchStart={(e) => setTouchStart(e.targetTouches[0].clientX)}
        onTouchMove={(e) => setTouchEnd(e.targetTouches[0].clientX)}
        onTouchEnd={() => {
          if (!touchStart || !touchEnd) return;
          const distance = touchStart - touchEnd;
          const isLeftSwipe = distance > 50;
          const isRightSwipe = distance < -50;
          if (isLeftSwipe) next();
          if (isRightSwipe) prev();
          setTouchStart(null);
          setTouchEnd(null);
        }}
      >
        {movies.map((movie, index) => {
          const backdropPath = (movie as any).backdrop_path;
          const posterPath = (movie as any).posterPath || (movie as any).poster_path;
          const imageUrl = backdropPath ? `${TMDB_IMAGE_BASE_URL_ORIGINAL}${backdropPath}` :
                          posterPath ? `${TMDB_IMAGE_BASE_URL_ORIGINAL}${posterPath}` :
                          'https://via.placeholder.com/1920x1080/1e1e1e/9c27b0?text=Sem+Imagem';

          return (
            <Box
              key={movie.id}
              sx={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: index === current ? 1 : 0,
                transition: 'opacity 0.8s ease-in-out',
                cursor: 'pointer',
              }}
              onClick={() => handleMovieClick(movie.id)}
            >
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
                }}
              />

              <Box
                sx={{
                  position: 'absolute',
                  left: { xs: '5%', md: '8%' },
                  bottom: { xs: '15%', md: '20%' },
                  maxWidth: { xs: '90%', sm: '60%', md: '40%' },
                  color: 'white',
                  zIndex: 2,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Chip
                    label="EM CARTAZ"
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '0.75rem',
                      mr: 2,
                      mb: 1,
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      opacity: 0.8,
                      fontSize: '0.9rem',
                    }}
                  >
                    {(movie as any).release_date ? new Date((movie as any).release_date).getFullYear() : 'N/A'}
                  </Typography>
                </Box>

                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
                    fontWeight: 'bold',
                    mb: 2,
                    textShadow: '2px 2px 8px rgba(0,0,0,0.8)',
                    lineHeight: 1.1,
                  }}
                >
                  {movie.title}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: '1rem', md: '1.2rem' },
                    mb: 3,
                    textShadow: '1px 1px 4px rgba(0,0,0,0.8)',
                    lineHeight: 1.5,
                    opacity: 0.9,
                    maxWidth: '600px',
                  }}
                >
                  {movie.overview ? movie.overview.substring(0, 200) + '...' : 'Sinopse não disponível'}
                </Typography>

                <IconButton
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: 'white',
                    borderRadius: '50%',
                    width: 64,
                    height: 64,
                    boxShadow: '0 4px 12px rgba(156, 39, 176, 0.3)',
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark,
                      boxShadow: '0 6px 16px rgba(156, 39, 176, 0.4)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <PlayArrowIcon sx={{ fontSize: '2rem' }} />
                </IconButton>
              </Box>
            </Box>
          );
        })}

        {isDesktop && (
          <IconButton
            className="nav left"
            onClick={prev}
            sx={{
              position: 'absolute',
              left: { xs: 20, md: 32 },
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              bgcolor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.9)',
                color: 'primary.main',
              },
              width: 40,
              height: 40,
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
        )}
        {isDesktop && (
          <IconButton
            className="nav right"
            onClick={next}
            sx={{
              position: 'absolute',
              right: { xs: 20, md: 32 },
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              bgcolor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.9)',
                color: 'primary.main',
              },
              width: 40,
              height: 40,
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        )}

        <Box
          className="dots"
          sx={{
            position: 'absolute',
            bottom: { xs: 20, md: 32 },
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 1,
            zIndex: 10,
          }}
        >
          {movies.slice(0, 10).map((_, i) => (
            <Box
              key={i}
              className={i === current ? "dot active" : "dot"}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: i === current ? 'white' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: i === current ? 'white' : 'rgba(255,255,255,0.7)',
                  transform: 'scale(1.2)',
                },
              }}
              onClick={() => setCurrent(i)}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MovieCarousel;