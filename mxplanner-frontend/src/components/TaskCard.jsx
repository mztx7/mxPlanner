const priorityLabels = {
  high: 'Wysoki',
  medium: 'Sredni',
  low: 'Niski'
}

const statusLabels = {
  todo: 'Do zrobienia',
  progress: 'W trakcie',
  done: 'Wykonane'
}

const nextStatusMap = {
  todo: 'progress',
  progress: 'done',
  done: 'todo'
}

const nextStatusText = {
  todo: 'Przenieś do trakcie',
  progress: 'Oznacz jako wykonane',
  done: 'Przywróć do planu'
}

export default function TaskCard({
  task,
  onDelete,
  onEdit,
  onToggleComplete,
  onMove
}) {
  const deadlineText = task.deadline || 'Bez terminu'

  return (
    <article className={`task-card ${task.completed ? 'task-card-complete' : ''}`}>
      <div className="task-card-top">
        <div>
          <p className="task-category">{task.category}</p>
          <h3>{task.title}</h3>
        </div>
        <span className={`priority-pill priority-${task.priority}`}>
          {priorityLabels[task.priority]}
        </span>
      </div>

      <p className="task-description">
        {task.description || 'Brak dodatkowego opisu dla tego zadania.'}
      </p>

      <dl className="task-meta">
        <div>
          <dt>Status</dt>
          <dd>{statusLabels[task.status]}</dd>
        </div>
        <div>
          <dt>Deadline</dt>
          <dd>{deadlineText}</dd>
        </div>
      </dl>

      <div className="task-actions">
        <button type="button" className="ghost-button" onClick={() => onEdit(task)}>
          Edytuj
        </button>
        <button
          type="button"
          className="ghost-button"
          onClick={() => onMove(task.id, nextStatusMap[task.status])}
        >
          {nextStatusText[task.status]}
        </button>
        <button
          type="button"
          className="ghost-button"
          onClick={() => onToggleComplete(task.id)}
        >
          {task.completed ? 'Cofnij wykonanie' : 'Oznacz jako zrobione'}
        </button>
        <button type="button" className="danger-button" onClick={() => onDelete(task.id)}>
          Usun
        </button>
      </div>
    </article>
  )
}
