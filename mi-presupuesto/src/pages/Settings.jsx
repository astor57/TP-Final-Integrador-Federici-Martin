import { useTheme } from '../context/ThemeContext.jsx'

export default function Settings() {
  const { theme, toggleTheme } = useTheme()

  function handleReset() {
    localStorage.removeItem('mp_movements')
    // simple UX note: page content will reflect empty list when navigating back
    alert('Datos eliminados')
  }

  return (
    <div>
      <h2>Ajustes</h2>
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <span>Tema actual: {theme}</span>
        <button onClick={toggleTheme}>Cambiar tema</button>
        <button onClick={handleReset}>Limpiar datos</button>
      </div>
    </div>
  )
}


