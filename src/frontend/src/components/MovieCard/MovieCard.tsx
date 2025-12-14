import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Movie } from '../../types';
import { TMDB_IMAGE_BASE_URL } from '../../utils/constants';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const getPosterUrl = () => {
    const posterPath = (movie as any).posterPath || (movie as any).poster_path;

    if (!posterPath || posterPath.trim() === '' || posterPath === 'null' || posterPath === null) {
      return 'https://via.placeholder.com/500x750/1e1e1e/9c27b0?text=Sem+Imagem';
    }

    let path = String(posterPath).trim();
    if (!path.startsWith('/')) {
      path = `/${path}`;
    }

    return `${TMDB_IMAGE_BASE_URL}${path}`;
  };

  const posterUrl = getPosterUrl();

  const handleClick = () => {
    if (isAuthenticated) {
      navigate(`/movie/${movie.id}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        cursor: 'pointer',
        transition: 'transform 0.2s ease',
        padding: '12px 8px 8px 8px',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          aspectRatio: '2/3',
          borderRadius: '12px',
          mb: 1,
          bgcolor: 'background.paper',
          transition: 'box-shadow 0.3s ease',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: '-2px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #9c27b0, #87CEEB)',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            zIndex: 0,
            pointerEvents: 'none',
          },
          '&:hover::before': {
            opacity: 1,
          },
          '&:hover': {
            boxShadow: `
              0 0 6px rgba(156, 39, 176, 0.4),
              0 0 12px rgba(135, 206, 235, 0.3)
            `,
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: 'calc(100% - 4px)',
            height: 'calc(100% - 4px)',
            margin: '2px',
            borderRadius: '10px',
            overflow: 'hidden',
            bgcolor: 'background.paper',
            zIndex: 1,
          }}
        >
          <img
            src={posterUrl}
            alt={movie.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            onError={(e: any) => {
              e.target.src = 'https://via.placeholder.com/500x750/1e1e1e/9c27b0?text=Sem+Imagem';
            }}
          />
        </Box>
      </Box>

      <Typography
        variant="body2"
        sx={{
          color: 'text.primary',
          fontWeight: 500,
          textAlign: 'center',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          lineHeight: 1.4,
        }}
      >
        {movie.title}
      </Typography>
    </Box>
  );
};

export default MovieCard;
