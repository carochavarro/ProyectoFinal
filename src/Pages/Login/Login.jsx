import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

// Componente de alerta personalizado
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login() {
  const [formData, setFormData] = useState({
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
        "https://bachendapi.onrender.com/api/usuarios/login",
        formData
      );
      console.log("Login exitoso:", response.data);

      const { token, Nombre, rol } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("usuario", Nombre);
      localStorage.setItem("role", rol);

      setAlert({
        open: true,
        message: "Login exitoso",
        severity: "success",
      });

      navigate("/home");
    } catch (error) {
      console.error(
        "Error al iniciar sesión:",
        error.response ? error.response.data : error.message
      );
      setAlert({
        open: true,
        message: error.response?.data?.message || "Error al iniciar sesión",
        severity: "error",
      });
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setAlert({ ...alert, open: false });
  };

  const goToRegister = () => {
    navigate("/registro");
  };

  return (
    <Container maxWidth="xs" className="login-container">
      <Box className="login-header"></Box>
      <img
        src="https://i.ibb.co/86vzgdT/Proyecto-Creador-de-logotipos-2.png"
        alt="Logo"
        className="logo"
      />
      <Typography variant="h4" align="center" className="welcome-text">
        NEOGARDEN
      </Typography>
      <Typography variant="body2" align="center" className="subtitle-text">
        Inicie sesión en su cuenta
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
            label="Email"
            placeholder="Email"
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
            type="password"
            placeholder="Password"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Box>
        <Box className="options-box">
      <Link
        href="#"
        variant="body2"
        className="forgot-password"
        sx={{
          color: 'green', // Color verde
          textDecoration: 'none', // Elimina el subrayado por defecto
          '&:hover': {
            color: 'darkgreen', // Cambia de color al pasar el mouse
            textDecoration: 'none', // Asegura que no se subraye al pasar el mouse
          },
        }}
      >
        ¿Has olvidado tu contraseña?
      </Link>
    </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          className="login-button"
          sx={{
            backgroundColor: "#3a7e0d",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#2e5d0a",
            },
          }}
        >
          Login
        </Button>
        <Box className="signup-box">
          <Typography variant="body2">
            ¿No tienes una cuenta?{" "}
            <Link
              onClick={goToRegister}
              className="signup-link"
              style={{ cursor: "pointer", color: "#3a7e0d" }}
            >
              Sign up
            </Link>
          </Typography>
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

export default Login;
