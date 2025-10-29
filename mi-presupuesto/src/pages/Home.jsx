import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLocalStorage } from '../hooks/useLocalStorage'


export default function Home() {
  const [movements, setMovements] = useLocalStorage('mp_movements', [])

  useEffect(() => {
  }, [])

  return (
    <div>
      <h2>Listado</h2>
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/nuevo"><button>Nuevo</button></Link>
      </div>
      <div className="list" role="table" aria-label="Movimientos">
        {movements.length === 0 ? (
          <div className="list__row" role="row" aria-live="polite">
            No hay movimientos aún. Crea uno desde "Nuevo".
          </div>
        ) : movements.map((m) => (
          <div key={m.id} className="list__row" role="row">
            <div role="cell">
              <div>{m.description}</div>
              <div className="badge" aria-label={`Categoría ${m.category}`}>{m.category}</div>
            </div>
            <div role="cell" className="badge" aria-label={`Tipo ${m.type}`}>{m.type}</div>
            <div role="cell">{new Date(m.date).toLocaleDateString()}</div>
            <div
              role="cell"
              className={`amount ${m.type === 'gasto' ? 'amount--gasto' : 'amount--ingreso'}`}
              aria-label={`Monto ${m.amount}`}
            >
              {m.type === 'gasto' ? '-' : '+'}${m.amount.toLocaleString('es-AR')}
            </div>
            <div role="cell" style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <Link to={`/editar/${m.id}`}><button>Editar</button></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


