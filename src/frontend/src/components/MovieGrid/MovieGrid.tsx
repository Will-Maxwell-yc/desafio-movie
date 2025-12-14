import React from 'react';
import { Grid, Box, Pagination } from '@mui/material';
import { Movie } from '../../types';
import MovieCard from '../MovieCard/MovieCard';

interface MovieGridProps {
  movies: Movie[];
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, currentPage, totalPages, onPageChange }) => {
  return (
    <Box sx={{ width: '100%', overflowX: 'hidden' }}>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
      {totalPages && totalPages > 1 && currentPage && onPageChange && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => onPageChange(page)}
            color="primary"
            size="large"
            sx={{
              '& .MuiPaginationItem-root': {
                color: 'text.secondary',
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                },
                '&:hover': {
                  bgcolor: 'rgba(156, 39, 176, 0.1)',
                },
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default MovieGrid;
