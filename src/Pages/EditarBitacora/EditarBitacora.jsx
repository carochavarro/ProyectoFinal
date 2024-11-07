// src/pages/EditarBitacora/EditarBitacora.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useParams, useNavigate } from 'react-router-dom';
import esLocale from 'date-fns/locale/es';
import axios from 'axios';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import './EditarBitacora.css';

const EditarBitacora = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bitacora, setBitacora] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Cargar la bitácora existente desde la API
    const fetchBitacora = async () => {
      try {
        const response = await axios.get(`https://bachendapi.onrender.com/api/bitacoras/${id}`);
        setBitacora(response.data);
        setLoading(false);
      } catch (error) {
        setError("No se pudo cargar la bitácora para edición.");
        setLoading(false);
      }
    };
    fetchBitacora();
  }, [id]);

  const handleChange = (field, value) => {
    setBitacora(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await axios.put(`https://bachendapi.onrender.com/api/bitacoras/${id}`, bitacora);
      alert("Bitácora actualizada con éxito.");
      navigate(`/bitacora/${id}`);
    } catch (error) {
      alert("Error al actualizar la bitácora. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <p>{error}</p>;

  return (
    <Container maxWidth="sm" className="bitacora-container">
      <Box className="bitacora-header">
        <IconButton className="back-button" onClick={() => navigate(-1)}>
          <ArrowBackIosNewIcon />
        </IconButton>
      </Box>
      <Typography variant="h4" align="center" className="title-text">
        Editar Bitácora
      </Typography>
      
      <TextField
        label="Título de la bitácora"
        fullWidth
        value={bitacora.titulo}
        onChange={(e) => handleChange('titulo', e.target.value)}
        margin="normal"
      />

      <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
        <Box className="bitacora-fields">
          <DatePicker
            label="Fecha del muestreo"
            value={bitacora.fechaHoraMuestreo ? new Date(bitacora.fechaHoraMuestreo) : null}
            onChange={(newValue) => handleChange('fechaHoraMuestreo', newValue)}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
          />
          <TimePicker
            label="Hora del muestreo"
            value={bitacora.fechaHoraMuestreo ? new Date(bitacora.fechaHoraMuestreo) : null}
            onChange={(newValue) => handleChange('fechaHoraMuestreo', newValue)}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
          />
        </Box>
      </LocalizationProvider>

      <TextField
        label="Latitud"
        fullWidth
        value={bitacora.localizacion.latitud}
        onChange={(e) => handleChange('localizacion', { ...bitacora.localizacion, latitud: e.target.value })}
        margin="normal"
      />

      <TextField
        label="Longitud"
        fullWidth
        value={bitacora.localizacion.longitud}
        onChange={(e) => handleChange('localizacion', { ...bitacora.localizacion, longitud: e.target.value })}
        margin="normal"
      />

      <TextField
        label="Condiciones Climáticas"
        fullWidth
        value={bitacora.condicionesClimaticas}
        onChange={(e) => handleChange('condicionesClimaticas', e.target.value)}
        margin="normal"
      />

      <TextField
        label="Descripción del Hábitat"
        fullWidth
        multiline
        rows={4}
        value={bitacora.descripcionHabitat}
        onChange={(e) => handleChange('descripcionHabitat', e.target.value)}
        margin="normal"
      />

      <TextField
        label="Observaciones Adicionales"
        fullWidth
        multiline
        rows={4}
        value={bitacora.observacionesAdicionales}
        onChange={(e) => handleChange('observacionesAdicionales', e.target.value)}
        margin="normal"
      />

      {/* Guardar Cambios */}
      <Box className="save-button-container">
        <Button
          variant="contained"
          color="primary"
          startIcon={isLoading ? <CircularProgress size={20} /> : <SaveIcon />}
          onClick={handleSubmit}
          className="save-button"
          sx={{
            backgroundColor: '#3a7e0d',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#2e5d0a',
            },
          }}
          disabled={isLoading}
        >
          {isLoading ? 'Guardando...' : 'Guardar Cambios'}
        </Button>
      </Box>
    </Container>
  );
};

export default EditarBitacora;
