import React, { useState } from 'react';
import { TextField, IconButton, Button, Menu, MenuItem, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";

const FilterBarUsuario = ({ onSearchChange }) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleUserIconClick = (event) => setMenuAnchorEl(event.currentTarget);
  const handleMenuClose = () => setMenuAnchorEl(null);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2,  backgroundColor: '#397f0e' }}>
      <TextField
      className="input-box"
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
          bgcolor: 'white',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'transparent',
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
      
          sx={{
            bgcolor: "#49a011",
            "&:hover": { bgcolor: "#49a011" },
            borderRadius: 1,
            padding: "8px",
          }}
          onClick={() => navigate("/home")}
        >
          <HomeIcon sx={{ color: "white", fontSize: 24 }} />
        </IconButton>

        <IconButton
      onClick={handleUserIconClick}
      sx={{
        bgcolor: "#49a011",
        "&:hover": { bgcolor: "#49a011" },
        borderRadius: 1,
        padding: "8px",
      }}
    >
      <PersonIcon sx={{ color: "white", fontSize: 24 }} />
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
