import { useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { computeTotals, groupExpensesByCategory } from '../utils/analytics'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function Resumen() {
  const [movements] = useLocalStorage('mp_movements', [])

  const totals = useMemo(() => computeTotals(movements), [movements])
  const expensesByCategory = useMemo(() => groupExpensesByCategory(movements), [movements])

  const pieData = useMemo(() => {
    const labels = expensesByCategory.map((x) => x.category)
    const data = expensesByCategory.map((x) => x.total)
    return {
      labels,
      datasets: [
        {
          label: 'Gasto por categoría',
          data,
          backgroundColor: [
            '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f472b6', '#22c55e', '#eab308', '#6366f1',
          ],
          borderWidth: 1,
        },
      ],
    }
  }, [expensesByCategory])

  return (
    <div>
      <h2>Resumen</h2>
      <section style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
        <div className="card" aria-label="Total ingresos">
          <div className="card__title">Ingresos</div>
          <div className="card__value" style={{ color: 'var(--green, #16a34a)' }}>
            ${totals.totalIncome.toLocaleString('es-AR')}
          </div>
        </div>
        <div className="card" aria-label="Total gastos">
          <div className="card__title">Gastos</div>
          <div className="card__value" style={{ color: 'var(--red, #dc2626)' }}>
            ${totals.totalExpense.toLocaleString('es-AR')}
          </div>
        </div>
        <div className="card" aria-label="Balance">
          <div className="card__title">Balance</div>
          <div className="card__value">
            ${totals.balance.toLocaleString('es-AR')}
          </div>
        </div>
      </section>

      <section style={{ marginTop: '1.5rem' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Gastos por categoría</h3>
        {expensesByCategory.length === 0 ? (
          <p>No hay gastos para mostrar.</p>
        ) : (
          <div style={{ maxWidth: 520 }}>
            <Pie data={pieData} options={{ plugins: { legend: { position: 'bottom' } } }} />
          </div>
        )}
      </section>

      <section style={{ marginTop: '1.5rem' }}>
        <h3>Evolución mensual</h3>
        <p>Pendiente: gráfico de barras/líneas (para la otra mitad de la semana).</p>
      </section>
    </div>
  )
}


