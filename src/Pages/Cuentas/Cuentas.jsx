// src/pages/Cuentas/Cuentas.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FilterBar from '../../Components/FilterBar/FilterBar';
import { Card, CardContent, Typography, CircularProgress, Box } from '@mui/material';
import './Cuentas.css';

const Cuentas = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      axios.get(`https://bachendapi.onrender.com/api/usuarios/${userId}`)
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error("Error al obtener la información del usuario:", error);
          setError("No se pudo cargar la información del usuario. Por favor, intenta de nuevo más tarde.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError("No se ha encontrado la información del usuario.");
      setLoading(false);
    }
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <p>{error}</p>;

  return (
    <div className="cuentas-container">
      {/* Agregar FilterBar */}
      <FilterBar
        onSortChange={() => {}} // Función vacía para ordenar, puedes personalizar según lo necesario
        onSearchChange={() => {}} // Función vacía para búsqueda, también personalizable
        onFilterChange={() => {}} // Función vacía para filtros
        userRole={user?.rol || 'Colaborador'} // Pasa el rol del usuario si está disponible
      />

      <div className="cuentas-content">
        {user && (
          <Card className="user-card">
            <CardContent>
              <Typography variant="h5" component="div" className="user-name">
                {user.nombreCompleto}
              </Typography>
              <Typography variant="body1" className="user-email">
                {user.email}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Rol: {user.rol}
              </Typography>
            </CardContent>
          </Card>
        )}

        {/* Espacio para las bitácoras creadas por el usuario, en desarrollo */}
        <Box className="future-logs">
          <Typography variant="h6" color="textSecondary">
            Bitácoras creadas por el usuario:
          </Typography>
          <Typography variant="body2" color="textSecondary">
            (Esta sección está en desarrollo)
          </Typography>
        </Box>
      </div>
    </div>
  );
};

export default Cuentas;
