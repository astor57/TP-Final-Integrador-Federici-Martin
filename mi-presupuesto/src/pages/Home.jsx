import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLocalStorage } from '../hooks/useLocalStorage'

const seed = [
  { id: '1', description: 'Sueldo', category: 'ingresos', type: 'ingreso', amount: 500000, date: '2025-10-01' },
  { id: '2', description: 'Supermercado', category: 'alimentación', type: 'gasto', amount: 45000, date: '2025-10-03' },
  { id: '3', description: 'Colectivo', category: 'transporte', type: 'gasto', amount: 1200, date: '2025-10-04' },
  { id: '4', description: 'Freelance', category: 'ingresos', type: 'ingreso', amount: 80000, date: '2025-10-05' },
]

export default function Home() {
  const [movements, setMovements] = useLocalStorage('mp_movements', [])

  useEffect(() => {
    if (!Array.isArray(movements) || movements.length === 0) {
      setMovements(seed)
    }
  }, [])

  return (
    <div>
      <h2>Listado</h2>
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/nuevo"><button>Nuevo</button></Link>
      </div>
      <div className="list" role="table" aria-label="Movimientos">
        {movements.map((m) => (
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


