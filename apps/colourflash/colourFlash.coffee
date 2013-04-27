_ = require "underscore"

routes = (app) ->

  app.get '/colour', (req, res) ->
    res.render "#{__dirname}/views/colourFlash"

module.exports = routes