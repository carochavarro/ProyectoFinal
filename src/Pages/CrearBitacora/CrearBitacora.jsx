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
import esLocale from 'date-fns/locale/es';
import axios from 'axios'; // Importar axios
import './CrearBitacora.css';

function CrearBitacora() {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [localizacion, setLocalizacion] = useState({ latitud: '', longitud: '' });
  const [condicionesClimaticas, setCondicionesClimaticas] = useState('');
  const [descripcionHabitat, setDescripcionHabitat] = useState('');
  const [observacionesAdicionales, setObservacionesAdicionales] = useState('');
  const [especie, setEspecie] = useState({
    nombreCientifico: '',
    nombreComun: '',
    familia: '',
    cantidadMuestras: '',
    estadoPlanta: ''
  });

  const isMobile = window.innerWidth < 768;

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

  const handleSubmit = async () => {
    const fechaHoraMuestreo = new Date(
      selectedDate.setHours(selectedTime.getHours(), selectedTime.getMinutes())
    );

    const data = {
      titulo: title,
      fechaHoraMuestreo,
      localizacion: {
        latitud: parseFloat(localizacion.latitud),
        longitud: parseFloat(localizacion.longitud)
      },
      condicionesClimaticas,
      descripcionHabitat,
      especiesRecolectadas: [especie],
      observacionesAdicionales,
      estadoActivo: true
    };

    try {
      const response = await axios.post('https://bachendapi.onrender.com/api/bitacoras/', data);
      console.log('Bitácora guardada:', response.data);
      alert('Bitácora guardada exitosamente');
    } catch (error) {
      console.error('Error al guardar la bitácora:', error);
      alert('Error al guardar la bitácora');
    }
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
          capture={isMobile ? 'environment' : undefined}
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

        <TextField
          label="Latitud"
          fullWidth
          margin="normal"
          value={localizacion.latitud}
          onChange={(e) => setLocalizacion({ ...localizacion, latitud: e.target.value })}
          className="input-box"
        />
        <TextField
          label="Longitud"
          fullWidth
          margin="normal"
          value={localizacion.longitud}
          onChange={(e) => setLocalizacion({ ...localizacion, longitud: e.target.value })}
          className="input-box"
        />
        <TextField
          label="Condiciones Climáticas"
          fullWidth
          margin="normal"
          value={condicionesClimaticas}
          onChange={(e) => setCondicionesClimaticas(e.target.value)}
          className="input-box"
        />
        <TextField
          label="Descripción del Hábitat"
          fullWidth
          margin="normal"
          value={descripcionHabitat}
          onChange={(e) => setDescripcionHabitat(e.target.value)}
          className="input-box"
        />
        <TextField
          label="Nombre Científico"
          fullWidth
          margin="normal"
          value={especie.nombreCientifico}
          onChange={(e) => setEspecie({ ...especie, nombreCientifico: e.target.value })}
          className="input-box"
        />
        <TextField
          label="Nombre Común"
          fullWidth
          margin="normal"
          value={especie.nombreComun}
          onChange={(e) => setEspecie({ ...especie, nombreComun: e.target.value })}
          className="input-box"
        />
        <TextField
          label="Familia"
          fullWidth
          margin="normal"
          value={especie.familia}
          onChange={(e) => setEspecie({ ...especie, familia: e.target.value })}
          className="input-box"
        />
        <TextField
          label="Cantidad de Muestras"
          fullWidth
          margin="normal"
          type="number"
          value={especie.cantidadMuestras}
          onChange={(e) => setEspecie({ ...especie, cantidadMuestras: e.target.value })}
          className="input-box"
        />
        <TextField
          label="Estado de la Planta"
          fullWidth
          margin="normal"
          value={especie.estadoPlanta}
          onChange={(e) => setEspecie({ ...especie, estadoPlanta: e.target.value })}
          className="input-box"
        />
        <TextField
          label="Observaciones Adicionales"
          fullWidth
          margin="normal"
          value={observacionesAdicionales}
          onChange={(e) => setObservacionesAdicionales(e.target.value)}
          className="input-box"
        />
      </Box>

      <Box className="save-button-container">
        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          onClick={handleSubmit}
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
