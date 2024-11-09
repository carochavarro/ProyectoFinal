import React, { useState, useEffect } from 'react';
import {
    TextField,
    Popover,
    Typography,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Select,
    Button,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';
import { useLocation, useNavigate } from 'react-router-dom';

const FilterBar = ({ onSortChange, onSearchChange, userRole, onFilterChange }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [sortOrder, setSortOrder] = useState('recientes');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [habitat, setHabitat] = useState('');
    const [climate, setClimate] = useState('');
    const [location, setLocation] = useState('');

    const locationData = useLocation();
    const navigate = useNavigate();

    const [isLoadingRoles, setIsLoadingRoles] = useState(true);
    const [storedRole, setStoredRole] = useState(localStorage.getItem('role'));

    useEffect(() => {
        setStoredRole(localStorage.getItem('role'));
        setIsLoadingRoles(false);
    }, []);

    const isRoleAllowed = (requiredRole) => {
        return storedRole === requiredRole || storedRole === 'Administrador';
    };

    const handleFilterClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
        onSortChange(event.target.value);
    };
    const handleUserIconClick = (event) => setMenuAnchorEl(event.currentTarget);
    const handleMenuClose = () => setMenuAnchorEl(null);

    const applyFilters = () => {
        onFilterChange({ startDate, endDate, habitat, climate, location });
        handleClose();
    };

    const clearFilters = () => {
        setStartDate(null);
        setEndDate(null);
        setHabitat('');
        setClimate('');
        setLocation('');
        onFilterChange({ startDate: null, endDate: null, habitat: '', climate: '', location: '' });
    };

    const open = Boolean(anchorEl);
    const menuOpen = Boolean(menuAnchorEl);
    const id = open ? 'simple-popover' : undefined;

    const isDetailView = locationData.pathname.includes('/bitacora/');

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 8, borderRadius: 8, backgroundColor: '#EAF2E4' }}>
            {!isDetailView && (
                <>
                    <IconButton
                        onClick={handleFilterClick}
                        sx={{
                            bgcolor: '#3a7e0d',
                            '&:hover': { bgcolor: '#51A614' },
                            borderRadius: 1,
                            padding: '8px',
                        }}
                    >
                        <img src="https://cdn.icon-icons.com/icons2/1660/PNG/512/3844475-filter-filters_110342.png" alt="Filtro" style={{ width: 24 }} />
                    </IconButton>

                    <TextField
                        variant="outlined"
                        placeholder="Buscar bitácoras"
                        onChange={onSearchChange}
                        InputProps={{
                            startAdornment: (
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/3721/3721746.png"
                                    alt="Buscar"
                                    style={{ width: 20, marginRight: 8 }}
                                />
                            ),
                        }}
                        sx={{
                            flexGrow: 1,
                            bgcolor: '#EAF2E4',
                            color: '#3a7e0d',
                            border: '1px solid #9ABF80',
                            borderRadius: 1,
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'transparent',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#3a7e0d',
                                },
                            },
                        }}
                    />

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Typography variant="body1" sx={{ color: '#3a7e0d' }}>Ordenar por:</Typography>
                        <Select
                            value={sortOrder}
                            onChange={handleSortChange}
                            sx={{
                                minWidth: 120,
                                bgcolor: '#EAF2E4',
                                color: '#3a7e0d',
                                borderRadius: 1,
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#9ABF80',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#438C0F',
                                },
                                '& .MuiSvgIcon-root': {
                                    color: '#37730D',
                                },
                                '& .MuiSelect-select': {
                                    padding: '8px 16px',
                                }
                            }}
                        >
                            <MenuItem value="recientes">Recientes</MenuItem>
                            <MenuItem value="antiguas">Antiguas</MenuItem>
                            <MenuItem value="lugar">Lugar</MenuItem>
                        </Select>
                    </div>
                </>
            )}

            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginLeft: 'auto' }}>
                <IconButton
                    sx={{
                        bgcolor: '#3a7e0d',
                        '&:hover': { bgcolor: '#51A614' },
                        borderRadius: 1,
                        padding: '8px',
                    }}
                    onClick={() => navigate('/adminhome')}
                >
                    <img src="https://cdn-icons-png.flaticon.com/512/25/25694.png" alt="Home" style={{ width: 24 }} />
                </IconButton>
                <IconButton
                    onClick={handleUserIconClick}
                    sx={{
                        bgcolor: '#3a7e0d',
                        '&:hover': { bgcolor: '#51A614' },
                        borderRadius: 1,
                        padding: '8px',
                    }}
                >
                    <img src="https://w7.pngwing.com/pngs/722/101/png-transparent-computer-icons-user-profile-circle-abstract-miscellaneous-rim-account-thumbnail.png" alt="Perfil" style={{ width: 24 }} />
                </IconButton>
                <Menu
                    anchorEl={menuAnchorEl}
                    open={menuOpen}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    {userRole === 'Colaborador' && [
                        <MenuItem key="logout" onClick={handleMenuClose}>Cerrar sesión</MenuItem>
                    ]}
                    {userRole === 'Investigador' && [
                        <MenuItem key="account" onClick={handleMenuClose}>Cuenta</MenuItem>,
                        <MenuItem key="logout" onClick={handleMenuClose}>Cerrar sesión</MenuItem>
                    ]}
                    {userRole === 'Administrador' && [
                        <MenuItem key="manage-users" onClick={handleMenuClose}>Gestión Usuarios</MenuItem>,
                        <MenuItem key="logout" onClick={handleMenuClose}>Cerrar sesión</MenuItem>
                    ]}
                </Menu>

            </div>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Box sx={{ padding: 2, maxWidth: 300 }}>
                    <Typography variant="h6">Filtros</Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
                        <Box sx={{ marginTop: 2 }}>
                            <Typography variant="body1">Fecha de inicio</Typography>
                            <DatePicker
                                label="Fecha inicio"
                                value={startDate}
                                onChange={(newValue) => setStartDate(newValue)}
                                inputFormat="dd/MM/yyyy"
                                renderInput={(params) => <TextField {...params} size="small" fullWidth margin="normal" />}
                            />
                        </Box>
                        <Box sx={{ marginTop: 2 }}>
                            <Typography variant="body1">Fecha de fin</Typography>
                            <DatePicker
                                label="Fecha fin"
                                value={endDate}
                                onChange={(newValue) => setEndDate(newValue)}
                                inputFormat="dd/MM/yyyy"
                                renderInput={(params) => <TextField {...params} size="small" fullWidth margin="normal" />}
                            />
                        </Box>
                    </LocalizationProvider>

                    <Box sx={{ marginTop: 2 }}>
                        <Typography variant="body1">Hábitat</Typography>
                        <TextField
                            placeholder="Escribe hábitat"
                            size="small"
                            fullWidth
                            margin="normal"
                            value={habitat}
                            onChange={(e) => setHabitat(e.target.value)}
                        />
                    </Box>

                    <Box sx={{ marginTop: 2 }}>
                        <Typography variant="body1">Clima</Typography>
                        <TextField
                            placeholder="Escribe clima"
                            size="small"
                            fullWidth
                            margin="normal"
                            value={climate}
                            onChange={(e) => setClimate(e.target.value)}
                        />
                    </Box>

                    <Box sx={{ marginTop: 2 }}>
                        <Typography variant="body1">Lugar</Typography>
                        <TextField
                            placeholder="Escribe lugar"
                            size="small"
                            fullWidth
                            margin="normal"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                        <Button onClick={clearFilters} sx={{ color: '#9ABF80' }}>
                            Limpiar
                        </Button>
                        <Button onClick={applyFilters} variant="contained" sx={{ bgcolor: '#3a7e0d', '&:hover': { bgcolor: '#51A614' } }}>
                            Aplicar
                        </Button>
                    </Box>
                </Box>
            </Popover>
        </div>
    );
};

export default FilterBar;
