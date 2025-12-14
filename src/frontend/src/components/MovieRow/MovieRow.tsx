import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography, Button, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Movie } from '../../types';
import MovieCard from '../MovieCard/MovieCard';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  categorySlug?: string;
  onSeeAll?: () => void;
}

const MovieRow: React.FC<MovieRowProps> = ({ title, movies, categorySlug, onSeeAll }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const displayedMovies = movies.slice(0, 15);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollButtons();
      container.addEventListener('scroll', checkScrollButtons);
      window.addEventListener('resize', checkScrollButtons);
      return () => {
        container.removeEventListener('scroll', checkScrollButtons);
        window.removeEventListener('resize', checkScrollButtons);
      };
    }
  }, [displayedMovies]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  const handleSeeAll = () => {
    if (onSeeAll) {
      onSeeAll();
    } else if (categorySlug) {
      navigate(`/categoria/${categorySlug}`);
    } else {
      navigate(`/categoria/${encodeURIComponent(title.toLowerCase().replace(/\s+/g, '-'))}`);
    }
  };

  return (
    <Box sx={{ mb: 4, width: '100%', overflowX: 'hidden' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          px: { xs: 2, md: 4 },
          width: '100%',
          maxWidth: '100%',
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: 600,
            color: 'text.primary',
          }}
        >
          {title}
        </Typography>
        <Button
          onClick={handleSeeAll}
          endIcon={<ChevronRightIcon />}
          sx={{
            color: 'text.secondary',
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              color: 'primary.main',
              bgcolor: 'rgba(156, 39, 176, 0.1)',
            },
          }}
        >
          Ver mais
        </Button>
      </Box>

      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: '100%',
        }}
      >
        {isDesktop && showLeftArrow && (
          <IconButton
            onClick={() => scroll('left')}
            sx={{
              position: 'absolute',
              left: { md: 8 },
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
        {isDesktop && showRightArrow && (
          <IconButton
            onClick={() => scroll('right')}
            sx={{
              position: 'absolute',
              right: { md: 8 },
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
          ref={scrollContainerRef}
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            overflowY: 'visible',
            px: { xs: 2, md: 4 },
            pt: 2,
            pb: 2,
            scrollBehavior: 'smooth',
            width: '100%',
            maxWidth: '100%',
            '&::-webkit-scrollbar': {
              height: '4px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              bgcolor: 'rgba(156, 39, 176, 0.3)',
              borderRadius: '2px',
              '&:hover': {
                bgcolor: 'rgba(156, 39, 176, 0.5)',
              },
            },
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(156, 39, 176, 0.3) transparent',
          }}
        >
        {displayedMovies.map((movie) => (
          <Box
            key={movie.id}
            sx={{
              flexShrink: 0,
              width: { xs: '140px', sm: '160px', md: '180px' },
            }}
          >
            <MovieCard movie={movie} />
          </Box>
        ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MovieRow;
