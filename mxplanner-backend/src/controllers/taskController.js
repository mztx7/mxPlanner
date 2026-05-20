const prisma = require('../lib/prisma')

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: req.user.userId
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return res.json(tasks)
  } catch (error) {
    next(error)
  }
}

exports.createTask = async (req, res, next) => {
  try {
    const { title, description, category, status, priority, deadline, completed } = req.body

    if (!title || !category || !status || !priority) {
      return res.status(400).json({
        message: 'Tytul, kategoria, status i priorytet sa wymagane.'
      })
    }

    const task = await prisma.task.create({
      data: {
        title,
        description: description || null,
        category,
        status,
        priority,
        deadline: deadline ? new Date(deadline) : null,
        completed: Boolean(completed),
        userId: req.user.userId
      }
    })

    return res.status(201).json(task)
  } catch (error) {
    next(error)
  }
}

exports.updateTask = async (req, res, next) => {
  try {
    const taskId = Number(req.params.id)
    const { title, description, category, status, priority, deadline, completed } = req.body

    const existingTask = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId: req.user.userId
      }
    })

    if (!existingTask) {
      return res.status(404).json({ message: 'Nie znaleziono zadania.' })
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        title: title ?? existingTask.title,
        description: description ?? existingTask.description,
        category: category ?? existingTask.category,
        status: status ?? existingTask.status,
        priority: priority ?? existingTask.priority,
        deadline: deadline ? new Date(deadline) : deadline === '' ? null : existingTask.deadline,
        completed: typeof completed === 'boolean' ? completed : existingTask.completed
      }
    })

    return res.json(updatedTask)
  } catch (error) {
    next(error)
  }
}

exports.deleteTask = async (req, res, next) => {
  try {
    const taskId = Number(req.params.id)

    const existingTask = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId: req.user.userId
      }
    })

    if (!existingTask) {
      return res.status(404).json({ message: 'Nie znaleziono zadania.' })
    }

    await prisma.task.delete({
      where: { id: taskId }
    })

    return res.status(204).send()
  } catch (error) {
    next(error)
  }
}
