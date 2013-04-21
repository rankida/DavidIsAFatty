_ = require "underscore"

routes = (app, WeightHistory, mongoose, loginRequired) ->

  app.get '/', loginRequired, (req, res) ->
    res.render "#{__dirname}/views/mobile"

  app.get '/history', loginRequired, (req, res) ->
    WeightHistory.find({username: req.session.user.username}).sort('-when').exec (err, hist) ->
      console.log "Error: #{err}" if err
      res.send hist

  app.post '/history', loginRequired, (req, res) ->
    console.log "POST /history for #{req.session.user.username} req.body #{JSON.stringify req.body}"
    newWeight = parseInt req.body.weight
    WeightHistory.findOne({username: req.session.user.username}).sort({when: -1}).exec (err, w) ->
      if w
        direction = if w.weight >= newWeight then "down" else "up"
      else
        direction = ""
      entity = new WeightHistory _.extend({
        username: req.session.user.username,
        when: new Date(),
        direction: direction
        }, req.body)
      entity.save (err, entity) ->
        console.log("Error! " + err) if err
        dir = if entity then entity.direction else ""
        res.send { direction: dir }

  app.delete '/history', loginRequired, (req, res) ->
    WeightHistory.find {username: req.session.user.username}, (err, docs) ->
      console.log "found #{docs.length} docs to delete"
      _.each docs, (d) -> d.remove()
      res.send "OK"

module.exports = routes