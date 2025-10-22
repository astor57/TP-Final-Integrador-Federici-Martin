import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from '../hooks/useLocalStorage'

const schema = yup.object({
  description: yup.string().required('Requerido').min(3, 'Mínimo 3 caracteres'),
  category: yup.string().required('Requerido'),
  type: yup.string().oneOf(['ingreso', 'gasto']).required('Requerido'),
  amount: yup.number().typeError('Debe ser número').positive('Debe ser positivo').required('Requerido'),
  date: yup.date().typeError('Fecha inválida').max(new Date(), 'No puede ser futura').required('Requerido'),
})

export default function NuevoMovimiento() {
  const navigate = useNavigate()
  const [movements, setMovements] = useLocalStorage('mp_movements', [])
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })

  function onSubmit(data) {
    const id = crypto.randomUUID()
    const next = [
      ...movements,
      { id, ...data, amount: Number(data.amount) },
    ]
    setMovements(next)
    navigate('/')
  }

  return (
    <div>
      <h2>Nuevo movimiento</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'grid', gap: '0.75rem', maxWidth: 520 }}>
        <label>
          Descripción
          <input {...register('description')} placeholder="Descripción" />
          {errors.description && <small style={{ color: 'crimson' }}>{errors.description.message}</small>}
        </label>
        <label>
          Categoría
          <select {...register('category')} defaultValue="">
            <option value="" disabled>Seleccioná</option>
            <option value="alimentación">Alimentación</option>
            <option value="transporte">Transporte</option>
            <option value="ocio">Ocio</option>
            <option value="servicios">Servicios</option>
            <option value="ingresos">Ingresos</option>
          </select>
          {errors.category && <small style={{ color: 'crimson' }}>{errors.category.message}</small>}
        </label>
        <fieldset style={{ display: 'flex', gap: '1rem' }}>
          <legend>Tipo</legend>
          <label><input type="radio" value="ingreso" {...register('type')} /> Ingreso</label>
          <label><input type="radio" value="gasto" {...register('type')} /> Gasto</label>
          {errors.type && <small style={{ color: 'crimson' }}>{errors.type.message}</small>}
        </fieldset>
        <label>
          Monto
          <input type="number" step="0.01" {...register('amount')} placeholder="0" />
          {errors.amount && <small style={{ color: 'crimson' }}>{errors.amount.message}</small>}
        </label>
        <label>
          Fecha
          <input type="date" {...register('date')} />
          {errors.date && <small style={{ color: 'crimson' }}>{errors.date.message}</small>}
        </label>
        <div>
          <button type="submit">Guardar</button>
        </div>
      </form>
    </div>
  )
}


