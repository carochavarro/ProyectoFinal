import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  MenuItem,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CrearUsuario.css'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CrearUsuario() {
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    email: '',
    contraseña: '',
    rol: 'Colaborador', // Valor inicial para el rol
  });

  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://bachendapi.onrender.com/api/usuarios', formData);
      console.log("Usuario creado exitosamente:", response.data);
      setAlert({
        open: true,
        message: 'Usuario creado exitosamente',
        severity: 'success'
      });
      setTimeout(() => navigate('/panel'), 2000);
    } catch (error) {
      console.error("Error al crear usuario:", error.response ? error.response.data : error.message);
      setAlert({
        open: true,
        message: error.response?.data?.message || 'Error al crear el usuario',
        severity: 'error'
      });
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setAlert({ ...alert, open: false });
  };

  return (
    <Container maxWidth="xs" className="crear-usuario-container">
      <Typography variant="h4" align="center" sx={{ mt: 4, mb: 2, color: '#397f0e' }}>
        Crear Usuario
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Nombre completo"
          placeholder="Nombre completo"
          name="nombreCompleto"
          value={formData.nombreCompleto}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Email"
          placeholder="user@mail.com"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Contraseña"
          placeholder="contraseña"
          type="password"
          name="contraseña"
          value={formData.contraseña}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          select
          fullWidth
          variant="outlined"
          label="Rol"
          name="rol"
          value={formData.rol}
          onChange={handleChange}
          margin="normal"
        >
          <MenuItem value="Colaborador">Colaborador</MenuItem>
          <MenuItem value="Administrador">Administrador</MenuItem>
          <MenuItem value="Investigador">Investigador</MenuItem>
        </TextField>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2, backgroundColor: '#3a7e0d', color: '#fff', '&:hover': { backgroundColor: '#2e5d0a' } }}
        >
          Crear Usuario
        </Button>
      </Box>

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default CrearUsuario;