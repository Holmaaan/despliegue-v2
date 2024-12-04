import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, TextField, Grid, Card, CardContent, CardActions, CardMedia, Divider, Modal, Box as MBox } from '@mui/material';
import axios from 'axios';
import Sidebar from '../components/SideBar';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', image: '', quantity: '', price: '' });
    const [editingProduct, setEditingProduct] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error al recuperar productos:', error);
            }
        };

        fetchProducts();
    }, [products]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingProduct) {
                await axios.put(`http://localhost:5000/api/products/${editingProduct.id}`, newProduct);
                setEditingProduct(null);
                Swal.fire('Producto actualizado', 'El producto se ha actualizado correctamente.', 'success');
            } else {
                await axios.post('http://localhost:5000/api/products', newProduct);
                Swal.fire('Producto agregado', 'El producto se ha agregado correctamente.', 'success');
            }
            setNewProduct({ name: '', image: '', quantity: '', price: '' });
            setOpenModal(false);
        } catch (error) {
            console.error('Error al agregar/editar producto:', error);
            Swal.fire('Error', 'Hubo un error al agregar o actualizar el producto.', 'error');
        }
    };

    const handleEdit = (product) => {
        setNewProduct(product);
        setEditingProduct(product);
        setOpenModal(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`);
            const response = await axios.get('http://localhost:5000/api/products');
            setProducts(response.data);
            Swal.fire('Producto eliminado', 'El producto se ha eliminado correctamente.', 'success');
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            Swal.fire('Error', 'Hubo un error al eliminar el producto.', 'error');
        }
    };

    const columns = [
        {
            name: 'Imagen',
            selector: (row) => row.image,
            cell: (row) => <img src={row.image} alt={row.name} style={{ width: 80, height: 80, objectFit: 'cover' }} />,
            sortable: true,
        },
        {
            name: 'Nombre',
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: 'Cantidad',
            selector: (row) => row.quantity,
            sortable: true,
        },
        {
            name: 'Precio',
            selector: (row) => row.price,
            sortable: true,
        },
        {
            name: 'Acciones',
            cell: (row) => (
                <div>
                    <Button
                        size="small"
                        variant="outlined"
                        color="primary"
                        onClick={() => handleEdit(row)}
                    >
                        Editar
                    </Button>
                    <Button
                        size="small"
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDelete(row.id)}
                    >
                        Eliminar
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Gestión de Productos
                </Typography>
                <Button variant="contained" color="primary" onClick={() => setOpenModal(true)} sx={{ marginBottom: '20px' }}>
                    Agregar Nuevo Producto
                </Button>

                <DataTable
                    title="Lista de Productos"
                    columns={columns}
                    data={products}
                    pagination
                    highlightOnHover
                    striped
                />

                {/* Modal para agregar o editar productos */}
                <Modal open={openModal} onClose={() => setOpenModal(false)}>
                    <MBox
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: 'white',
                            padding: 4,
                            borderRadius: 1,
                            boxShadow: 24,
                            width: 400,
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            {editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}
                        </Typography>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <TextField
                                name="name"
                                label="Nombre del Producto"
                                placeholder="Ej. Gorra deportiva"
                                value={newProduct.name}
                                onChange={handleInputChange}
                                fullWidth
                                required
                            />
                            <TextField
                                name="image"
                                label="URL de la Imagen"
                                placeholder="Ej. http://imagen.com/foto.jpg"
                                value={newProduct.image}
                                onChange={handleInputChange}
                                fullWidth
                                required
                            />
                            <TextField
                                name="quantity"
                                label="Cantidad"
                                type="number"
                                value={newProduct.quantity}
                                onChange={handleInputChange}
                                fullWidth
                                required
                            />
                            <TextField
                                name="price"
                                label="Precio"
                                type="number"
                                value={newProduct.price}
                                onChange={handleInputChange}
                                fullWidth
                                required
                            />
                            <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '16px' }}>
                                {editingProduct ? 'Actualizar Producto' : 'Agregar Producto'}
                            </Button>
                        </form>
                    </MBox>
                </Modal>
            </Box>
        </Box>
    );
};

export default ProductsPage;
