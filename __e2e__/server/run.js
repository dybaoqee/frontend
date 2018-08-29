import {promisify} from 'util'
import express from 'express'
import {createApolloServer} from 'em-casa-mock-server'

import apiMiddleware from './api'

const PORT = process.env.PORT || 4000

const app = express()

const listen = promisify((port, fun) => app.listen(port, fun))

async function start() {
  app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.path}`)
    next()
  })
  const server = await createApolloServer()
  server.applyMiddleware({
    app,
    path: '/graphql_api',
    gui: {endpoint: '/graphql_api/graphiql'}
  })
  app.use('/', apiMiddleware)
  app.use((req, res) => {
    console.log(`Can't respond to ${req.url}`)
    if (req.body) console.log('Request body:', req.body)
    res.status(404).send()
  })
  await listen(PORT)
  console.log(`Mock server is listening on port ${PORT}`)
}

start().catch((error) => {
  console.error(error)
  process.exit(1)
})
