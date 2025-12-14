import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Rating,
  Button,
  CircularProgress,
  Alert,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useMovieDetails, useMovieCredits, useMovieVideos } from '../../hooks/useMovies';
import { TMDB_IMAGE_BASE_URL } from '../../utils/constants';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movieId = parseInt(id || '0');

  const { data: movie, loading: movieLoading, error: movieError } = useMovieDetails(movieId);
  const { data: credits, loading: creditsLoading } = useMovieCredits(movieId);
  const { data: videos, loading: videosLoading } = useMovieVideos(movieId);


  if (movieLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (movieError || !movie) {
    return <ErrorMessage message={movieError || 'Filme não encontrado'} />;
  }

  const getImageUrl = (imagePath: string | null | undefined, baseUrl: string, placeholder: string): string => {
    if (!imagePath || imagePath.trim() === '' || imagePath === 'null' || imagePath === null) {
      return placeholder;
    }

    let path = String(imagePath).trim();
    if (!path.startsWith('/')) {
      path = `/${path}`;
    }

    const finalUrl = `${baseUrl}${path}`;
    return finalUrl;
  };

  const posterPath = movie.posterPath || (movie as any).poster_path || null;
  
  const posterUrl = getImageUrl(
    posterPath,
    TMDB_IMAGE_BASE_URL,
    'https://via.placeholder.com/500x750/1e1e1e/9c27b0?text=Sem+Imagem'
  );

  const getProfileUrl = (profilePath: string | null | undefined): string => {
    const fallbackImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWUxZTFlIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzljMjdiMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
    return getImageUrl(
      profilePath,
      TMDB_IMAGE_BASE_URL,
      fallbackImage
    );
  };

  const trailer = videos?.results.find(
    (v) => v.site === 'YouTube' && v.type === 'Trailer' && v.official
  );

  const topCast = credits?.cast.slice(0, 5) || [];

  return (
    <Box sx={{ width: '100%', overflowX: 'hidden' }}>
      <Container maxWidth="lg" sx={{ py: 4, width: '100%', overflowX: 'hidden' }}>
        <IconButton
          onClick={() => navigate(-1)}
          sx={{ 
            mb: 3,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            '&:hover': {
              bgcolor: 'rgba(156, 39, 176, 0.1)',
              borderColor: 'primary.main',
            },
          }}
        >
          <ArrowBackIcon sx={{ color: 'primary.main' }} />
        </IconButton>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0}
              sx={{
                bgcolor: 'background.paper',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <img
                src={posterUrl}
                alt={movie.title}
                style={{ width: '100%', display: 'block' }}
                onError={(e: any) => {
                  e.target.src = 'https://via.placeholder.com/500x750/1e1e1e/9c27b0?text=Sem+Imagem';
                }}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <Typography 
              variant="h3" 
              component="h1" 
              gutterBottom
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
              }}
            >
              {movie.title}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Rating 
                value={(movie.voteAverage ?? 0) / 2} 
                precision={0.1} 
                readOnly
                sx={{
                  '& .MuiRating-iconFilled': {
                    color: 'primary.main',
                  },
                }}
              />
              <Typography variant="body1" color="text.secondary">
                {(movie.voteAverage ?? 0).toFixed(1)} / 10 ({movie.voteCount ?? 0} votos)
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              {movie.genres.map((genre) => (
                <Chip
                  key={genre.id}
                  label={genre.name}
                  sx={{ 
                    mr: 1, 
                    mb: 1,
                    bgcolor: 'primary.main',
                    color: 'white',
                    fontWeight: 600,
                  }}
                  size="small"
                />
              ))}
            </Box>

            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>Lançou em:</strong> {new Date(movie.releaseDate).toLocaleDateString('pt-BR')}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>Duração:</strong> {movie.runtime ?? 'N/A'} minutos
            </Typography>

            <Typography 
              variant="h5" 
              sx={{ 
                mt: 4, 
                mb: 2,
                fontWeight: 600,
                color: 'primary.main',
              }}
            >
              📖 Sinopse
            </Typography>
            <Typography 
              variant="body1" 
              paragraph
              sx={{
                color: 'text.secondary',
                lineHeight: 1.8,
              }}
            >
              {movie.overview || 'Sinopse não disponível.'}
            </Typography>

            {trailer && (
              <Box sx={{ mt: 5 }}>
                <Typography 
                  variant="h5" 
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    color: 'primary.main',
                    mb: 2,
                  }}
                >
                  🎬 Trailer
                </Typography>
                <Box
                  sx={{
                    position: 'relative',
                    paddingBottom: '56.25%',
                    height: 0,
                    overflow: 'hidden',
                  }}
                >
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title={trailer.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </Box>
              </Box>
            )}

            {topCast.length > 0 && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  🎭 Elenco Principal
                </Typography>
                <Grid container spacing={2}>
                  {topCast.map((actor) => {
                    const actorProfilePath = actor.profilePath || (actor as any).profile_path || null;
                    return (
                    <Grid item xs={6} sm={4} md={2.4} key={actor.id}>
                      <Box sx={{ textAlign: 'center' }}>
                        <img
                          src={getProfileUrl(actorProfilePath)}
                          alt={actor.name}
                          style={{
                            width: '100%',
                            borderRadius: '8px',
                            marginBottom: '8px',
                          }}
                          onError={(e: any) => {
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWUxZTFlIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzljMjdiMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                          }}
                        />
                        <Typography variant="body2" fontWeight="bold">
                          {actor.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {actor.character}
                        </Typography>
                      </Box>
                    </Grid>
                    );
                  })}
                </Grid>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MovieDetails;
