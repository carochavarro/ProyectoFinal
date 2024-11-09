import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FilterBar from '../../../Components/FilterBar/FilterBar';
import BitacoraCard from '../../../Components/BitacoraCard/BitacoraCard';
import { Snackbar } from '@mui/material';  // Importamos el componente Snackbar
import './AdminHome.css';

const AdminHome = ({ userRole }) => {
    const [bitacoras, setBitacoras] = useState([]);
    const [filteredBitacoras, setFilteredBitacoras] = useState([]);
    const [sortOrder, setSortOrder] = useState('recientes');
    const [searchText, setSearchText] = useState('');
    const [filters, setFilters] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false); // Estado para manejar la visibilidad del Snackbar

    // Fetch de bitácoras cada 5 segundos
    useEffect(() => {
        fetchBitacoras();
        const interval = setInterval(fetchBitacoras, 5000);
        return () => clearInterval(interval);
    }, []);

    // Actualiza la lista de bitácoras filtradas y ordenadas
    useEffect(() => {
        const sortedAndFiltered = filterAndSortBitacoras(bitacoras, searchText, sortOrder, filters);
        setFilteredBitacoras(sortedAndFiltered);
    }, [sortOrder, bitacoras, searchText, filters]);

    const fetchBitacoras = () => {
        axios.get('https://bachendapi.onrender.com/api/bitacoras')
            .then(response => {
                const newBitacoras = response.data.filter(bitacora => bitacora.estadoActivo);
                
                // Recuperamos el contador de bitácoras desde el localStorage
                const previousBitacoraCount = parseInt(localStorage.getItem('bitacoraCount')) || 0;

                // Verificamos si ha habido un incremento en la cantidad de bitácoras
                if (newBitacoras.length > previousBitacoraCount) {
                    setOpenSnackbar(true); // Mostrar Snackbar de nueva bitácora
                }

                // Actualizamos el número de bitácoras en el localStorage
                localStorage.setItem('bitacoraCount', newBitacoras.length);

                // Actualizamos las bitácoras en el estado
                setBitacoras(newBitacoras);
            })
            .catch(error => console.error('Error al obtener las bitácoras:', error));
    };

    // Maneja el cierre del Snackbar
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    // Filtra y ordena las bitácoras según los criterios dados
    const filterAndSortBitacoras = (bitacorasToFilter, search, order, filters) => {
        const searchLower = search.toLowerCase();

        let filteredBitacoras = bitacorasToFilter.filter(bitacora => {
            const fecha = new Date(bitacora.fechaHoraMuestreo);
            const startDate = filters.startDate ? new Date(filters.startDate) : null;
            const endDate = filters.endDate ? new Date(filters.endDate) : null;

            const inDateRange = (!startDate || fecha >= startDate) && (!endDate || fecha <= endDate);
            const matchesTitle = bitacora.titulo.toLowerCase().includes(searchLower);

            const matchesHabitat = filters.habitat 
                ? bitacora.descripcionHabitat.toLowerCase().includes(filters.habitat.toLowerCase())
                : true;
                
            const matchesClimate = filters.climate 
                ? bitacora.condicionesClimaticas.toLowerCase().includes(filters.climate.toLowerCase())
                : true;
                
            const matchesLocation = filters.location 
                ? (`${bitacora.localizacion.latitud},${bitacora.localizacion.longitud}`).includes(filters.location)
                : true;

            const matchesSpecies = bitacora.especiesRecolectadas.some(especie => 
                especie.nombreComun.toLowerCase().includes(searchLower) || 
                especie.nombreCientifico.toLowerCase().includes(searchLower)
            );

            return inDateRange && matchesTitle && matchesHabitat && matchesClimate && matchesLocation && matchesSpecies;
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

    return (
        <div className="admin-home-container">
            <div className="filter-bar-container">
                <FilterBar 
                    onSortChange={setSortOrder} 
                    onSearchChange={setSearchText} 
                    onFilterChange={setFilters} 
                    userRole={localStorage.getItem('role')}
                />
            </div>
            
            <div className="bitacora-list">
                {filteredBitacoras.length > 0 ? (
                    filteredBitacoras.map((bitacora) => (
                        <BitacoraCard key={bitacora._id} bitacora={bitacora} />
                    ))
                ) : (
                    <p>No se encontraron bitácoras activas.</p>
                )}
            </div>

            {/* Snackbar de notificación de nueva bitácora */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={1000}
                message="¡Nueva bitácora agregada!"
                onClose={handleCloseSnackbar}
            />
        </div>
    );
};

export default AdminHome;
