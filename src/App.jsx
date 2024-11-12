import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import Cuentas from './Pages/Cuentas/Cuentas';
import EditarBitacora from './Pages/EditarBitacora/EditarBitacora';
import CrearBitacora from './Pages/CrearBitacora/CrearBitacora';
import BitacoraCard from './Components/BitacoraCard/BitacoraCard';
import Login from './Pages/Login/Login';
import Registro from './Pages/Registro/Registro'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </Router>
  );
}

export default App;
