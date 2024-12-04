import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, AppBar, Toolbar, TextField, Container, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Sidebar from '../components/SideBar'; // Asegúrate de que el componente Sidebar esté correctamente implementado y configurado
import DataTable from 'react-data-table-component'; // Importa la librería de DataTable
import { Edit, Delete } from '@mui/icons-material'; // Íconos para editar y eliminar
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert2'; // Importar SweetAlert2

const UsersPage = () => {
    const [users, setUsers] = useState([]); // Usuarios visibles
    const [allUsers, setAllUsers] = useState([]); // Todos los usuarios, sin filtrar
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer');
    const [editingUserId, setEditingUserId] = useState(null);
    const [openModal, setOpenModal] = useState(false); // Estado para abrir/cerrar el modal
    const navigate = useNavigate();

    // Obtener usuarios
    const fetchUsers = async () => {
        const response = await fetch('http://localhost:5000/api/users');
        const data = await response.json();
        setUsers(data);  // Guardamos los usuarios filtrados
        setAllUsers(data);  // Guardamos todos los usuarios para restaurar la lista completa
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Agregar o actualizar usuario
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingUserId) {
            await fetch(`http://localhost:5000/api/users/${editingUserId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, role }),
            });
        } else {
            await fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, role }),
            });
        }
        setUsername('');
        setPassword('');
        setRole('customer');
        setEditingUserId(null);
        setOpenModal(false); // Cerrar el modal después de agregar/editar
        fetchUsers(); // Actualizar la lista de usuarios
    };

    // Editar usuario
    const handleEdit = (user) => {
        setUsername(user.username);
        setPassword(user.password);
        setRole(user.role);
        setEditingUserId(user.id);
        setOpenModal(true); // Abrir el modal de edición
    };

    // Eliminar usuario con confirmación
    const handleDelete = async (id) => {
        const result = await swal.fire({
            title: '¿Estás seguro?',
            text: '¡No podrás revertir esta acción!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo',
        });

        if (result.isConfirmed) {
            await fetch(`http://localhost:5000/api/users/${id}`, { method: 'DELETE' });
            fetchUsers(); // Actualizar la lista de usuarios
            swal.fire('¡Eliminado!', 'El usuario ha sido eliminado.', 'success');
        }
    };

    // Definir las columnas de la tabla de usuarios
    const columns = [
        {
            name: 'Usuario',
            selector: (row) => row.username,
            sortable: true,
        },
        {
            name: 'Rol',
            selector: (row) => row.role,
            sortable: true,
        },
        {
            name: 'Acciones',
            cell: (row) => (
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Button
                        variant="outlined"
                        startIcon={<Edit />}
                        onClick={() => handleEdit(row)}
                    >
                        Editar
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<Delete />}
                        onClick={() => handleDelete(row.id)}
                    >
                        Eliminar
                    </Button>
                </Box>
            ),
        },
    ];

    // Función para manejar el filtro
    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        if (value === '') {
            setUsers(allUsers); // Si el filtro está vacío, mostramos todos los usuarios
        } else {
            const filteredUsers = allUsers.filter((user) =>
                user.username.toLowerCase().includes(value)
            );
            setUsers(filteredUsers); // Solo mostramos los usuarios filtrados
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            Gestión de Usuarios
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Container sx={{ mt: 2 }}>
                    <Typography variant="h4" gutterBottom>
                        Gestión de Usuarios
                    </Typography>

                    {/* Botón para agregar un usuario */}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setOpenModal(true)}
                        sx={{ mb: 2 }}
                    >
                        Agregar Usuario
                    </Button>

                    {/* Tabla de usuarios con filtros y acciones */}
                    <DataTable
                        columns={columns}
                        data={users}
                        pagination
                        highlightOnHover
                        responsive
                        selectableRows
                        subHeader
                        subHeaderComponent={
                            <TextField
                                placeholder="Buscar usuario"
                                onChange={handleSearch}
                            />
                        }
                    />

                    {/* Modal para agregar/editar usuario */}
                    <Dialog open={openModal} onClose={() => setOpenModal(false)}>
                        <DialogTitle>{editingUserId ? 'Editar Usuario' : 'Agregar Usuario'}</DialogTitle>
                        <DialogContent>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Nombre de Usuario"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    fullWidth
                                    required
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    label="Contraseña"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    fullWidth
                                    required
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    label="Rol"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    select
                                    fullWidth
                                    SelectProps={{
                                        native: true,
                                    }}
                                    sx={{ mb: 2 }}
                                >
                                    <option value="customer">Cliente</option>
                                    <option value="employee">Empleado</option>
                                    <option value="admin">Administrador</option>
                                </TextField>
                                <DialogActions>
                                    <Button onClick={() => setOpenModal(false)} color="primary">
                                        Cancelar
                                    </Button>
                                    <Button type="submit" color="primary">
                                        {editingUserId ? 'Actualizar Usuario' : 'Agregar Usuario'}
                                    </Button>
                                </DialogActions>
                            </form>
                        </DialogContent>
                    </Dialog>
                </Container>
            </Box>
        </Box>
    );
};

export default UsersPage;
