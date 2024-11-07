import React, { useState } from 'react';
import { TextField, IconButton, Button, Menu, MenuItem, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search'; // Icono de búsqueda

const FilterBarUsuario = ({ onSearchChange, onCreateUser }) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleUserIconClick = (event) => setMenuAnchorEl(event.currentTarget);
  const handleMenuClose = () => setMenuAnchorEl(null);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, padding: 2, backgroundColor: '#EAF2E4' }}>
      {/* Campo de Búsqueda con icono de lupa */}
      <TextField
        variant="outlined"
        placeholder="Buscar usuario"
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <IconButton sx={{ padding: 0, marginRight: 1 }}>
              <SearchIcon />
            </IconButton>
          ),
        }}
        sx={{
          flexGrow: 1,
          bgcolor: '#FFFFFF',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'transparent',
            },
            '&:hover fieldset': {
              borderColor: '#3a7e0d',
            },
          },
        }}
      />

      {/* Botón Crear Usuario */}
      <Button variant="contained" color="primary" onClick={onCreateUser}>
        Crear Usuario
      </Button>

      {/* Icono de Casa */}
      <IconButton
        sx={{ bgcolor: '#3a7e0d', '&:hover': { bgcolor: '#51A614' }, borderRadius: 1 }}
        onClick={() => window.location.href = '/adminhome'}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/25/25694.png" // URL del icono de casa
          alt="Home"
          style={{ width: 24 }}
        />
      </IconButton>

      {/* Icono de Usuario con Menú */}
      <IconButton
        sx={{ bgcolor: '#3a7e0d', '&:hover': { bgcolor: '#51A614' }, borderRadius: 1 }}
        onClick={handleUserIconClick}
      >
        <img
          src="https://w7.pngwing.com/pngs/722/101/png-transparent-computer-icons-user-profile-circle-abstract-miscellaneous-rim-account-thumbnail.png" // URL del icono de usuario
          alt="Perfil"
          style={{ width: 24 }}
        />
      </IconButton>
      
      {/* Menú desplegable del icono de usuario */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <MenuItem onClick={handleMenuClose}>Gestión Usuarios</MenuItem>
        <MenuItem onClick={handleMenuClose}>Cerrar sesión</MenuItem>
      </Menu>
    </Box>
  );
};

export default FilterBarUsuario;
