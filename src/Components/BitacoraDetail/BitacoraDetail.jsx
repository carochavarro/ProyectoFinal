import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress, IconButton } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import FilterBar from "../../Components/FilterBar/FilterBar";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import "./BitacoraDetail.css";

const BitacoraDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bitacora, setBitacora] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://bachendapi.onrender.com/api/bitacoras/${id}`
        );
        setBitacora(response.data);
      } catch (error) {
        console.error("Error al obtener la bitácora:", error);
        setError(
          "No se pudo cargar la bitácora. Por favor, intenta de nuevo más tarde."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <p>{error}</p>;
  if (!bitacora) return <p>No se encontró la bitácora.</p>;

  return (
    <div className="container-details">
      <div className="bitacora-detail-container">
        <FilterBar />
        <div className="detail-content">
          <h1 className="detail-title">{bitacora.titulo}</h1>
          {bitacora.imageUrls && bitacora.imageUrls.length > 1 ? (
            <Carousel>
              {bitacora.imageUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Imagen ${index + 1}`}
                  className="detail-image"
                />
              ))}
            </Carousel>
          ) : (
            <img
              src={
                bitacora.imageUrls
                  ? bitacora.imageUrls[0]
                  : "https://via.placeholder.com/150"
              }
              alt={bitacora.titulo}
              className="detail-image"
            />
          )}
          <p className="detail-text">
            <span className="subtitulo-verde">Fecha:</span>{" "}
            {new Date(bitacora.fechaHoraMuestreo).toLocaleDateString()}
          </p>
          <p className="detail-text">
            <span className="subtitulo-verde">Ubicación:</span> Lat{" "}
            {bitacora.localizacion.latitud}, Lng{" "}
            {bitacora.localizacion.longitud}
          </p>
          <p className="detail-text">
            <span className="subtitulo-verde">Clima:</span>{" "}
            {bitacora.condicionesClimaticas}
          </p>
          <p className="detail-text">
            <span className="subtitulo-verde">Hábitat:</span>{" "}
            {bitacora.descripcionHabitat}
          </p>
          <p className="detail-text">
            <span className="subtitulo-verde">Observaciones:</span>{" "}
            {bitacora.observacionesAdicionales}
          </p>
          {bitacora.especiesRecolectadas &&
            bitacora.especiesRecolectadas.map((especie, idx) => (
              <div key={idx} className="detail-text">
                <span className="subtitulo-verde">Especie {idx + 1}:</span>{" "}
                {especie.nombreComun} ({especie.nombreCientifico})
                <p className="detail-text">
                  <span className="subtitulo-verde">Familia:</span>{" "}
                  {especie.familia}
                </p>
                <p className="detail-text">
                  <span className="subtitulo-verde">
                    Cantidad de muestras:
                  </span>{" "}
                  {especie.cantidadMuestras}
                </p>
                <p className="detail-text">
                  <span className="subtitulo-verde">
                    Estado de la planta:
                  </span>{" "}
                  {especie.estadoPlanta}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BitacoraDetail;
