import { useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, XAxis, YAxis, Bar, CartesianGrid } from 'recharts'

const COLORS = ['#60a5fa', '#f472b6', '#34d399', '#f59e0b', '#a78bfa', '#f87171']

export default function Summary() {
  const [movements] = useLocalStorage('mp_movements', [])

  const { totalIncome, totalExpense, balance, byCategory, monthly } = useMemo(() => {
    const income = movements.filter(m => m.type === 'ingreso').reduce((s, m) => s + Number(m.amount), 0)
    const expense = movements.filter(m => m.type === 'gasto').reduce((s, m) => s + Number(m.amount), 0)
    const byCatMap = new Map()
    for (const m of movements.filter(m => m.type === 'gasto')) {
      byCatMap.set(m.category, (byCatMap.get(m.category) ?? 0) + Number(m.amount))
    }
    const byCategory = Array.from(byCatMap, ([name, value]) => ({ name, value }))

    const byMonth = new Map()
    for (const m of movements) {
      const d = new Date(m.date)
      const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`
      const sign = m.type === 'gasto' ? -1 : 1
      byMonth.set(key, (byMonth.get(key) ?? 0) + sign * Number(m.amount))
    }
    const monthly = Array.from(byMonth, ([month, value]) => ({ month, value })).sort((a,b) => a.month.localeCompare(b.month))

    return { totalIncome: income, totalExpense: expense, balance: income - expense, byCategory, monthly }
  }, [movements])

  return (
    <div>
      <h2>Resumen</h2>
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        <div>
          <h3>Totales</h3>
          <ul>
            <li>Ingresos: ${totalIncome.toLocaleString('es-AR')}</li>
            <li>Gastos: ${totalExpense.toLocaleString('es-AR')}</li>
            <li>Balance: ${balance.toLocaleString('es-AR')}</li>
          </ul>
        </div>

        <div>
          <h3>Gastos por categoría</h3>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={byCategory} dataKey="value" nameKey="name" outerRadius={90}>
                  {byCategory.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3>Evolución mensual</h3>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <BarChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#60a5fa" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}


