import { useEffect, useState } from 'react'

const emptyTask = {
  title: '',
  description: '',
  category: 'Nauka',
  priority: 'medium',
  status: 'todo',
  deadline: ''
}

export default function AddTaskModal({ onSave, editingTask, onCancelEdit }) {
  const [formData, setFormData] = useState(emptyTask)

  useEffect(() => {
    if (editingTask) {
      setFormData({
        id: editingTask.id,
        title: editingTask.title,
        description: editingTask.description,
        category: editingTask.category,
        priority: editingTask.priority,
        status: editingTask.status,
        deadline: editingTask.deadline
      })
      return
    }

    setFormData(emptyTask)
  }, [editingTask])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData(current => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!formData.title.trim()) return

    onSave({
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim()
    })

    setFormData(emptyTask)
  }

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="section-kicker">{editingTask ? 'Edycja' : 'Nowe zadanie'}</p>
          <h2>{editingTask ? 'Zaktualizuj szczegóły zadania' : 'Dodaj zadanie do planu'}</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="form-grid">
        <label className="field field-wide">
          <span>Tytuł</span>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Np. Przygotuj prezentacje na uczelnie"
          />
        </label>

        <label className="field field-wide">
          <span>Opis</span>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Krótki opis zadania lub plan realizacji"
          />
        </label>

        <label className="field">
          <span>Kategoria</span>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option>Nauka</option>
            <option>Uczelnia</option>
            <option>Praca</option>
            <option>Prywatne</option>
          </select>
        </label>

        <label className="field">
          <span>Priorytet</span>
          <select name="priority" value={formData.priority} onChange={handleChange}>
            <option value="high">Wysoki</option>
            <option value="medium">Sredni</option>
            <option value="low">Niski</option>
          </select>
        </label>

        <label className="field">
          <span>Status</span>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="todo">Do zrobienia</option>
            <option value="progress">W trakcie</option>
            <option value="done">Wykonane</option>
          </select>
        </label>

        <label className="field">
          <span>Deadline</span>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
          />
        </label>

        <div className="action-row field-wide">
          <button type="submit" className="primary-button">
            {editingTask ? 'Zapisz zmiany' : 'Dodaj zadanie'}
          </button>

          {editingTask ? (
            <button type="button" className="ghost-button" onClick={onCancelEdit}>
              Anuluj edycje
            </button>
          ) : null}
        </div>
      </form>
    </section>
  )
}
