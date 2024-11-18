import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import Cuentas from './Pages/Cuentas/Cuentas';
import EditarBitacora from './Pages/EditarBitacora/EditarBitacora';
import CrearBitacora from './Pages/CrearBitacora/CrearBitacora';
import Login from './Pages/Login/Login';
import Registro from './Pages/Registro/Registro';
import AdminHome from './Pages/Home/AdminHome/AdminHome';
import Panel from './Pages/Panel/Panel';
import CrearUsuario from './Pages/CrearUsuario/CrearUsuario';
import BitacoraDetail from './Components/BitacoraDetail/BitacoraDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/home" element={<AdminHome />} />
        <Route path="/bitacora/:id" element={<BitacoraDetail />} />
        <Route path="/panel" element={<Panel />} />
        <Route path="/cuentas" element={<Cuentas />} />
        <Route path="/crear-bitacora" element={<CrearBitacora />} />
        <Route path="/editar-bitacora/:id" element={<EditarBitacora />} />
        <Route path="/crear-usuario" element={<CrearUsuario />} /> {/* Nueva ruta */}
      </Routes>
    </Router>
  );
}

export default App;
