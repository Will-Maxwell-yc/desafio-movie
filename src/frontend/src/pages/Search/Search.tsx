import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import { useMovieSearch } from '../../hooks/useMovies';
import SearchBar from '../../components/SearchBar/SearchBar';
import MovieGrid from '../../components/MovieGrid/MovieGrid';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const [query, setQuery] = useState(queryParam);
  const [page, setPage] = useState(1);
  const { data, loading, error } = useMovieSearch(query, page);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setQuery(q);
    }
  }, [searchParams]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setPage(1);
  };

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
          🔍 Buscar Filmes
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Procure aí e encontre seus filmes favoritos
        </Typography>
      </Box>
      <SearchBar onSearch={handleSearch} />
      
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {data && data.results.length > 0 && (
        <MovieGrid
          movies={data.results}
          currentPage={data.page}
          totalPages={data.totalPages}
          onPageChange={setPage}
        />
      )}
      {data && data.results.length === 0 && query && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            😕 Nenhum filme encontrado
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Tenta buscar por outro termo aí
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Search;
