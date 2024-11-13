import React, { useState } from 'react';
import { TextField, IconButton, Button, Menu, MenuItem, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const FilterBarUsuario = ({ onSearchChange }) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleUserIconClick = (event) => setMenuAnchorEl(event.currentTarget);
  const handleMenuClose = () => setMenuAnchorEl(null);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, padding: 2, backgroundColor: '#9ABF80' }}>
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
          bgcolor: '#EAF2E4',
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

      <Button
        variant="contained"
        color="primary"
        sx={{ bgcolor: '#3a7e0d' }}
        onClick={() => navigate('/crear-usuario')}
      >
        Crear Usuario
      </Button>

      <IconButton
        sx={{ bgcolor: '#3a7e0d', '&:hover': { bgcolor: '#51A614' }, borderRadius: 1 }}
        onClick={() => navigate('/home')}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/25/25694.png"
          alt="Home"
          style={{ width: 24 }}
        />
      </IconButton>

      <IconButton
        sx={{ bgcolor: '#3a7e0d', '&:hover': { bgcolor: '#51A614' }, borderRadius: 1 }}
        onClick={handleUserIconClick}
      >
        <img
          src="https://img.icons8.com/?size=64&id=rrtYnzKMTlUr&format=png"
          alt="Perfil"
          style={{ width: 24 }}
        />
      </IconButton>

      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <MenuItem onClick={() => { navigate('/panel'); handleMenuClose(); }}>Gestión Usuarios</MenuItem>
        <MenuItem onClick={() => { navigate('/login'); handleMenuClose(); }}>Cerrar sesión</MenuItem>
      </Menu>
    </Box>
  );
};

export default FilterBarUsuario;
