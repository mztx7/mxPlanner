const jwt = require('jsonwebtoken')

module.exports = function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Brak tokenu autoryzacyjnego.' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mxplanner-dev-secret')
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Token jest nieprawidlowy lub wygasl.' })
  }
}
