
routes = (app) ->

  app.get '/mobile', (req, res) ->
    res.render "#{__dirname}/views/mobile"

  app.get '/test', (req, res) ->
    res.render "#{__dirname}/views/test"

  app.get '/history', (req, res) ->
    res.send('history')

  app.post '/history', (req, res) ->
    console.log('req.body' + JSON.stringify(req.body))
    res.send({ direction: 'down' })

module.exports = routes