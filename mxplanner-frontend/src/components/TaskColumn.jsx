import TaskCard from './TaskCard'

export default function TaskColumn({
  title,
  tasks,
  emptyText,
  onDelete,
  onEdit,
  onToggleComplete,
  onMove
}) {
  return (
    <section className="task-column">
      <div className="task-column-header">
        <h3>{title}</h3>
        <span>{tasks.length}</span>
      </div>

      {tasks.length === 0 ? (
        <p className="task-empty">{emptyText}</p>
      ) : (
        <div className="task-list">
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDelete}
              onEdit={onEdit}
              onToggleComplete={onToggleComplete}
              onMove={onMove}
            />
          ))}
        </div>
      )}
    </section>
  )
}
