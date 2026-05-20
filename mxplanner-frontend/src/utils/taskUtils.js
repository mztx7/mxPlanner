const priorityWeight = {
  low: 1,
  medium: 2,
  high: 3
}

function normalizeText(value) {
  return String(value || '').toLowerCase()
}

function deadlineValue(deadline) {
  if (!deadline) return Number.MAX_SAFE_INTEGER
  return new Date(deadline).getTime()
}

export function filterAndSortTasks(tasks, filters) {
  const search = normalizeText(filters.search)

  return [...tasks]
    .filter(task => {
      if (filters.status !== 'all' && task.status !== filters.status) return false
      if (filters.priority !== 'all' && task.priority !== filters.priority) return false
      if (filters.category !== 'all' && task.category !== filters.category) return false

      if (!search) return true

      return [task.title, task.description, task.category]
        .some(value => normalizeText(value).includes(search))
    })
    .sort((taskA, taskB) => {
      switch (filters.sortBy) {
        case 'deadline-desc':
          return deadlineValue(taskB.deadline) - deadlineValue(taskA.deadline)
        case 'priority-desc':
          return priorityWeight[taskB.priority] - priorityWeight[taskA.priority]
        case 'title-asc':
          return taskA.title.localeCompare(taskB.title, 'pl')
        case 'deadline-asc':
        default:
          return deadlineValue(taskA.deadline) - deadlineValue(taskB.deadline)
      }
    })
}

export function getTaskCounts(tasks) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return tasks.reduce(
    (counts, task) => {
      counts.all += 1
      counts[task.status] += 1

      if (!task.completed && task.deadline && new Date(task.deadline) < today) {
        counts.overdue += 1
      }

      return counts
    },
    {
      all: 0,
      todo: 0,
      progress: 0,
      done: 0,
      overdue: 0
    }
  )
}
