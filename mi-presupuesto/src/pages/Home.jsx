import { useEffect, useMemo, useState } from 'react'
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
  const [q, setQ] = useState('')
  const [type, setType] = useState('')
  const [category, setCategory] = useState('')
  const [sortBy, setSortBy] = useState('date_desc')

  useEffect(() => {
    if (!Array.isArray(movements) || movements.length === 0) {
      setMovements(seed)
    }
  }, [])

  const filtered = useMemo(() => {
    let rows = [...movements]
    if (q) rows = rows.filter((r) => r.description.toLowerCase().includes(q.toLowerCase()))
    if (type) rows = rows.filter((r) => r.type === type)
    if (category) rows = rows.filter((r) => r.category === category)
    switch (sortBy) {
      case 'amount_asc': rows.sort((a,b) => a.amount - b.amount); break
      case 'amount_desc': rows.sort((a,b) => b.amount - a.amount); break
      case 'date_asc': rows.sort((a,b) => new Date(a.date) - new Date(b.date)); break
      case 'date_desc': default: rows.sort((a,b) => new Date(b.date) - new Date(a.date));
    }
    return rows
  }, [movements, q, type, category, sortBy])

  function handleDelete(id) {
    if (!confirm('¿Eliminar movimiento?')) return
    setMovements(movements.filter((m) => m.id !== id))
  }

  return (
    <div>
      <h2>Listado</h2>
      <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1rem' }}>
        <input placeholder="Buscar descripción" value={q} onChange={(e) => setQ(e.target.value)} />
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Todos los tipos</option>
            <option value="ingreso">Ingreso</option>
            <option value="gasto">Gasto</option>
          </select>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Todas las categorías</option>
            <option value="alimentación">Alimentación</option>
            <option value="transporte">Transporte</option>
            <option value="ocio">Ocio</option>
            <option value="servicios">Servicios</option>
            <option value="ingresos">Ingresos</option>
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date_desc">Fecha desc</option>
            <option value="date_asc">Fecha asc</option>
            <option value="amount_desc">Monto desc</option>
            <option value="amount_asc">Monto asc</option>
          </select>
          <Link to="/nuevo"><button>Nuevo</button></Link>
        </div>
      </div>
      <div className="list" role="table" aria-label="Movimientos">
        {filtered.map((m) => (
          <div key={m.id} className="list__row" role="row">
            <div role="cell">
              <div>{m.description}</div>
              <div className="badge" aria-label={`Categoría ${m.category}`}>{m.category}</div>
            </div>
            <div role="cell" className="badge" aria-label={`Tipo ${m.type}`}>{m.type}</div>
            <div role="cell">{new Date(m.date).toLocaleDateString()}</div>
            <div role="cell" className="amount" aria-label={`Monto ${m.amount}`}>
              {m.type === 'gasto' ? '-' : '+'}${m.amount.toLocaleString('es-AR')}
            </div>
            <div role="cell" style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <Link to={`/editar/${m.id}`}><button>Editar</button></Link>
              <button onClick={() => handleDelete(m.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


