import { describe, expect, it } from 'vitest'
import { filterAndSortTasks, getTaskCounts } from '../utils/taskUtils'

const tasks = [
  {
    id: 1,
    title: 'Projekt',
    description: 'Frontend aplikacji',
    status: 'todo',
    priority: 'high',
    category: 'Uczelnia',
    deadline: '2026-05-22',
    completed: false
  },
  {
    id: 2,
    title: 'Notatki',
    description: 'Powtórka materiału',
    status: 'done',
    priority: 'low',
    category: 'Nauka',
    deadline: '2026-05-18',
    completed: true
  },
  {
    id: 3,
    title: 'Spotkanie',
    description: 'Omowienie sprintu',
    status: 'progress',
    priority: 'medium',
    category: 'Praca',
    deadline: '2026-05-21',
    completed: false
  }
]

describe('filterAndSortTasks', () => {
  it('filters tasks by status', () => {
    const result = filterAndSortTasks(tasks, {
      search: '',
      status: 'todo',
      category: 'all',
      priority: 'all',
      sortBy: 'deadline-asc'
    })

    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Projekt')
  })

  it('filters tasks by search text across fields', () => {
    const result = filterAndSortTasks(tasks, {
      search: 'sprintu',
      status: 'all',
      category: 'all',
      priority: 'all',
      sortBy: 'deadline-asc'
    })

    expect(result).toHaveLength(1)
    expect(result[0].category).toBe('Praca')
  })

  it('sorts tasks by descending priority', () => {
    const result = filterAndSortTasks(tasks, {
      search: '',
      status: 'all',
      category: 'all',
      priority: 'all',
      sortBy: 'priority-desc'
    })

    expect(result.map(task => task.priority)).toEqual(['high', 'medium', 'low'])
  })
})

describe('getTaskCounts', () => {
  it('returns counts by status', () => {
    const counts = getTaskCounts(tasks)

    expect(counts.all).toBe(3)
    expect(counts.todo).toBe(1)
    expect(counts.progress).toBe(1)
    expect(counts.done).toBe(1)
  })
})
