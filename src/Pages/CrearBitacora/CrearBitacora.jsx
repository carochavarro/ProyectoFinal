import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import UploadFile from '@mui/icons-material/UploadFile';
import SaveIcon from '@mui/icons-material/Save';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import esLocale from 'date-fns/locale/es'; // para usar el calendario en español
import './CrearBitacora.css';

function CrearBitacora() {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState(null); // estado para la fecha
  const [selectedTime, setSelectedTime] = useState(null); // estado para la hora

  const isMobile = window.innerWidth < 768; // Verifica si es un dispositivo móvil

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleCapture = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  return (
    <Container maxWidth="sm" className="bitacora-container">
      <Typography variant="h4" align="center" className="title-text">
        Crear Bitácora
      </Typography>
      <Box className="bitacora-header">
        <TextField
          variant="outlined"
          label="Título de la bitácora"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-box"
        />
      </Box>

      <Box className="image-upload-container">
        <Box className="image-gallery">
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Imagen ${index + 1}`} className="bitacora-image" />
          ))}
        </Box>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="upload-button"
          type="file"
          multiple
          onChange={isMobile ? handleCapture : handleImageChange}
          capture={isMobile ? 'environment' : undefined} // Activa la cámara en móviles
        />
        <label htmlFor="upload-button" className="upload-label">
          <Box className="upload-box">
            <IconButton color="primary" component="span">
              {isMobile ? <PhotoCamera className="upload-icon" /> : <UploadFile className="upload-icon" />}
            </IconButton>
            <Typography variant="body2" className="upload-text">Agregar imagen</Typography>
          </Box>
        </label>
      </Box>

      <Box className="bitacora-fields">
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
          <DatePicker
            label="Fecha"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" className="input-box" />}
          />
          <TimePicker
            label="Hora"
            value={selectedTime}
            onChange={(newValue) => setSelectedTime(newValue)}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" className="input-box" />}
          />
        </LocalizationProvider>

        {/* Otros campos de la bitácora */}
        {['Nombre científico', 'Nombre común', 'Familia/Especie', 'Estado de la planta (viva, seca, etc.)', 'Cantidad de muestras'].map((label, index) => (
          <TextField
            key={index}
            label={label}
            variant="outlined"
            fullWidth
            margin="normal"
            className="input-box"
          />
        ))}
      </Box>

      <Box className="bitacora-details">
        <Typography variant="h6" className="details-title">Detalles</Typography>
        {['Localización geográfica del muestreo (coordenadas GPS)', 'Detalles de las especies recolectadas', 'Condiciones climáticas durante el muestreo', 'Observaciones adicionales', 'Descripción del hábitat (tipo de vegetación, altitud, etc.)'].map((label, index) => (
          <TextField
            key={index + 7}
            label={label}
            variant="outlined"
            fullWidth
            margin="normal"
            className="input-box"
          />
        ))}
      </Box>

      <Box className="save-button-container">
        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          className="save-button"
          sx={{
            backgroundColor: '#3a7e0d',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#2e5d0a',
            },
          }}
        >
          Guardar
        </Button>
      </Box>
    </Container>
  );
}

export default CrearBitacora;
