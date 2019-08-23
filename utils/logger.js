const morgan = require('morgan')

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

module.exports = customMorgan()
