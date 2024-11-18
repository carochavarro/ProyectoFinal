import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FilterBar from '../../Components/FilterBar/FilterBar';
import BitacoraCard from '../../Components/BitacoraCard/BitacoraCard';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './Cuentas.css';

const Cuentas = () => {
    const [bitacoras, setBitacoras] = useState([]);
    const [filteredBitacoras, setFilteredBitacoras] = useState([]);
    const [sortOrder, setSortOrder] = useState('recientes');
    const [searchText, setSearchText] = useState('');
    const [filters, setFilters] = useState({});
    const [usuario, setUsuario] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const Usuario = localStorage.getItem('usuario');

        if (Usuario) {
            setUsuario(Usuario); // Establece el nombre del usuario desde localStorage
        } else {
            alert('No has iniciado sesión. Por favor, inicia sesión.');
            navigate('/'); // Redirige a la página de login
        }
    }, [navigate]);

    useEffect(() => {
        fetchBitacoras();
    }, []);

    useEffect(() => {
        const sortedAndFiltered = filterAndSortBitacoras(bitacoras, searchText, sortOrder, filters);
        setFilteredBitacoras(sortedAndFiltered);
    }, [sortOrder, bitacoras, searchText, filters]);

    const fetchBitacoras = () => {
        axios.get('https://bachendapi.onrender.com/api/bitacoras')
            .then(response => {
                const activeBitacoras = response.data.filter(bitacora => bitacora.estadoActivo && bitacora.Autor === usuario);
                setBitacoras(activeBitacoras);
            })
            .catch(error => console.error('Error al obtener las bitácoras:', error));
    };

    const filterAndSortBitacoras = (bitacorasToFilter, search, order, filters) => {
        const searchLower = search.toLowerCase();
        const usuario = localStorage.getItem('usuario');
        let filteredBitacoras = bitacorasToFilter.filter(bitacora => {
            const fecha = new Date(bitacora.fechaHoraMuestreo);
            const startDate = filters.startDate ? new Date(filters.startDate) : null;
            const endDate = filters.endDate ? new Date(filters.endDate) : null;
            const inDateRange = (!startDate || fecha >= startDate) && (!endDate || fecha <= endDate);
            const matchesTitle = bitacora.titulo.toLowerCase().includes(searchLower);
            const matchesHabitat = bitacora.descripcionHabitat.toLowerCase().includes(searchLower);
            const matchesClimate = bitacora.condicionesClimaticas.toLowerCase().includes(searchLower);
            const matchesLocation = (`${bitacora.localizacion.latitud},${bitacora.localizacion.longitud}`).includes(searchLower);
            const matchesSpecies = bitacora.especiesRecolectadas.some(especie =>
                especie.nombreComun.toLowerCase().includes(searchLower) ||
                especie.nombreCientifico.toLowerCase().includes(searchLower)
            );
            return inDateRange && (searchLower === '' || matchesTitle || matchesHabitat || matchesClimate || matchesLocation || matchesSpecies);
        });

        switch (order) {
            case 'recientes':
                filteredBitacoras.sort((a, b) => new Date(b.fechaHoraMuestreo) - new Date(a.fechaHoraMuestreo));
                break;
            case 'antiguas':
                filteredBitacoras.sort((a, b) => new Date(a.fechaHoraMuestreo) - new Date(b.fechaHoraMuestreo));
                break;
            case 'lugar':
                filteredBitacoras.sort((a, b) => a.localizacion.latitud - b.localizacion.latitud);
                break;
            default:
                break;
        }

        return filteredBitacoras;
    };

    const handleEdit = (id) => {
        navigate(`/editar-bitacora/${id}`);
    };

    return (
                <div className="cuentas-container">
            <div className="filter-bar-container">
                <FilterBar
                    onSortChange={setSortOrder}
                    onSearchChange={(e) => setSearchText(e.target.value)}
                    onFilterChange={setFilters}
                />
            </div>

            <div className="user-name-banner">
                <h2>Nombre del usuario: {usuario}</h2>
            </div>

            <div className="bitacora-list">
                {filteredBitacoras.length > 0 ? (
                    filteredBitacoras.map((bitacora) => (
                        <div key={bitacora._id} className="bitacora-card-container">
                            <BitacoraCard
                                bitacora={bitacora}
                                showEditDeleteOptions={true}
                            />
                            <div className="edit-delete-icons">
                                <IconButton color="success" aria-label="Editar bitácora" onClick={() => handleEdit(bitacora._id)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton color="error" aria-label="Eliminar bitácora">
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No Cuenta con bitacoras.</p>
                )}
            </div>
        </div>
    );
};

export default Cuentas;
