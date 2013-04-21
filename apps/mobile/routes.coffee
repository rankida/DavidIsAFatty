_ = require "underscore"

routes = (app, WeightHistory, mongoose, loginRequired) ->

  app.get '/', loginRequired, (req, res) ->
    res.render "#{__dirname}/views/mobile"

  app.get '/history', loginRequired, (req, res) ->
    console.log "GET /history for user " + req.session.user.username
    WeightHistory.find {username: req.session.user.username}, (err, hist) ->
      console.log("Error: " + err) if err
      res.send(hist);

  app.post '/history', loginRequired, (req, res) ->
    console.log "POST /history for #{req.session.user.username} req.body #{JSON.stringify req.body}"
    entity = new WeightHistory _.extend({
      username: req.session.user.username,
      when: new Date(),
      direction: ""
      }, req.body)
    console.log('Entity created')
    entity.save (err, entity) ->
      console.log("Error! " + err) if err
      res.send({ direction: 'down' })

  app.delete '/history', loginRequired, (req, res) ->
    WeightHistory.find {username: req.session.user.username}, (err, docs) ->
      console.log "found #{docs.length} docs to delete"
      _.each docs, (d) -> d.remove()
      res.send "OK"

module.exports = routes