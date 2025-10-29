import { useTheme } from '../context/ThemeContext.jsx'

export default function Ajustes() {
  const { theme, toggleTheme } = useTheme()

  function handleReset() {
    const ok = confirm('¿Seguro que deseas eliminar todos los datos? Esta acción no se puede deshacer.')
    if (!ok) return
    localStorage.removeItem('mp_movements')
    alert('Datos eliminados')
  }

  return (
    <div>
      <h2>Ajustes</h2>
      <section style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        <div className="card" role="region" aria-label="Preferencias de tema" style={{ padding: '1rem' }}>
          <div className="card__title" style={{ marginBottom: '0.25rem' }}>Tema</div>
          <div style={{ marginBottom: '0.5rem' }}>Tema actual: <strong>{theme}</strong></div>
          <button onClick={toggleTheme} aria-label="Cambiar tema">Cambiar tema</button>
        </div>

        <div className="card" role="region" aria-label="Datos y almacenamiento" style={{ padding: '1rem' }}>
          <div className="card__title" style={{ marginBottom: '0.25rem' }}>Datos</div>
          <div style={{ marginBottom: '0.5rem' }}>Eliminar todos los movimientos guardados.</div>
          <button onClick={handleReset} aria-label="Eliminar datos" style={{ color: 'var(--red, #dc2626)' }}>Limpiar datos</button>
        </div>
      </section>
    </div>
  )
}


