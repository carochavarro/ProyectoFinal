import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import Login from "./Pages/Login/Login";
import Registro from "./Pages/Registro/Registro";
import CrearBitacora from './Pages/CrearBitacora/CrearBitacora';
import AdminHome from './Pages/Home/AdminHome/AdminHome';
import EditarBitacora from './Pages/EditarBitacora/EditarBitacora';
import BitacoraDetail from './Components/BitacoraDetail/BitacoraDetail'; // Asegúrate de que este componente exista

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />  {/* Asegúrate de que esta ruta exista */}
        <Route path="/registro" element={<Registro />} />
        <Route path="/home" element={<AdminHome />} />
        <Route path="/bitacora/:id" element={<BitacoraDetail />} />
      </Routes>
    </Router>

  );
}

export default App;
