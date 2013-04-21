_ = require "underscore"

users =
  david: {username: 'David', password: 'rankin', role:'admin'},
  john: {username: 'John', password: 'kane', role:'admin'},
  louise: {username: 'Louise', password: 'rankin', role:'admin'}

module.exports.authenticate = (username, password, callback) ->
  console.log "authenticating U:" + username + " P:" + password
  username = username.toLowerCase() if _.isString(username)
  password = password.toLowerCase() if _.isString(password)
  user = users[username]
  if user and user.password == password
    console.log "Passing back a user"
    callback user
  else
    console.log "Null user being passed"
    callback null