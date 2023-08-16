import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Chatbot from './components/Chatbot';
import Locate from './components/Locate';
import Cart from './components/Cart';
import Scan from './components/Scan';
import { useState } from 'react';

function App() {

  const [cartItems, setCartItems] = useState([]);
  
  const addItemToCart = (data) => {
    setCartItems([...cartItems, data])
  }

  return (
    <div className="App">
      <Navbar />
      <div className='main'>
        <Routes>
          <Route path="/" element={<Home addItemToCart={addItemToCart} />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/locate" element={<Locate />} />
          <Route path="/cart" element={<Cart cartitems={cartItems} />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
