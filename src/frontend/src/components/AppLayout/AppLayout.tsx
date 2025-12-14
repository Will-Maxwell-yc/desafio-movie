import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Toolbar,
  TextField,
  InputAdornment,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import ListIcon from '@mui/icons-material/List';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import StarIcon from '@mui/icons-material/Star';
import SettingsIcon from '@mui/icons-material/Settings';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SearchIcon from '@mui/icons-material/Search';
import ShareIcon from '@mui/icons-material/Share';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../../context/AuthContext';

const DRAWER_WIDTH = 80;

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const menuItems = [
    { icon: <HomeIcon />, label: 'Início', path: '/' },
    { icon: <ExploreIcon />, label: 'Explorar', path: '/explore' },
    { icon: <ListIcon />, label: 'Listas', path: '/lists' },
    { icon: <CalendarTodayIcon />, label: 'Calendário', path: '/calendar' },
    { icon: <StarIcon />, label: 'Recomendações', path: '/recommendations' },
    { icon: <SettingsIcon />, label: 'Configurações', path: '/settings' },
  ];

  const drawerContent = (
    <Box
      sx={{
        width: DRAWER_WIDTH,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: 2,
        pb: 2,
        bgcolor: 'background.paper',
      }}
    >
      <List sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.label} disablePadding sx={{ display: 'flex', justifyContent: 'center' }}>
            <ListItemButton
              onClick={() => handleMenuItemClick(item.path)}
              sx={{
                minHeight: 48,
                justifyContent: 'center',
                px: 0,
                borderRadius: '12px',
                color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
                '&:hover': {
                  bgcolor: 'rgba(156, 39, 176, 0.1)',
                  color: 'primary.main',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: 'center',
                  color: 'inherit',
                }}
              >
                {item.icon}
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default', width: '100%', overflowX: 'hidden' }}>
      <Box
        component="nav"
        sx={{
          width: { md: DRAWER_WIDTH },
          flexShrink: { md: 0 },
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
              borderRight: '1px solid',
              borderColor: 'divider',
              overflowX: 'hidden',
            },
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
              borderRight: '1px solid',
              borderColor: 'divider',
              overflowX: 'hidden',
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', width: 0, minWidth: 0, overflowX: 'hidden' }}>
        <Toolbar
          sx={{
            bgcolor: 'background.default',
            borderBottom: '1px solid',
            borderColor: 'divider',
            px: { xs: 1, sm: 2, md: 4 },
            py: 2,
            display: 'flex',
            gap: { xs: 1, sm: 2 },
            alignItems: 'center',
            width: '100%',
            maxWidth: '100%',
            overflowX: 'hidden',
            flexWrap: { xs: 'wrap', sm: 'nowrap' },
          }}
        >
          <IconButton
            color="inherit"
            aria-label="abrir menu"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: { xs: 0, md: 2 },
              display: { xs: 'block', md: 'none' },
              color: 'text.primary',
            }}
          >
            <MenuIcon />
          </IconButton>

          <IconButton
            sx={{
              color: 'primary.main',
              display: { xs: 'none', sm: 'flex' },
              '&:hover': {
                bgcolor: 'rgba(156, 39, 176, 0.1)',
              },
            }}
          >
            <PlayArrowIcon />
          </IconButton>

          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              flexGrow: 1,
              maxWidth: { xs: '100%', sm: '400px', md: '600px' },
              minWidth: 0,
              width: 0,
            }}
          >
            <TextField
              fullWidth
              placeholder={isMobile ? "Buscar..." : "Procura aí ou cola um link"}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size={isMobile ? 'small' : 'medium'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton type="submit" edge="end" size={isMobile ? 'small' : 'medium'}>
                      <SearchIcon sx={{ color: 'text.secondary', fontSize: { xs: '1.2rem', md: '1.5rem' } }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'background.paper',
                  borderRadius: '8px',
                  '& fieldset': {
                    borderColor: 'divider',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'text.primary',
                  py: { xs: 0.75, md: 1 },
                  fontSize: { xs: '0.875rem', md: '1rem' },
                },
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 1 }, alignItems: 'center' }}>
            <IconButton
              sx={{
                color: 'text.secondary',
                display: { xs: 'none', sm: 'flex' },
                '&:hover': {
                  bgcolor: 'rgba(156, 39, 176, 0.1)',
                  color: 'primary.main',
                },
              }}
            >
              <ShareIcon />
            </IconButton>
            <IconButton
              sx={{
                color: 'text.secondary',
                display: { xs: 'none', md: 'flex' },
                '&:hover': {
                  bgcolor: 'rgba(156, 39, 176, 0.1)',
                  color: 'primary.main',
                },
              }}
            >
              <ViewModuleIcon />
            </IconButton>
            {isAuthenticated && user ? (
              <>
                <IconButton
                  onClick={handleMenuOpen}
                  sx={{
                    '&:hover': {
                      bgcolor: 'rgba(156, 39, 176, 0.1)',
                    },
                  }}
                >
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                    {user.nome.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: {
                      bgcolor: 'background.paper',
                      mt: 1,
                      minWidth: 200,
                    },
                  }}
                >
                  <MenuItem disabled>
                    <Typography variant="body2" color="text.secondary">
                      {user.nome}
                    </Typography>
                  </MenuItem>
                  <MenuItem disabled>
                    <Typography variant="caption" color="text.secondary">
                      {user.tipoUsuario}
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <LogoutIcon sx={{ mr: 1, fontSize: 20 }} />
                    Sair
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <IconButton
                onClick={handleLogin}
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    bgcolor: 'rgba(156, 39, 176, 0.1)',
                    color: 'primary.main',
                  },
                }}
              >
                <AccountCircleIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>

        <Box sx={{ flexGrow: 1, bgcolor: 'background.default', overflow: 'auto', overflowX: 'hidden', width: '100%' }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;
