users = require "#{__dirname}/users"

routes = (app) ->

  login = (req, res) ->
    res.render "#{__dirname}/views/login", {redir: req.query.redir, flash: req.flash()}

  app.get '/sessions/new', login
  app.get '/login', login

  app.post '/sessions', (req, res) ->
    users.authenticate req.body.username, req.body.password, (user)->
      if user
        req.session.user = user
        req.flash 'info', "You are logged in as #{req.body.username}"
        res.redirect req.body.redir || "/", flash: req.flash()
      else
        req.flash 'error', "Sorry you were not able to login, please try again"
        res.render("#{__dirname}/views/login", {redir: req.body.redir, flash: req.flash()})

  app.del '/sessions', (req, res) ->
    req.session.regenerate (err) ->
      req.flash 'info', 'You have been logged out.'
      res.redirect '/'
  
module.exports = routes