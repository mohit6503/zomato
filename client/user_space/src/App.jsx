import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './App.css'; 
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Restaurant from './pages/Restaurant'; 
import FoodItem from './pages/FoodItem';     
import Cart from './pages/Cart.jsx';
import OrderSuccess from "./pages/OrderSuccess";


function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/restaurants" element={<Restaurant />} />
        <Route path="/restaurant/:id" element={<FoodItem />} /> 
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-success" element={<OrderSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;

