import React, { useState } from "react";
import {
  TextField,
  Popover,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";

const FilterBarUserManagment = ({ onFilter, onSortChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [sortOrder, setSortOrder] = useState("recientes");

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    onSortChange(event.target.value);
  };

  const handleUserIconClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const menuOpen = Boolean(menuAnchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: 8,
        borderRadius: 8,
        backgroundColor: "grren",
      }}
    >
      {/* Campo de Búsqueda con estilo */}
      <TextField
        variant="outlined"
        placeholder="Buscar bitácoras"
        InputProps={{
          startAdornment: (
            <img
              src="https://cdn-icons-png.flaticon.com/512/3721/3721746.png"
              alt="Buscar"
              style={{ width: 20, marginRight: 8 }}
            />
          ),
        }}
        sx={{
          flexGrow: 1,
          bgcolor: "#EAF2E4",
          color: "#37730D",
          border: "1px solid #9ABF80",
          borderRadius: 1,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "transparent",
            },
            "&:hover fieldset": {
              borderColor: "#438C0F",
            },
          },
        }}
      />

      {/* Botón Crear Usuario */}
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#9ABF80", // Verde similar al estilo
          color: "#FFFFFF",
          padding: "8px 16px",
          borderRadius: 1,
          "&:hover": {
            backgroundColor: "#51A614", // Verde más oscuro en hover
          },
        }}
      >
        Crear usuario
      </Button>

      {/* Iconos de Navegación con estilo */}
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          marginLeft: "auto",
        }}
      >
        <IconButton
          sx={{
            bgcolor: "#9ABF80",
            "&:hover": { bgcolor: "#51A614" },
            borderRadius: 1,
            padding: "8px",
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/25/25694.png"
            alt="Home"
            style={{ width: 24 }}
          />
        </IconButton>
        <IconButton
          onClick={handleUserIconClick}
          sx={{
            bgcolor: "#9ABF80",
            "&:hover": { bgcolor: "#51A614" },
            borderRadius: 1,
            padding: "8px",
          }}
        >
          <img
            src="https://w7.pngwing.com/pngs/722/101/png-transparent-computer-icons-user-profile-circle-abstract-miscellaneous-rim-account-thumbnail.png"
            alt="Perfil"
            style={{ width: 24 }}
          />
        </IconButton>
        <Menu
          anchorEl={menuAnchorEl}
          open={menuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={handleMenuClose}>Cuenta</MenuItem>
          <MenuItem onClick={handleMenuClose}>Cerrar sesión</MenuItem>
          <MenuItem onClick={handleMenuClose}>Gestión Usuarios</MenuItem>
        </Menu>
      </div>

      {/* Popover de Filtros */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={{ padding: 2, maxWidth: 300 }}>
          <Typography variant="h6">Filtros</Typography>
          <Box sx={{ marginTop: 2, }}>
            <Typography variant="body1">Fechas</Typography>
            <TextField

              placeholder="Rango 1"
              size="small"
              fullWidth
              margin="normal"
            />
            <TextField
              placeholder="Rango 2"
              size="small"
              fullWidth
              margin="normal"
            />
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="body1">Hábitat</Typography>
            <TextField
           
             label="habitat"
              placeholder="Escribe hábitat"
              size="small"
              fullWidth
              margin="normal"
            />
          </Box>
          <Box sx={{ marginTop: 2}}>
            <Typography variant="body1">Clima</Typography>
            <TextField
              placeholder="Escribe clima"
              size="small"
              fullWidth
              margin="normal"
            />
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="body1">Ubicación</Typography>
            <TextField
              placeholder="Escribe ubicación"
              size="small"
              fullWidth
              margin="normal"
            />
          </Box>
        </Box>
      </Popover>
    </div>
  );
};

export default FilterBarUserManagment;
