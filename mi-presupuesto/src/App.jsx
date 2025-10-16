import './App.css'
import { Routes, Route, NavLink } from 'react-router-dom'
import { useTheme } from './context/ThemeContext.jsx'
import Home from './pages/Home.jsx'
import NewMovement from './pages/NewMovement.jsx'
import EditMovement from './pages/EditMovement.jsx'
import Summary from './pages/Summary.jsx'
import Settings from './pages/Settings.jsx'

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
        <NavLink to="/nuevo" className={({ isActive }) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>
          Nuevo
        </NavLink>
        <NavLink to="/resumen" className={({ isActive }) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>
          Resumen
        </NavLink>
        <NavLink to="/ajustes" className={({ isActive }) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>
          Ajustes
        </NavLink>
      </nav>
      <main className="app__main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nuevo" element={<NewMovement />} />
          <Route path="/editar/:id" element={<EditMovement />} />
          <Route path="/resumen" element={<Summary />} />
          <Route path="/ajustes" element={<Settings />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
