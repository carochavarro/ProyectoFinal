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
    const [searchText, setSearchText] = useState('');
    const [sortOrder, setSortOrder] = useState('recientes');
    const [filters, setFilters] = useState({});
    const [usuario, setUsuario] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsuario = localStorage.getItem('usuario');
        if (storedUsuario) {
            setUsuario(storedUsuario);
        } else {
            alert('No has iniciado sesión. Por favor, inicia sesión.');
            navigate('/');
        }
    }, [navigate]);

    useEffect(() => {
        if (usuario) {
            fetchBitacoras();
        }
    }, [usuario]);

    const fetchBitacoras = async () => {
        try {
            const response = await axios.get('https://bachendapi.onrender.com/api/bitacoras');
            const activeBitacoras = response.data.filter(
                (bitacora) => bitacora.estadoActivo && bitacora.Autor === usuario
            );
            setBitacoras(activeBitacoras);
        } catch (error) {
            console.error('Error al obtener las bitácoras:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.put(`https://bachendapi.onrender.com/api/bitacoras/${id}`, { estadoActivo: false });
            setBitacoras((prevBitacoras) => prevBitacoras.filter((bitacora) => bitacora._id !== id));
            alert('Bitácora eliminada correctamente');
        } catch (error) {
            console.error('Error al eliminar la bitácora:', error);
        }
    };

    const filterAndSortBitacoras = () => {
        const searchLower = searchText.toLowerCase();
        let filteredBitacoras = bitacoras.filter((bitacora) => {
            const tituloLower = bitacora.titulo.toLowerCase();
            const autorLower = bitacora.Autor.toLowerCase();
            const matchesTitleOrAuthor = tituloLower.includes(searchLower) || autorLower.includes(searchLower);

            const fecha = new Date(bitacora.fechaHoraMuestreo);
            const startDate = filters.startDate ? new Date(filters.startDate) : null;
            const endDate = filters.endDate ? new Date(filters.endDate) : null;
            const inDateRange = (!startDate || fecha >= startDate) && (!endDate || fecha <= endDate);

            return inDateRange && matchesTitleOrAuthor;
        });

        switch (sortOrder) {
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

    return (
                <div className="cuentas-container">
            <div className="filter-bar-container">
                <FilterBar
                    onSortChange={setSortOrder}
                    onSearchChange={(e) => setSearchText(e.target.value)}
                    onFilterChange={setFilters}
                />
            </div>

            {/* Nombre del usuario siempre visible */}
            <div className="user-name-banner">
                <h2>Nombre del usuario: {usuario}</h2>
            </div>

            {/* Lista de bitácoras */}
            <div className="bitacora-list">
                {filterAndSortBitacoras().length > 0 ? (
                    filterAndSortBitacoras().map((bitacora) => (
                        <div key={bitacora._id} className="bitacora-card-container">
                            <BitacoraCard
                                bitacora={bitacora}
                                showEditDeleteOptions={true}
                            />
                            <div className="edit-delete-icons">
                                <IconButton
                                    color="success"
                                    aria-label="Editar bitácora"
                                    onClick={() => navigate(`/editar-bitacora/${bitacora._id}`)}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    color="error"
                                    aria-label="Eliminar bitácora"
                                    onClick={() => handleDelete(bitacora._id)}
                                >
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
