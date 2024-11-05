import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import Login from "./Pages/Login/Login";
import Registro from "./Pages/Registro/Registro";
import CrearBitacora from './Pages/CrearBitacora/CrearBitacora'

function App() {
  const [count, setCount] = useState(0);

  return (
  <>
<CrearBitacora/>
  </>
/*
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </Router>
    
    */
  );
}

export default App;
