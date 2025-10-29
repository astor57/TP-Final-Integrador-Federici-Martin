export function computeTotals(movements) {
  const result = movements.reduce(
    (acc, item) => {
      const amount = Number(item.amount) || 0
      if (item.type === 'ingreso') acc.totalIncome += amount
      if (item.type === 'gasto') acc.totalExpense += amount
      return acc
    },
    { totalIncome: 0, totalExpense: 0 },
  )
  return {
    totalIncome: result.totalIncome,
    totalExpense: result.totalExpense,
    balance: result.totalIncome - result.totalExpense,
  }
}

export function groupExpensesByCategory(movements) {
  const categoryToAmount = new Map()
  for (const item of movements) {
    if (item.type !== 'gasto') continue
    const cat = item.category || 'sin-categoría'
    const prev = categoryToAmount.get(cat) || 0
    categoryToAmount.set(cat, prev + (Number(item.amount) || 0))
  }
  return Array.from(categoryToAmount.entries())
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total)
}

export function computeMonthlyEvolution(movements) {
  const monthKey = (dateStr) => {
    const d = new Date(dateStr)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    return `${year}-${month}`
  }
  const byMonth = new Map()
  for (const item of movements) {
    const key = monthKey(item.date)
    const current = byMonth.get(key) || { income: 0, expense: 0 }
    const amt = Number(item.amount) || 0
    if (item.type === 'ingreso') current.income += amt
    if (item.type === 'gasto') current.expense += amt
    byMonth.set(key, current)
  }
  const sortedMonths = Array.from(byMonth.keys()).sort()
  return sortedMonths.map((key) => {
    const { income, expense } = byMonth.get(key)
    return { month: key, income, expense, balance: income - expense }
  })
}


