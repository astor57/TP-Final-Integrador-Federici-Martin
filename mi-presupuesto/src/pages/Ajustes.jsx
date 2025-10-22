import { useTheme } from '../context/ThemeContext.jsx'

export default function Ajustes() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div>
      <h2>Ajustes</h2>
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <span>Tema actual: {theme}</span>
        <button onClick={toggleTheme}>Cambiar tema</button>
      </div>
    </div>
  )
}


