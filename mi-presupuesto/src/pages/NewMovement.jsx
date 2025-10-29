import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from '../hooks/useLocalStorage'

const categories = [
  { value: '', label: 'Seleccionar categoría' },
  { value: 'alimentación', label: 'Alimentación' },
  { value: 'transporte', label: 'Transporte' },
  { value: 'ocio', label: 'Ocio' },
  { value: 'servicios', label: 'Servicios' },
  { value: 'salud', label: 'Salud' },
  { value: 'vivienda', label: 'Vivienda' },
  { value: 'educación', label: 'Educación' },
  { value: 'ingresos', label: 'Ingresos' },
]

const schema = Yup.object({
  description: Yup.string().trim().min(3, 'Mínimo 3 caracteres').required('Requerido'),
  category: Yup.string().required('Requerido'),
  type: Yup.mixed().oneOf(['ingreso', 'gasto'], 'Seleccione un tipo').required('Requerido'),
  amount: Yup.number().typeError('Debe ser un número').positive('Debe ser positivo').required('Requerido'),
  date: Yup.date()
    .typeError('Fecha inválida')
    .max(new Date(), 'No puede ser futura')
    .required('Requerido'),
})

export default function NewMovement() {
  const [movements, setMovements] = useLocalStorage('mp_movements', [])
  const navigate = useNavigate()

  const initialValues = {
    description: '',
    category: '',
    type: 'gasto',
    amount: '',
    date: new Date().toISOString().slice(0, 10),
  }

  function handleSubmit(values, { setSubmitting, resetForm }) {
    const newMovement = {
      id: String(Date.now()),
      description: values.description.trim(),
      category: values.category,
      type: values.type,
      amount: Number(values.amount),
      date: values.date,
    }
    setMovements([newMovement, ...movements])
    setSubmitting(false)
    resetForm()
    navigate('/')
  }

  return (
    <div>
      <h2>Nuevo movimiento</h2>
      <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
        {({ isSubmitting, values }) => (
          <Form className="form" aria-label="Formulario nuevo movimiento" style={{ display: 'grid', gap: '0.75rem', maxWidth: 520 }}>
            <label>
              Descripción
              <Field name="description" type="text" placeholder="Ej: Supermercado" />
              <ErrorMessage name="description" component="div" className="form__error" />
            </label>

            <label>
              Categoría
              <Field name="category" as="select">
                {categories.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </Field>
              <ErrorMessage name="category" component="div" className="form__error" />
            </label>

            <fieldset style={{ border: '1px solid var(--border, #e5e7eb)', padding: '0.5rem 0.75rem', borderRadius: 8 }}>
              <legend>Tipo</legend>
              <label style={{ marginRight: '1rem' }}>
                <Field type="radio" name="type" value="gasto" /> Gasto
              </label>
              <label>
                <Field type="radio" name="type" value="ingreso" /> Ingreso
              </label>
              <ErrorMessage name="type" component="div" className="form__error" />
            </fieldset>

            <label>
              Monto
              <Field name="amount" type="number" step="0.01" min="0" placeholder="0" />
              <ErrorMessage name="amount" component="div" className="form__error" />
            </label>

            <label>
              Fecha
              <Field name="date" type="date" max={new Date().toISOString().slice(0, 10)} />
              <ErrorMessage name="date" component="div" className="form__error" />
            </label>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="submit" disabled={isSubmitting}>
                Guardar {values.type === 'gasto' ? 'gasto' : 'ingreso'}
              </button>
              <button type="button" onClick={() => navigate('/')}>Cancelar</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}


