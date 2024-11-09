import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  Box
} from '@mui/material';
import FilterBarUsuario from '../../Components/FilterBarUsuario/FilterBarUsuario';

const Panel = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://bachendapi.onrender.com/api/usuarios', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        alert('Hubo un error al cargar los usuarios');
      }
    };

    fetchUsuarios();
  }, []);

  const actualizarEstado = async (id, nuevoEstado) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `https://bachendapi.onrender.com/api/usuarios/${id}/estado`,
        { estado: nuevoEstado },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      alert('Estado actualizado correctamente');
      window.location.reload();
    } catch (error) {
      console.error('Error al actualizar el estado:', error);
      alert('Hubo un error al actualizar el estado');
    }
  };

  const actualizarRol = async (id, nuevoRol) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `https://bachendapi.onrender.com/api/usuarios/${id}/rol`,
        { rol: nuevoRol },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      alert('Rol actualizado correctamente');
      window.location.reload();
    } catch (error) {
      console.error('Error al actualizar el rol:', error);
      alert('Hubo un error al actualizar el rol');
    }
  };

  const handleSearchChange = (searchValue) => {
    setSearchText(searchValue.toLowerCase());
  };

  const handleCreateUser = () => {
    alert("Funcionalidad para crear usuario aún no implementada.");
  };

  const filteredUsuarios = usuarios.filter(usuario =>
    usuario.nombreCompleto.toLowerCase().includes(searchText)
  );

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <FilterBarUsuario onSearchChange={handleSearchChange} onCreateUser={handleCreateUser} />

      <TableContainer component={Paper} sx={{ width: '100%', marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre Completo</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsuarios.map(usuario => (
              <TableRow key={usuario._id}>
                <TableCell>{usuario.nombreCompleto}</TableCell>
                <TableCell>{usuario.email}</TableCell>
                <TableCell>{usuario.estado ? 'Activo' : 'Deshabilitado'}</TableCell>
                <TableCell>{usuario.rol}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color={usuario.estado ? 'secondary' : 'primary'}
                    onClick={() => actualizarEstado(usuario._id, !usuario.estado)}
                  >
                    {usuario.estado ? 'Deshabilitar' : 'Activar'}
                  </Button>
                  <Select
                    value={usuario.rol}
                    onChange={(e) => actualizarRol(usuario._id, e.target.value)}
                    sx={{ marginLeft: 1 }}
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
    </Box>
  );
};

export default Panel;
