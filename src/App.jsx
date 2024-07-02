// App.js
import { useState } from 'react';
import './App.css';
import { Filtros } from './components/Filtros';
import { NavBar } from './components/NavBar';
import { Ofertas } from './components/Ofertas';
import { Promo } from './components/Promo';
import { Reservas } from './components/Reservas';

function App() {
  const [view, setView] = useState('filtros'); // Estado para controlar la vista actual

  return (
    <>
      <NavBar setView={setView} />
      {view === 'filtros' && <Filtros />}
      {view === 'reservas' && <Reservas />}
      <Promo />
      <Ofertas />
    </>
  );
}

export default App;
