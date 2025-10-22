import './App.css'
import { Routes, Route, NavLink } from 'react-router-dom'
import { useTheme } from './context/ThemeContext.jsx'
import Home from './pages/Home.jsx'
import NuevoMovimiento from './pages/NuevoMovimiento.jsx'
import EditarMovimiento from './pages/EditarMovimiento.jsx'
import Ajustes from './pages/Ajustes.jsx'
import Resumen from './pages/Resumen.jsx'

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className={`app app--${theme}`}>
      <header className="app__header">
        <h1 className="app__title">Mi Presupuesto</h1>
        <button className="app__theme-toggle" onClick={toggleTheme} aria-label="Cambiar tema">
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
      </header>
      <nav className="app__nav" aria-label="Navegación principal">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>
          Listado
        </NavLink>
        <NavLink to="/resumen" className={({ isActive }) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>
          Resumen
        </NavLink>
        <NavLink to="/nuevo" className={({ isActive }) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>
          Nuevo
        </NavLink>
        <NavLink to="/ajustes" className={({ isActive }) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>
          Ajustes
        </NavLink>
      </nav>
      <main className="app__main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resumen" element={<Resumen />} />
          <Route path="/nuevo" element={<NuevoMovimiento />} />
          <Route path="/editar/:id" element={<EditarMovimiento />} />
          <Route path="/ajustes" element={<Ajustes />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
