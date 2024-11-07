// src/pages/UserManagement/UserManagement.jsx
import React, { useState } from 'react';
import FilterBarUserManagment from '../../Components/FilterBarUserManagment/FilterBarUserManagment';
import './UserManagement.css';

const UserManagement = () => {
    const [sortOrder, setSortOrder] = useState('nameAsc');

    const handleSortChange = (order) => {
        setSortOrder(order);
        // Aquí puedes añadir la función para ordenar usuarios en el futuro
    };

    return (
        <div className="user-management-container">
            <div className="filter-bar-container">
                <FilterBarUserManagment onSortChange={handleSortChange} />
            </div>
            <div className="user-list">
                <p>La funcionalidad para mostrar usuarios estará disponible pronto.</p>
            </div>
        </div>
    );
};

export default UserManagement;
