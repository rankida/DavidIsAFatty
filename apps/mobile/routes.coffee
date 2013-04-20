_ = require "underscore"

routes = (app, WeightHistory, mongoose) ->

  app.get '/mobile', (req, res) ->
    res.render "#{__dirname}/views/mobile"

  app.get '/test', (req, res) ->
    res.render "#{__dirname}/views/test"

  app.get '/history', (req, res) ->
    console.log "GET /history called with req.body of " + JSON.stringify(req.body)
    WeightHistory.find {}, (err, hist) ->
      console.log("In method handeler of find.")
      console.log("Error: " + err) if err
      res.send(hist);

  app.post '/history', (req, res) ->
    console.log('req.body' + JSON.stringify(req.body))
    entity = new WeightHistory _.extend({
      when: new Date(),
      direction: ""
      }, req.body)
    console.log('Entity created')
    entity.save (err, entity) ->
      console.log("Error! " + err) #if err
      res.send({ direction: 'down' })

  app.delete '/history', (req, res) ->
    WeightHistory.find {}, (err, docs) ->
      console.log "found #{docs.length} docs to delete"
      _.each docs, (d) -> d.remove()
      res.send "OK"

module.exports = routes