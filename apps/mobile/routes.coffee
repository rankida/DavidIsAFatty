
routes = (app) ->

  app.get '/mobile', (req, res) ->
    res.render "#{__dirname}/views/mobile"

  app.get '/test', (req, res) ->
    res.render "#{__dirname}/views/test"

module.exports = routes