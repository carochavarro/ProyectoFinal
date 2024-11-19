import React, { useState } from "react";
import {
  TextField,
  Popover,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useLocation, useNavigate } from "react-router-dom";
import "./FilterBar.css";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";

const FilterBar = ({ onSortChange, onSearchChange, onFilterChange, userRole }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [sortOrder, setSortOrder] = useState("recientes");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [habitat, setHabitat] = useState("");
  const [climate, setClimate] = useState("");
  const [location, setLocation] = useState("");

  const locationData = useLocation();
  const navigate = useNavigate();

  const handleFilterClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    onSortChange(event.target.value);
  };
  const handleUserIconClick = (event) => setMenuAnchorEl(event.currentTarget);
  const handleMenuClose = () => setMenuAnchorEl(null);

  const applyFilters = () => {
    onFilterChange({ startDate, endDate, habitat, climate, location });
    handleClose();
  };

  const clearFilters = () => {
    setStartDate(null);
    setEndDate(null);
    setHabitat("");
    setClimate("");
    setLocation("");
    onFilterChange({
      startDate: null,
      endDate: null,
      habitat: "",
      climate: "",
      location: "",
    });
    handleClose(); // Cierra el desplegable de filtros.
  };

  const open = Boolean(anchorEl);
  const menuOpen = Boolean(menuAnchorEl);
  const id = open ? "simple-popover" : undefined;

  const isDetailView = locationData.pathname.includes("/bitacora/");

  return (
    <div className="filter-bar"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: 8,
        borderRadius: 8,
      }}
    >
      {!isDetailView && (
        <>
          <IconButton
            onClick={handleFilterClick}
            sx={{
              bgcolor: "#3a7e0d",
              "&:hover": { bgcolor: "#3a7e0d" },
              borderRadius: 1,
              padding: "8px",
            }}
          >
            <img
              src="https://cdn.icon-icons.com/icons2/1660/PNG/512/3844475-filter-filters_110342.png"
              alt="Filtro"
              style={{ width: 25, filter: "invert(1)" }}
            />
          </IconButton>

          <TextField className="buscar"
            variant="outlined"
            placeholder="Buscar bitácoras por título o autor"
            onChange={onSearchChange}
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
              bgcolor: "white",
              color: "#3a7e0d",
              borderRadius: 1,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "transparent",
                },
                "&:hover fieldset": {
                  borderColor: "#3a7e0d", // Verde al pasar el cursor
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#3a7e0d", // Verde cuando está enfocado
                },
              },
            }}
          />

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Typography variant="body1" sx={{ color: "white" }}>
              Ordenar por:
            </Typography>
            <Select
              value={sortOrder}
              onChange={handleSortChange}
              sx={{
                minWidth: 120,
                bgcolor: "white",
                borderRadius: 1,
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#9ABF80", // Borde por defecto
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#438C0F", // Borde al pasar el cursor
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#3a7e0d", // Borde verde al estar enfocado
                },
                "& .MuiSvgIcon-root": {
                  color: "#3a7e0d",
                },
                "& .MuiSelect-select": {
                  padding: "8px 16px",
                },
              }}
            >
              <MenuItem value="recientes">Recientes</MenuItem>
              <MenuItem value="antiguas">Antiguas</MenuItem>
              <MenuItem value="lugar">Lugar</MenuItem>
            </Select>
          </div>
        </>
      )}

      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          marginLeft: "auto",
        }}
      >
        {userRole==='Investigador'&&[
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/crear-bitacora")}
          sx={{
            bgcolor: "#49a011",
            "&:hover": { bgcolor: "#49a011" },
            borderRadius: 1,
            padding: "8px 16px",
          }}
        >
          Crear Bitácora
        </Button>
     ]}
        <IconButton
          sx={{
            bgcolor: "#3a7e0d",
            "&:hover": { bgcolor: "#3a7e0d" },
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
            bgcolor: "#3a7e0d",
            "&:hover": { bgcolor: "#3a7e0d" },
            borderRadius: 1,
            padding: "8px",
          }}
        >
          <PersonIcon sx={{ color: "white", fontSize: 24 }} />
        </IconButton>

        <Menu
          anchorEl={menuAnchorEl}
          open={menuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >{[userRole==='Administrador'&&
          <MenuItem
            onClick={() => {
              navigate("/panel");
              handleMenuClose();
            }}
          >
            Gestión Usuarios
          </MenuItem>
          ]}
          {[userRole==='Investigador'&&
          <MenuItem
            onClick={() => {
              navigate("/cuentas");
              handleMenuClose();
            }}
          >
            Cuenta
          </MenuItem>
          ]}
          <MenuItem
            onClick={() => {
              navigate("/login");
              handleMenuClose();
            }}
          >
            Cerrar sesión
          </MenuItem>
        </Menu>
      </div>

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
          <Typography variant="h6" color="#3a7e0d">
            Filtros
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ marginTop: 2 }}>
              <DatePicker
                className="input-box"
                label="Fecha inicio"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                renderInput={(params) => (
                  <TextField {...params} size="small" fullWidth margin="normal" />
                )}
              />
            </Box>
            <Box sx={{ marginTop: 2 }}>
              <DatePicker
                className="input-box"
                label="Fecha fin"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                renderInput={(params) => (
                  <TextField {...params} size="small" fullWidth margin="normal" />
                )}
              />
            </Box>
          </LocalizationProvider>

          <Box sx={{ marginTop: 2 }}>
            <TextField
              className="input-box"
              placeholder="Escribe hábitat"
              size="small"
              fullWidth
              margin="normal"
              value={habitat}
              onChange={(e) => setHabitat(e.target.value)}
            />
          </Box>

          <Box sx={{ marginTop: 2 }}>
            <TextField
              className="input-box"
              placeholder="Escribe clima"
              size="small"
              fullWidth
              margin="normal"
              value={climate}
              onChange={(e) => setClimate(e.target.value)}
            />
          </Box>

          <Box sx={{ marginTop: 2 }}>
            <TextField
              className="input-box"
              placeholder="Escribe lugar"
              size="small"
              fullWidth
              margin="normal"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 2,
            }}
          >
            <Button
              onClick={clearFilters}
              variant="contained"
              sx={{ bgcolor: "gray", "&:hover": { bgcolor: "#d9d9d9" } }}
            >
              Limpiar
            </Button>
            <Button
              onClick={applyFilters}
              variant="contained"
              sx={{ bgcolor: "#49a011", "&:hover": { bgcolor: "#51A614" } }}
            >
              Aplicar
            </Button>
          </Box>
        </Box>
      </Popover>
    </div>
  );
};

export default FilterBar;
