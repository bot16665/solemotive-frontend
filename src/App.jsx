import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { CartProvider } from './context/CartContext';
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Login from "./pages/login";
import Men from "./pages/men";
import Women from "./pages/women";
import ShoeDetails from "./pages/shoesdetails";
import Cart from "./pages/Cart";
import OrderSuccess from "./pages/OrderSuccess";

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login"];
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <CartProvider>
      <div>
        {/* Only hide Navbar on login page */}
        {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

        <Routes>
          {/* Redirect root to login for unauthenticated users, home for authenticated users */}
          <Route 
            path="/" 
            element={user ? <Home /> : <Navigate to="/login" replace />} 
          />
          
          {/* Auth route - redirect to home if already authenticated */}
          <Route 
            path="/login" 
            element={user ? <Navigate to="/home" replace /> : <Login />} 
          />
          
          {/* Protected Routes - Require Login */}
          <Route 
            path="/home" 
            element={user ? <Home /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/men" 
            element={user ? <Men /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/women" 
            element={user ? <Women /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/shoesdetails/:id" 
            element={user ? <ShoeDetails /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/cart" 
            element={user ? <Cart /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/order-success" 
            element={user ? <OrderSuccess /> : <Navigate to="/login" replace />} 
          />
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;
