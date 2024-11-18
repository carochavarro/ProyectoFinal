import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import axios from "axios";
import "./EditarBitacora.css";
import { useParams, useNavigate } from "react-router-dom";
import { uploadImages } from "../../FireBase/Service";
import dayjs from "dayjs";

function EditarBitacora() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bitacora, setBitacora] = useState(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://bachendapi.onrender.com/api/bitacoras/${id}`)
      .then((response) => {
        const data = response.data;
        setBitacora({
          ...data,
          fechaHoraMuestreo: dayjs(data.fechaHoraMuestreo),
          horaMuestreo: dayjs(data.fechaHoraMuestreo),
        });
        setImages(data.imageUrls || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar los datos:", error);
        setError(
          "No se pudo cargar la bitácora. Inténtalo de nuevo más tarde."
        );
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
      const fechaCompleta = dayjs(bitacora.fechaHoraMuestreo)
        .hour(bitacora.horaMuestreo.hour())
        .minute(bitacora.horaMuestreo.minute());

      let imageUrls = bitacora.imageUrls || [];
      if (imageFiles.length > 0) {
        imageUrls = await uploadImages(imageFiles);
      }

      const updatedBitacora = {
        ...bitacora,
        fechaHoraMuestreo: fechaCompleta.toISOString(),
        imageUrls,
      };

      await axios.put(
        `https://bachendapi.onrender.com/api/bitacoras/${id}`,
        updatedBitacora
      );
      alert("Bitácora actualizada exitosamente");
      navigate(-1);
    } catch (error) {
      console.error("Error al actualizar la bitácora:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div className="container-edit">
      <Container maxWidth="sm" className="bitacora-container-edit">
        <Box className="bitacora-header-edit">
          <IconButton onClick={() => navigate(-1)} className="back-button-edit">
            <ArrowBackIosNewIcon />
          </IconButton>
          <Typography variant="h4" className="title-text-edit">
            Editar Bitácora
          </Typography>
        </Box>

        <TextField
          className="input-box-edit"
          variant="outlined"
          label="Título de la bitácora"
          fullWidth
          value={bitacora?.titulo || ""}
          onChange={(e) => setBitacora({ ...bitacora, titulo: e.target.value })}
          margin="normal"
        />

        <Box className="image-upload-container-edit">
          <Box className="image-gallery-edit">
            {images.map((image, index) => (
              <div key={index} className="image-wrapper-edit">
                <img
                  src={image}
                  alt={`Imagen ${index + 1}`}
                  className="bitacora-image-edit"
                />
                <IconButton
                  onClick={() => handleDeleteImage(index)}
                  color="error" // Esto aplica el color rojo al ícono
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}
          </Box>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="upload-button"
            type="file"
            multiple
            onChange={handleImageChange}
          />
          <label htmlFor="upload-button" className="upload-label-edit">
            <Box className="upload-box-edit">
              <IconButton color="primary" component="span">
                <PhotoCamera className="upload-icon-edit" />
              </IconButton>
              <Typography variant="body2" className="upload-text-edit">
                Agregar imagen
              </Typography>
            </Box>
          </label>
        </Box>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box className="date-time-container-edit" margin="normal">
            <DatePicker
              className="input-box-edit"
              label="Fecha del muestreo"
              value={bitacora?.fechaHoraMuestreo || null}
              onChange={(newDate) =>
                setBitacora({ ...bitacora, fechaHoraMuestreo: newDate })
              }
              slotProps={{ textField: { fullWidth: true } }}
            />
            <TimePicker
              className="input-box-edit"
              label="Hora del muestreo"
              value={bitacora?.horaMuestreo || null}
              onChange={(newTime) =>
                setBitacora({ ...bitacora, horaMuestreo: newTime })
              }
              slotProps={{ textField: { fullWidth: true } }}
            />
          </Box>
        </LocalizationProvider>

        <Box className="bitacora-fields-edit" margin="normal">
          <TextField
            className="input-box-edit"
            variant="outlined"
            label="Latitud"
            fullWidth
            value={bitacora?.localizacion?.latitud || ""}
            onChange={(e) =>
              setBitacora({
                ...bitacora,
                localizacion: {
                  ...bitacora.localizacion,
                  latitud: e.target.value,
                },
              })
            }
          />
          <TextField
            className="input-box-edit"
            variant="outlined"
            label="Longitud"
            fullWidth
            value={bitacora?.localizacion?.longitud || ""}
            onChange={(e) =>
              setBitacora({
                ...bitacora,
                localizacion: {
                  ...bitacora.localizacion,
                  longitud: e.target.value,
                },
              })
            }
          />
          <TextField
            className="input-box-edit"
            variant="outlined"
            label="Condiciones Climáticas"
            fullWidth
            value={bitacora?.condicionesClimaticas || ""}
            onChange={(e) =>
              setBitacora({
                ...bitacora,
                condicionesClimaticas: e.target.value,
              })
            }
          />
          <TextField
            className="input-box-edit"
            variant="outlined"
            label="Descripción del Hábitat"
            fullWidth
            multiline
            rows={4}
            value={bitacora?.descripcionHabitat || ""}
            onChange={(e) =>
              setBitacora({ ...bitacora, descripcionHabitat: e.target.value })
            }
          />
          <TextField
            className="input-box-edit"
            variant="outlined"
            label="Observaciones Adicionales"
            fullWidth
            multiline
            rows={4}
            value={bitacora?.observacionesAdicionales || ""}
            onChange={(e) =>
              setBitacora({
                ...bitacora,
                observacionesAdicionales: e.target.value,
              })
            }
          />

          <Typography variant="h6">Especie Recolectada</Typography>
          <TextField
            className="input-box-edit"
            variant="outlined"
            label="Nombre Científico"
            fullWidth
            value={bitacora?.especiesRecolectadas?.[0]?.nombreCientifico || ""}
            onChange={(e) =>
              setBitacora({
                ...bitacora,
                especiesRecolectadas: [
                  {
                    ...bitacora.especiesRecolectadas[0],
                    nombreCientifico: e.target.value,
                  },
                ],
              })
            }
          />
          <TextField
            className="input-box-edit"
            variant="outlined"
            label="Nombre Común"
            fullWidth
            value={bitacora?.especiesRecolectadas?.[0]?.nombreComun || ""}
            onChange={(e) =>
              setBitacora({
                ...bitacora,
                especiesRecolectadas: [
                  {
                    ...bitacora.especiesRecolectadas[0],
                    nombreComun: e.target.value,
                  },
                ],
              })
            }
          />
          <TextField
            className="input-box-edit"
            variant="outlined"
            label="Familia"
            fullWidth
            value={bitacora?.especiesRecolectadas?.[0]?.familia || ""}
            onChange={(e) =>
              setBitacora({
                ...bitacora,
                especiesRecolectadas: [
                  {
                    ...bitacora.especiesRecolectadas[0],
                    familia: e.target.value,
                  },
                ],
              })
            }
          />
          <TextField
            className="input-box-edit"
            variant="outlined"
            label="Cantidad de Muestras"
            fullWidth
            type="number"
            value={bitacora?.especiesRecolectadas?.[0]?.cantidadMuestras || ""}
            onChange={(e) =>
              setBitacora({
                ...bitacora,
                especiesRecolectadas: [
                  {
                    ...bitacora.especiesRecolectadas[0],
                    cantidadMuestras: e.target.value,
                  },
                ],
              })
            }
          />
          <TextField
            className="input-box-edit"
            variant="outlined"
            label="Estado de la Planta"
            fullWidth
            value={bitacora?.especiesRecolectadas?.[0]?.estadoPlanta || ""}
            onChange={(e) =>
              setBitacora({
                ...bitacora,
                especiesRecolectadas: [
                  {
                    ...bitacora.especiesRecolectadas[0],
                    estadoPlanta: e.target.value,
                  },
                ],
              })
            }
          />
        </Box>

        <Box className="save-button-container-edit">
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            className="save-button-edit"
            sx={{
              backgroundColor: '#3a7e0d',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#2e5d0a',
              },
            }}
          >
            Guardar Cambios
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default EditarBitacora;
