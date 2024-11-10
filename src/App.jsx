import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import Cuentas from './Pages/Cuentas/Cuentas';
import EditarBitacora from './Pages/EditarBitacora/EditarBitacora';
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
