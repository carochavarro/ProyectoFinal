import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import Login from "./Pages/Login/Login";
import Registro from "./Pages/Registro/Registro";
import CrearBitacora from './Pages/CrearBitacora/CrearBitacora';
import AdminHome from './Pages/Home/AdminHome/AdminHome';
import BitacoraDetail from './Components/BitacoraDetail/BitacoraDetail'; // Asegúrate de que este componente exista

function App() {
  return (
    <CrearBitacora/>



    /*
    <Router>
      <Routes>
        <Route path="/" element={<AdminHome />} /> 
        <Route path="/bitacora/:id" element={<BitacoraDetail />} />
      </Routes>
    </Router>
    */
  );
}

export default App;
