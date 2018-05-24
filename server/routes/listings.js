const express = require('express')
const router = express.Router()

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

router.get('/:state/:city/:neighborhood/:streetwithId', (req, res) => {
  const actualPage = '/listings/show'
  res.locals.app.render(req, res, actualPage, req.query)
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
