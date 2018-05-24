      server.use(function(req, res, next) {
        res.locals.app = app
        next()
      })
      server.use('/imoveis', listingsRouter)
