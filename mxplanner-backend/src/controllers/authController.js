const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const prisma = require('../lib/prisma')

function signToken(user) {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      name: user.name
    },
    process.env.JWT_SECRET || 'mxplanner-dev-secret',
    { expiresIn: '7d' }
  )
}

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Imie, email i haslo sa wymagane.' })
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return res.status(409).json({ message: 'Uzytkownik z tym adresem email juz istnieje.' })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash
      }
    })

    const token = signToken(user)

    return res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    next(error)
  }
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email i haslo sa wymagane.' })
    }

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return res.status(401).json({ message: 'Nieprawidlowy email lub haslo.' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash)

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Nieprawidlowy email lub haslo.' })
    }

    const token = signToken(user)

    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    next(error)
  }
}
