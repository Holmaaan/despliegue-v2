import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/NavBar';
import Carousel from './components/Carousel';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import AdminPage from './pages/AdminPage';
import EmployeePage from './pages/EmployeePage';
import ProtectedRoute from './components/ProtectedRoute';
import UsersPage from './pages/UsersPage';
import ProductsPage from './pages/ProductsPage';
import OrdersPage from './pages/OrdersPage'; // Asegúrate de tener este componente
import Productos from './pages/Productos';
import ProductosDetail from './pages/Productosdetail';
import AcercaDe from './pages/acercade';
import PoliticaPrivacidad from './pages/PoliticaPrivacidad';
import Terminos from './pages/Terminos';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import Orden from './pages/Orden';

function App() {
  const [userRole, setUserRole] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const logout = () => {
    setUserRole(null);
  };

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent
            userRole={userRole}
            setUserRole={setUserRole}
            setIsAuthModalOpen={setIsAuthModalOpen}
            logout={logout}
            isAuthModalOpen={isAuthModalOpen}
          />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

function AppContent({ userRole, setUserRole, setIsAuthModalOpen, logout, isAuthModalOpen }) {
  const location = useLocation();

  return (
    <>
      {userRole === null && (
        <>
          <Navbar setUserRole={setUserRole} setIsAuthModalOpen={setIsAuthModalOpen} />
          {location.pathname === '/' && <Carousel />}
        </>
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute userRole={userRole} requiredRole="admin">
              <AdminPage logout={logout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee"
          element={
            <ProtectedRoute userRole={userRole} requiredRole="employee">
              <EmployeePage logout={logout} />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/users" element={<UsersPage />} />
        <Route path="/admin/products" element={<ProductsPage />} />
        <Route path="/admin/orders" element={<OrdersPage />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/productos-detail/:id" element={<ProductosDetail />} />
        <Route path="/acercade" element={<AcercaDe />} />
        <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
        <Route path="/terminos" element={<Terminos />} />
        <Route path="/Orden" element={<Orden />} /> {/* Ruta corregida */}

      </Routes>

      <AuthModal
        open={isAuthModalOpen}
        handleClose={() => setIsAuthModalOpen(false)}
        setUserRole={setUserRole}
      />
      {userRole === null && <Footer />}
    </>
  );
}

export default App;
