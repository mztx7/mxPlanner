import { useState } from 'react'
import AddTaskModal from './components/AddTaskModal'
import AuthPanel from './components/AuthPanel'
import FilterPanel from './components/FilterPanel'
import Navbar from './components/Navbar'
import TaskColumn from './components/TaskColumn'
import { filterAndSortTasks, getTaskCounts } from './utils/taskUtils'

const initialTasks = [
  {
    id: 1,
    title: 'testtest',
    description: 'asdsdfsdffsdf.',
    status: 'todo',
    priority: 'high',
    category: 'Uczelnia',
    deadline: '2026-05-30',
    completed: false
  },
  {
    id: 2,
    title: 'Aplikacja mxPlanner',
    description: 'zrobić testy.',
    status: 'progress',
    priority: 'medium',
    category: 'Praca',
    deadline: '2026-06-06',
    completed: false
  },
  {
    id: 3,
    title: 'projekt pdf',
    description: 'przygotuj i wyślij pdf z pomysłem apki.',
    status: 'done',
    priority: 'low',
    category: 'Uczelnia',
    deadline: '2026-05-09',
    completed: true
  }
]

const initialFilters = {
  search: '',
  status: 'all',
  category: 'all',
  priority: 'all',
  sortBy: 'deadline-asc'
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [user, setUser] = useState({
    name: 'Magda',
    email: 'magda@mxplanner.app'
  })
  const [tasks, setTasks] = useState(initialTasks)
  const [filters, setFilters] = useState(initialFilters)
  const [editingTask, setEditingTask] = useState(null)

  const visibleTasks = filterAndSortTasks(tasks, filters)
  const counts = getTaskCounts(tasks)
  const categories = Array.from(new Set(tasks.map(task => task.category))).sort((a, b) =>
    a.localeCompare(b, 'pl')
  )

  const handleAuthSubmit = (formData) => {
    setUser({
      name: formData.name || 'Uzytkownik',
      email: formData.email
    })
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setAuthMode('login')
    setEditingTask(null)
  }

  const handleSaveTask = (taskData) => {
    if (taskData.id) {
      setTasks(currentTasks =>
        currentTasks.map(task =>
          task.id === taskData.id
            ? {
                ...task,
                ...taskData,
                completed: taskData.status === 'done'
              }
            : task
        )
      )
      setEditingTask(null)
      return
    }

    setTasks(currentTasks => [
      {
        ...taskData,
        id: Date.now(),
        completed: taskData.status === 'done'
      },
      ...currentTasks
    ])
  }

  const handleDeleteTask = (id) => {
    setTasks(currentTasks => currentTasks.filter(task => task.id !== id))
    if (editingTask?.id === id) {
      setEditingTask(null)
    }
  }

  const handleToggleComplete = (id) => {
    setTasks(currentTasks =>
      currentTasks.map(task => {
        if (task.id !== id) return task

        const completed = !task.completed
        return {
          ...task,
          completed,
          status: completed ? 'done' : 'todo'
        }
      })
    )
  }

  const handleMoveTask = (id, status) => {
    setTasks(currentTasks =>
      currentTasks.map(task =>
        task.id === id
          ? {
              ...task,
              status,
              completed: status === 'done'
            }
          : task
      )
    )
  }

  const handleStartEdit = (task) => {
    setEditingTask(task)
  }

  const resetFilters = () => {
    setFilters(initialFilters)
  }

  if (!isAuthenticated) {
    return (
      <main className="app-shell">
        <section className="hero-panel">
          <div className="hero-copy">
            <span className="hero-badge">mxPlanner</span>
            <h1 className="hero-title">Zarzadzaj nauką, zadaniami i terminami w jednym miejscu.</h1>
            <p className="hero-text">
              Aplikacja porzadkuje obowiazki studenta: priorytety, deadline'y,
              kategorie i szybki przeglad postepu bez chaosu.
            </p>
            <div className="hero-stats">
              <div>
                <strong>3 widoki</strong>
                <span>todo, w trakcie, wykonane</span>
              </div>
              <div>
                <strong>4 filtry</strong>
                <span>status, priorytet, kategoria, wyszukiwarka</span>
              </div>
            </div>
          </div>

          <AuthPanel
            authMode={authMode}
            onModeChange={setAuthMode}
            onSubmit={handleAuthSubmit}
          />
        </section>
      </main>
    )
  }

  return (
    <main className="app-shell">
      <Navbar user={user} counts={counts} onLogout={handleLogout} />

      <section className="dashboard-grid">
        <aside className="sidebar-stack">
          <AddTaskModal
            onSave={handleSaveTask}
            editingTask={editingTask}
            onCancelEdit={() => setEditingTask(null)}
          />

          <FilterPanel
            filters={filters}
            categories={categories}
            onChange={setFilters}
            onReset={resetFilters}
          />
        </aside>

        <section className="content-stack">
          <div className="board-summary">
            <div>
              <p className="section-kicker">Dashboard</p>
              <h2>Plan dnia i nauki</h2>
            </div>
            <p>
              {visibleTasks.length} zadań po filtrowaniu, {counts.done} zakończonych,{' '}
              {counts.overdue} po terminie.
            </p>
          </div>

          <div className="board-columns">
            <TaskColumn
              title="Do zrobienia"
              tasks={visibleTasks.filter(task => task.status === 'todo')}
              emptyText="Brak zadan do rozpoczecia."
              onDelete={handleDeleteTask}
              onEdit={handleStartEdit}
              onToggleComplete={handleToggleComplete}
              onMove={handleMoveTask}
            />

            <TaskColumn
              title="W trakcie"
              tasks={visibleTasks.filter(task => task.status === 'progress')}
              emptyText="Nic nie jest obecnie realizowane."
              onDelete={handleDeleteTask}
              onEdit={handleStartEdit}
              onToggleComplete={handleToggleComplete}
              onMove={handleMoveTask}
            />

            <TaskColumn
              title="Wykonane"
              tasks={visibleTasks.filter(task => task.status === 'done')}
              emptyText="Jeszcze nic nie zostało oznaczone jako wykonane."
              onDelete={handleDeleteTask}
              onEdit={handleStartEdit}
              onToggleComplete={handleToggleComplete}
              onMove={handleMoveTask}
            />
          </div>
        </section>
      </section>
    </main>
  )
}
