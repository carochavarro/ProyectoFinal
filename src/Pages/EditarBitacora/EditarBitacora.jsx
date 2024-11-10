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
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import esLocale from 'date-fns/locale/es';
import axios from 'axios';
import './EditarBitacora.css';
import { useParams, useNavigate } from 'react-router-dom';
import { uploadImages } from '../../FireBase/Service';

function EditarBitacora() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bitacora, setBitacora] = useState(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Obtener los datos de la bitácora desde la API
    axios.get(`https://bachendapi.onrender.com/api/bitacoras/${id}`)
      .then((response) => {
        const data = response.data;
        setBitacora({
          ...data,
          fechaHoraMuestreo: new Date(data.fechaHoraMuestreo),
          horaMuestreo: new Date(data.fechaHoraMuestreo),
        });
        setImages(data.imageUrls);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al cargar los datos:', error);
        setError('No se pudo cargar la bitácora. Inténtalo de nuevo más tarde.');
        setLoading(false);
      });
  }, [id]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prevFiles) => [...prevFiles, ...files]);

    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleDeleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!bitacora) return;

    setLoading(true);
    try {
      const fechaCompleta = new Date(
        bitacora.fechaHoraMuestreo.getFullYear(),
        bitacora.fechaHoraMuestreo.getMonth(),
        bitacora.fechaHoraMuestreo.getDate(),
        bitacora.horaMuestreo.getHours(),
        bitacora.horaMuestreo.getMinutes()
      );

      let imageUrls = bitacora.imageUrls;
      if (imageFiles.length > 0) {
        imageUrls = await uploadImages(imageFiles);
      }

      const updatedBitacora = { ...bitacora, fechaHoraMuestreo: fechaCompleta, imageUrls };

      await axios.put(`https://bachendapi.onrender.com/api/bitacoras/${id}`, updatedBitacora);
      alert('Bitácora actualizada exitosamente');
      navigate(-1);
    } catch (error) {
      console.error('Error al actualizar la bitácora:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="sm" className="bitacora-container">
      <Box className="bitacora-header">
        <IconButton onClick={() => navigate(-1)} className="back-button">
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography variant="h4" className="title-text">Editar Bitácora</Typography>
      </Box>

      <TextField
        variant="outlined"
        label="Título de la bitácora"
        fullWidth
        value={bitacora.titulo}
        onChange={(e) => setBitacora({ ...bitacora, titulo: e.target.value })}
        className="input-box"
        margin="normal"
      />

      <Box className="image-upload-container">
        <Box className="image-gallery">
          {images.map((image, index) => (
            <div key={index} className="image-wrapper">
              <img src={image} alt={`Imagen ${index + 1}`} className="bitacora-image" />
              <IconButton onClick={() => handleDeleteImage(index)} color="secondary">
                Eliminar
              </IconButton>
            </div>
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
              <PhotoCamera className="upload-icon" />
            </IconButton>
            <Typography variant="body2" className="upload-text">Agregar imagen</Typography>
          </Box>
        </label>
      </Box>

      <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
        <Box className="date-time-container" margin="normal">
          <DatePicker
            label="Fecha del muestreo"
            value={bitacora.fechaHoraMuestreo}
            onChange={(newDate) => setBitacora({ ...bitacora, fechaHoraMuestreo: newDate })}
            renderInput={(params) => <TextField {...params} fullWidth />}
            className="input-box"
          />
          <TimePicker
            label="Hora del muestreo"
            value={bitacora.horaMuestreo}
            onChange={(newTime) => setBitacora({ ...bitacora, horaMuestreo: newTime })}
            renderInput={(params) => <TextField {...params} fullWidth />}
            className="input-box"
          />
        </Box>
      </LocalizationProvider>

      <Box className="bitacora-fields" margin="normal">
        <TextField variant="outlined" label="Latitud" fullWidth value={bitacora.localizacion.latitud} onChange={(e) => setBitacora({ ...bitacora, localizacion: { ...bitacora.localizacion, latitud: e.target.value } })} />
        <TextField variant="outlined" label="Longitud" fullWidth value={bitacora.localizacion.longitud} onChange={(e) => setBitacora({ ...bitacora, localizacion: { ...bitacora.localizacion, longitud: e.target.value } })} />
        <TextField variant="outlined" label="Condiciones Climáticas" fullWidth value={bitacora.condicionesClimaticas} onChange={(e) => setBitacora({ ...bitacora, condicionesClimaticas: e.target.value })} />
        <TextField variant="outlined" label="Descripción del Hábitat" fullWidth multiline rows={4} value={bitacora.descripcionHabitat} onChange={(e) => setBitacora({ ...bitacora, descripcionHabitat: e.target.value })} />
        <TextField variant="outlined" label="Observaciones Adicionales" fullWidth multiline rows={4} value={bitacora.observacionesAdicionales} onChange={(e) => setBitacora({ ...bitacora, observacionesAdicionales: e.target.value })} />
        
        <Typography variant="h6">Especie Recolectada</Typography>
        <TextField variant="outlined" label="Nombre Científico" fullWidth value={bitacora.especiesRecolectadas[0].nombreCientifico} onChange={(e) => setBitacora({ ...bitacora, especiesRecolectadas: [{ ...bitacora.especiesRecolectadas[0], nombreCientifico: e.target.value }] })} />
        <TextField variant="outlined" label="Nombre Común" fullWidth value={bitacora.especiesRecolectadas[0].nombreComun} onChange={(e) => setBitacora({ ...bitacora, especiesRecolectadas: [{ ...bitacora.especiesRecolectadas[0], nombreComun: e.target.value }] })} />
        <TextField variant="outlined" label="Familia" fullWidth value={bitacora.especiesRecolectadas[0].familia} onChange={(e) => setBitacora({ ...bitacora, especiesRecolectadas: [{ ...bitacora.especiesRecolectadas[0], familia: e.target.value }] })} />
        <TextField variant="outlined" label="Cantidad de Muestras" fullWidth type="number" value={bitacora.especiesRecolectadas[0].cantidadMuestras} onChange={(e) => setBitacora({ ...bitacora, especiesRecolectadas: [{ ...bitacora.especiesRecolectadas[0], cantidadMuestras: e.target.value }] })} />
        <TextField variant="outlined" label="Estado de la Planta" fullWidth value={bitacora.especiesRecolectadas[0].estadoPlanta} onChange={(e) => setBitacora({ ...bitacora, especiesRecolectadas: [{ ...bitacora.especiesRecolectadas[0], estadoPlanta: e.target.value }] })} />
      </Box>

      <Box className="save-button-container">
        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          className="save-button"
        >
          Guardar Cambios
        </Button>
      </Box>
    </Container>
  );
}

export default EditarBitacora;
