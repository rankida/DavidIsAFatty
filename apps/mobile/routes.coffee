
routes = (app) ->

  mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/mydb'
  mongoose = require('mongoose')
  mongoose.connect(mongoUri)
  weightHistorySchema = mongoose.Schema({weight: String, meal: Boolean})
  WeightHistory = mongoose.model('Weigth', weightHistorySchema)

  app.get '/mobile', (req, res) ->
    res.render "#{__dirname}/views/mobile"

  app.get '/test', (req, res) ->
    res.render "#{__dirname}/views/test"

  app.get '/history', (req, res) ->
    db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'))
    WeightHistory.find (err, hist) ->
      console.log("Error: " + err) if err
      res.send(hist);
      db.close

  app.post '/history', (req, res) ->
    console.log('req.body' + JSON.stringify(req.body))
    db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'))
    entity = new WeightHistory(req.body)
    entity.save (err, entity) ->
      console.log("Error! " + err) if err
      res.send({ direction: 'down' })

module.exports = routes