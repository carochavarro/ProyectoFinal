// src/components/BitacoraCard/BitacoraCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BitacoraCard.css';

const BitacoraCard = ({ bitacora }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/bitacora/${bitacora._id}`);
  };

  return (
    <div className="bitacora-card" onClick={handleClick}>
      <div className="bitacora-content">
        <h3 className="subtitulo-verde" id='titulo'>{bitacora.titulo}</h3>
      </div>
      <div className="bitacora-image">
        <img src={bitacora.imageUrls && bitacora.imageUrls.length > 0 ? bitacora.imageUrls[0] : 'https://via.placeholder.com/100'} alt={bitacora.titulo} />
      </div>
      <div className="bitacora-content">
        <p><span className="subtitulo-verde">Fecha:</span> {new Date(bitacora.fechaHoraMuestreo).toLocaleDateString()}</p>
        <p><span className="subtitulo-verde">Ubicación:</span> Lat {bitacora.localizacion.latitud}, Lng {bitacora.localizacion.longitud}</p>
        <p><span className="subtitulo-verde">Clima:</span> {bitacora.condicionesClimaticas}</p>
        <p><span className="subtitulo-verde">Hábitat:</span> {bitacora.descripcionHabitat}</p>
        <p><span className="subtitulo-verde">Autor:</span> {bitacora.Autor}</p>
      </div>
    </div>
  );
};

export default BitacoraCard;
