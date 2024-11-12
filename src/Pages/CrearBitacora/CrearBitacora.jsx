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
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import UploadFile from '@mui/icons-material/UploadFile';
import SaveIcon from '@mui/icons-material/Save';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import esLocale from 'date-fns/locale/es';
import axios from 'axios';
import './CrearBitacora.css';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { uploadImages } from "../../FireBase/Service";

function CrearBitacora() {
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    return () => {
      images.forEach(image => URL.revokeObjectURL(image));
    };
  }, [images]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prevFiles) => [...prevFiles, ...files]);

    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const validateForm = () => {
    if (!title.trim()) {
      alert('Por favor, ingresa el título de la bitácora.');
      return false;
    }
    if (!selectedDate || !selectedTime) {
      alert('Por favor, selecciona la fecha y hora del muestreo.');
      return false;
    }
    if (!localizacion.latitud || !localizacion.longitud) {
      alert('Por favor, ingresa las coordenadas de localización.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);

    try {
      const fechaHoraMuestreo = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        selectedTime.getHours(),
        selectedTime.getMinutes(),
        selectedTime.getSeconds()
      );

      let imageUrls = [];
      if (imageFiles.length > 0) {
        imageUrls = await uploadImages(imageFiles);
      }

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
        estadoActivo: true,
        imageUrls
      };

      const response = await axios.post('https://bachendapi.onrender.com/api/bitacoras/', data);
      console.log('Bitácora guardada:', response.data);
      alert('Bitácora guardada exitosamente');

      setTitle('');
      setSelectedDate(null);
      setSelectedTime(null);
      setLocalizacion({ latitud: '', longitud: '' });
      setCondicionesClimaticas('');
      setDescripcionHabitat('');
      setObservacionesAdicionales('');
      setEspecie({
        nombreCientifico: '',
        nombreComun: '',
        familia: '',
        cantidadMuestras: '',
        estadoPlanta: ''
      });
      setImages([]);
      setImageFiles([]);
    } catch (error) {
      console.error('Error al guardar la bitácora:', error);
      setError('Error al guardar la bitácora. Por favor, inténtalo de nuevo.');
      alert('Error al guardar la bitácora');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" className="bitacora-container">
      <Box className="bitacora-header">
        <IconButton className="back-button">
          <ArrowBackIosNewIcon />
        </IconButton>
      </Box>
      <Typography variant="h4" align="center" className="title-text">
        Crear Bitácora
      </Typography>
      <Box className="bitacora-header">
        <TextField
        color="action"
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
          onChange={handleImageChange}
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

      <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
        <Box className="date-time-container" >
          <DatePicker
            label="Fecha del muestreo"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
            className="input-box"
          />
          <TimePicker
            label="Hora del muestreo"
            value={selectedTime}
            onChange={(newValue) => setSelectedTime(newValue)}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
            className="input-box"
          />
        </Box>
      </LocalizationProvider>

      <Box className="bitacora-fields" >
        <TextField color="action" variant="outlined" label="Latitud" fullWidth value={localizacion.latitud} onChange={(e) => setLocalizacion({ ...localizacion, latitud: e.target.value })} margin="normal" className="input-box" />
        <TextField color="action" variant="outlined" label="Longitud" fullWidth value={localizacion.longitud} onChange={(e) => setLocalizacion({ ...localizacion, longitud: e.target.value })} margin="normal" className="input-box" />
        <TextField color="action" variant="outlined" label="Condiciones Climáticas" fullWidth value={condicionesClimaticas} onChange={(e) => setCondicionesClimaticas(e.target.value)} margin="normal" className="input-box" />
        <TextField color="action" variant="outlined" label="Descripción del Hábitat" fullWidth multiline rows={4} value={descripcionHabitat} onChange={(e) => setDescripcionHabitat(e.target.value)} margin="normal" className="input-box" />
        <TextField color="action" variant="outlined" label="Observaciones Adicionales" fullWidth multiline rows={4} value={observacionesAdicionales} onChange={(e) => setObservacionesAdicionales(e.target.value)} margin="normal" className="input-box" />
        <Box className="especie-fields">
          <Typography variant="h6" color='#397f0e'>Especie Recolectada</Typography>
          <TextField color="action" variant="outlined" label="Nombre Científico" fullWidth value={especie.nombreCientifico} onChange={(e) => setEspecie({ ...especie, nombreCientifico: e.target.value })} margin="normal" className="input-box" />
          <TextField color="action" variant="outlined" label="Nombre Común" fullWidth value={especie.nombreComun} onChange={(e) => setEspecie({ ...especie, nombreComun: e.target.value })} margin="normal" className="input-box" />
          <TextField color="action" variant="outlined" label="Familia" fullWidth value={especie.familia} onChange={(e) => setEspecie({ ...especie, familia: e.target.value })} margin="normal" className="input-box" />
          <TextField color="action" variant="outlined" label="Cantidad de Muestras" fullWidth type="number" value={especie.cantidadMuestras} onChange={(e) => setEspecie({ ...especie, cantidadMuestras: e.target.value })} margin="normal" className="input-box" />
          <TextField color="action" variant="outlined" label="Estado de la Planta" fullWidth value={especie.estadoPlanta} onChange={(e) => setEspecie({ ...especie, estadoPlanta: e.target.value })} margin="normal" className="input-box" />
        </Box>
      </Box>

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
          {isLoading ? 'Guardando...' : 'Guardar'}
        </Button>
      </Box>

      {error && (
        <Box mt={2}>
          <Typography color="error" align="center">
            {error}
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default CrearBitacora;
