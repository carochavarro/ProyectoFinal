// src/pages/BitacoraForm/BitacoraForm.jsx
import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Grid } from '@mui/material';
import './BitacoraForm.css';

const BitacoraForm = () => {
    const [formData, setFormData] = useState({
        titulo: '',
        fecha: '',
        hora: '',
        nombreCientifico: '',
        nombreComun: '',
        familia: '',
        estadoPlanta: '',
        cantidadMuestras: '',
        localizacion: '',
        detallesEspecies: '',
        condicionesClimaticas: '',
        observaciones: '',
        descripcionHabitat: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos del formulario:", formData);
        // Lógica para enviar los datos a la API o guardar
    };

    return (
        <Box className="bitacora-form-container">
            <Typography variant="h4" align="center" gutterBottom>
                Crear/editar bitácora
            </Typography>

            <Box className="image-placeholder">
                Imagen de la planta, flor, etc y del lugar
            </Box>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} className="form-section">
                    <Grid item xs={12}>
                        <TextField
                            label="Título de la bitácora"
                            name="titulo"
                            fullWidth
                            value={formData.titulo}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Fecha"
                            name="fecha"
                            fullWidth
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={formData.fecha}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Hora"
                            name="hora"
                            fullWidth
                            type="time"
                            InputLabelProps={{ shrink: true }}
                            value={formData.hora}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Nombre científico"
                            name="nombreCientifico"
                            fullWidth
                            value={formData.nombreCientifico}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Nombre común"
                            name="nombreComun"
                            fullWidth
                            value={formData.nombreComun}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Familia/Especie"
                            name="familia"
                            fullWidth
                            value={formData.familia}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Estado de la planta"
                            name="estadoPlanta"
                            fullWidth
                            value={formData.estadoPlanta}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Cantidad de muestras"
                            name="cantidadMuestras"
                            fullWidth
                            value={formData.cantidadMuestras}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>

                <Typography variant="h6" className="section-title" gutterBottom>
                    Detalles
                </Typography>

                <Grid container spacing={2} className="form-section">
                    <Grid item xs={12}>
                        <TextField
                            label="Localización geográfica del muestreo"
                            name="localizacion"
                            fullWidth
                            value={formData.localizacion}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Detalles de las especies recolectadas"
                            name="detallesEspecies"
                            fullWidth
                            value={formData.detallesEspecies}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Condiciones climáticas durante el muestreo"
                            name="condicionesClimaticas"
                            fullWidth
                            value={formData.condicionesClimaticas}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Observaciones adicionales"
                            name="observaciones"
                            fullWidth
                            value={formData.observaciones}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Descripción del hábitat"
                            name="descripcionHabitat"
                            fullWidth
                            value={formData.descripcionHabitat}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
                    <Button variant="contained" color="primary" type="submit" sx={{ bgcolor: '#4CAF50' }}>
                        Guardar
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default BitacoraForm;
