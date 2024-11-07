import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FilterBar from '../../../Components/FilterBar/FilterBar';
import BitacoraCard from '../../../Components/BitacoraCard/BitacoraCard';
import './AdminHome.css';

const AdminHome = ({ userRole }) => {
    const [bitacoras, setBitacoras] = useState([]);
    const [filteredBitacoras, setFilteredBitacoras] = useState([]);
    const [sortOrder, setSortOrder] = useState('recientes');
    const [searchText, setSearchText] = useState('');
    const [filters, setFilters] = useState({});
    const [hasNewBitacoras, setHasNewBitacoras] = useState(false); // Nuevo estado para la notificación

    useEffect(() => {
        fetchBitacoras();
        const interval = setInterval(fetchBitacoras, 5000); // Cada 5 segundos
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const sortedAndFiltered = filterAndSortBitacoras(bitacoras, searchText, sortOrder, filters);
        setFilteredBitacoras(sortedAndFiltered);
    }, [sortOrder, bitacoras, searchText, filters]);

    const fetchBitacoras = () => {
        axios.get('https://bachendapi.onrender.com/api/bitacoras')
            .then(response => {
                const newBitacoras = response.data.filter(bitacora => bitacora.estadoActivo);

                // Verificar si hay nuevas bitácoras comparando la longitud y el contenido de las listas
                if (newBitacoras.length > bitacoras.length || !areBitacorasEqual(newBitacoras, bitacoras)) {
                    setHasNewBitacoras(true); // Activar notificación
                }

                setBitacoras(newBitacoras); // Actualizar la lista de bitácoras
            })
            .catch(error => console.error('Error al obtener las bitácoras:', error));
    };

    // Función para comparar si dos listas de bitácoras son iguales
    const areBitacorasEqual = (newList, oldList) => {
        if (newList.length !== oldList.length) return false;
        return newList.every((newBitacora, index) => newBitacora._id === oldList[index]._id);
    };

    const handleSortChange = (order) => setSortOrder(order);

    const handleSearchChange = (e) => setSearchText(e.target.value);

    const handleFilterChange = (newFilters) => setFilters(newFilters);

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
                ? (`${bitacora.localizacion.latitud}`, `${bitacora.localizacion.longitud}`).includes(filters.location)
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
                    onSortChange={handleSortChange} 
                    onSearchChange={handleSearchChange} 
                    onFilterChange={handleFilterChange} 
                    userRole={userRole} 
                />
            </div>
            
            {/* Notificación de nuevas bitácoras */}
            {hasNewBitacoras && (
                <div className="notification-bell" onClick={() => setHasNewBitacoras(false)}>
                    🔔 Tienes nuevas bitácoras
                </div>
            )}

            <div className="bitacora-list">
                {filteredBitacoras.length > 0 ? (
                    filteredBitacoras.map((bitacora) => (
                        <BitacoraCard key={bitacora._id} bitacora={bitacora} />
                    ))
                ) : (
                    <p>No se encontraron bitácoras activas.</p>
                )}
            </div>
        </div>
    );
};

export default AdminHome;