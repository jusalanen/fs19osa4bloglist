const morgan = require('morgan')
const jwt = require('jsonwebtoken')

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

const customMorgan = () => morgan( (tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens['body'](req, res),
  ].join(' ')
})

const tokenExtractor = (request, response, next) => {
  try {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = jwt.verify(authorization.substring(7), process.env.SECRET)
  } else {
    request.token = null
  }} catch (ex) {
  next(ex)
  }
}

module.exports = { customMorgan, tokenExtractor }