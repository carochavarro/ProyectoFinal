import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import { PersonOff, Person } from "@mui/icons-material"; // Íconos de deshabilitar y habilitar
import FilterBarUsuario from "../../Components/FilterBarUsuario/FilterBarUsuario";
import "./Panel.css";

const Panel = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://bachendapi.onrender.com/api/usuarios",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsuarios(response.data);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        alert("Hubo un error al cargar los usuarios");
      }
    };

    fetchUsuarios();
  }, []);

  const actualizarEstado = async (id, nuevoEstado) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://bachendapi.onrender.com/api/usuarios/${id}/estado`,
        { estado: nuevoEstado },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Estado actualizado correctamente");
      window.location.reload();
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
      alert("Hubo un error al actualizar el estado");
    }
  };

  const actualizarRol = async (id, nuevoRol) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://bachendapi.onrender.com/api/usuarios/${id}/rol`,
        { rol: nuevoRol },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Rol actualizado correctamente");
      window.location.reload();
    } catch (error) {
      console.error("Error al actualizar el rol:", error);
      alert("Hubo un error al actualizar el rol");
    }
  };

  const handleSearchChange = (searchValue) => {
    setSearchText(searchValue.toLowerCase());
  };

  const filteredUsuarios = usuarios.filter((usuario) =>
    usuario.nombreCompleto.toLowerCase().includes(searchText)
  );
  const handleCreateUser = () => {
    alert("Funcionalidad para crear usuario aún no implementada.");
  };
  

  return (
    <div className="panel-container">
      <div className="filter-bar-container-panel">
        <FilterBarUsuario
          onSearchChange={handleSearchChange}
          onCreateUser={handleCreateUser}
        />
      </div>
      <div className="table-users">
      <TableContainer
        component={Paper}
        className="table-container"
        style={{ overflowX: "auto" }} // Asegura que el contenido sea desplazable horizontalmente
      >
        <Table stickyHeader aria-label="sticky table"> {/* Añadido stickyHeader para mejorar UX en móviles */}
          <TableHead>
            <TableRow>
              <TableCell>Nombre Completo</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Cambiar Estado</TableCell>
              <TableCell>Cambiar Rol</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsuarios.map((usuario) => (
              <TableRow key={usuario._id}>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  {usuario.nombreCompleto}
                </TableCell>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  {usuario.email}
                </TableCell>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  {usuario.estado ? "Activo" : "Deshabilitado"}
                </TableCell>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  {usuario.rol}
                </TableCell>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  <IconButton
                    onClick={() =>
                      actualizarEstado(usuario._id, !usuario.estado)
                    }
                    className="icon-button"
                    style={{
                      color: usuario.estado ? "#FF0000" : "#51A614",
                      fontSize: "1.5rem",
                    }}
                  >
                    {usuario.estado ? <PersonOff /> : <Person />}
                  </IconButton>
                </TableCell>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  <Select
                    value={usuario.rol}
                    onChange={(e) => actualizarRol(usuario._id, e.target.value)}
                    sx={{ marginLeft: 1, minWidth: 120 }} // Añade minWidth para asegurar que sea manejable
                  >
                    <MenuItem value="Colaborador">Colaborador</MenuItem>
                    <MenuItem value="Administrador">Administrador</MenuItem>
                    <MenuItem value="Investigador">Investigador</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    </div>
  );
};

export default Panel;
