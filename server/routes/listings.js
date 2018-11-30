const express = require('express')
const _ = require('lodash')
const router = express.Router()

const adminMessengerId = process.env.ADMIN_MESSENGER_ID
router.get('/:listingId(\\d+)/mensagens/:userId(\\d+)', (req, res) => {
  const actualPage = '/listings/messages'
  const queryParams = {id: req.params.listingId, userId: req.params.userId}
  res.locals.app.render(req, res, actualPage, queryParams)
})

router.get('/:listingId(\\d+)/mensagens', (req, res) => {
  const actualPage = '/listings/messages'
  const queryParams = {id: req.params.listingId, userId: adminMessengerId}
  res.locals.app.render(req, res, actualPage, queryParams)
})

router.get('/:listingId/imagens', (req, res) => {
  const actualPage = '/listings/images'
  const queryParams = {listingId: req.params.listingId}
  res.locals.app.render(req, res, actualPage, queryParams)
})

router.get('/adicionar', (req, res) => {
  const actualPage = '/listings/new'
  res.locals.app.render(req, res, actualPage)
})

router.get('/favoritos', (req, res) => {
  return res.locals.app.render(req, res, '/listings/fav', req.query)
})

router.get('/:id(\\d+)', (req, res) => {
  const actualPage = '/listings/show'
  const queryParams = {id: req.params.id, ...req.query}
  res.locals.app.render(req, res, actualPage, queryParams)
})

router.get(
  '/:state/:city/:neighborhood/:street/:listingId(id-\\d+)',
  (req, res) => {
    const actualPage = '/listings/show'
    res.locals.app.render(req, res, actualPage, req.query)
  }
)

router.get('/:state/:city/:neighborhood/:streetwithId', (req, res) => {
  const actualPage = '/listings/show'
  res.locals.app.render(req, res, actualPage, req.query)
})

router.get('/:state/:city/:neighborhood/', (req, res) => {
  const actualPage = '/listings'
  const neighborhood = req.params.neighborhood
  const queryParams = {
    neighborhoodSlug: neighborhood,
    state: req.params.state,
    city: req.params.city
  }
  res.locals.app.render(req, res, actualPage, queryParams)
})

router.get('/:id(\\d+)/editar', (req, res) => {
  const actualPage = '/listings/edit'
  const queryParams = {id: req.params.id}
  res.locals.app.render(req, res, actualPage, queryParams)
})

router.get(['/', '/:state', '/:state/:city'], (req, res) => {
  const actualPage = '/listings'
  res.locals.app.render(req, res, actualPage, req.query)
})

module.exports = router
