users = require "#{__dirname}/users"

routes = (app) ->

  login = (req, res) ->
    res.render "#{__dirname}/views/login", {redir: req.query.redir}

  app.get '/sessions/new', login
  app.get '/login', login

  app.post '/login', (req, res) ->
    users.authenticate req.body.username, req.body.password, (user)->
      if user
        req.session.user = user
        res.redirect req.body.redir || "/"
      else
        res.render "#{__dirname}/views/login", {redir: req.body.redir}
  
module.exports = routes