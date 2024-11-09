import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import AdminHome from './Pages/Home/AdminHome/AdminHome';
import Registro from './Pages/Registro/Registro';
import Login from './Pages/Login/Login';
import Cuentas from './Pages/Cuentas/Cuentas';
import Panel from './Pages/Panel/Panel';
import CrearBitacora from './Pages/CrearBitacora/CrearBitacora';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CrearBitacora />} />
      </Routes>
    </Router>
  );
}

export default App;