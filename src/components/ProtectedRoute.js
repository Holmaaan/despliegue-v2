// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, userRole, requiredRole }) => {
    // Verifica si el rol del usuario coincide con el rol requerido
    if (userRole !== requiredRole) {
        // Si no coincide, redirige a la página de inicio
        return <Navigate to="/" replace />;
    }

    // Si coincide, permite el acceso al contenido de la ruta
    return children;
};

export default ProtectedRoute;
