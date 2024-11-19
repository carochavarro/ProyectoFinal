import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Registro.css";

// Componente de alerta personalizado
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Registro() {
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    email: "",
    contraseña: "",
  });

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://bachendapi.onrender.com/api/usuarios/register",
        formData
      );
      console.log("Registro exitoso:", response.data);
      setAlert({
        open: true,
        message: "Registro exitoso",
        severity: "success",
      });
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error(
        "Error al registrar:",
        error.response ? error.response.data : error.message
      );
      setAlert({
        open: true,
        message:
          error.response?.data?.message || "Error al registrar el usuario",
        severity: "error",
      });
    }
  };

  const handleBack = () => {
    navigate("/login");
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setAlert({ ...alert, open: false });
  };

  return (
    <Container maxWidth="xs" className="register-container">
      <Box className="register-header">
        <IconButton
          className="back-button"
          onClick={handleBack}
          sx={{
            marginTop: 2, // Ajusta el valor del margen superior (puedes cambiar 2 por cualquier valor que desees)
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <img
          src="https://i.ibb.co/86vzgdT/Proyecto-Creador-de-logotipos-2.png"
          alt="Logo"
          className="logo"
        />
      </Box>
      <Typography variant="h4" align="center" className="register-text">
        Registro
      </Typography>
      <Typography variant="body2" align="center" className="subtitle-text">
        Crea tu nueva cuenta
      </Typography>
      <Box
        component="form"
        noValidate
        className="form-box"
        onSubmit={handleSubmit}
      >
        <Box className="input-box">
          <PersonIcon color="action" className="input-icon" />
          <TextField
            fullWidth
            variant="outlined"
            label="Nombre completo"
            placeholder="Nombre completo"
            name="nombreCompleto"
            value={formData.nombreCompleto}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Box>
        <Box className="input-box">
          <EmailIcon color="action" className="input-icon" />
          <TextField
            fullWidth
            variant="outlined"
            label="Email"
            placeholder="user@mail.com"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Box>
        <Box className="input-box">
          <LockIcon color="action" className="input-icon" />
          <TextField
            fullWidth
            variant="outlined"
            label="Contraseña"
            placeholder="contraseña"
            type="password"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          className="register-button"
          sx={{
            backgroundColor: "#3a7e0d",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#2e5d0a",
            },
          }}
        >
          Registrarme
        </Button>

        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 2, color: "#9e9e9e" }}
        >
          Or continue with
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
          <IconButton sx={{ color: "#1877F2" }}>
            <FacebookIcon />
          </IconButton>
          <IconButton sx={{ color: "#DB4437" }}>
            <GoogleIcon />
          </IconButton>
        </Box>
      </Box>

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Registro;
