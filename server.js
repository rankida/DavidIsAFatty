
/**
 * Module dependencies.
 */

require('coffee-script');

var express = require('express')
  , http = require('http')
  , path = require('path')
  , mongo = require('mongodb')
  , mongoose = require('mongoose')
  , RedisStore = require('connect-redis')(express)
  , flash = require('connect-flash');

// Setup Mogo db & Schemas
// ========================
mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/mydb'
mongoose.connect(mongoUri)
var db = mongoose.connection;
//var db = mongoose.createConnection(mongoUri);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() { console.log("Mongoose connection open."); });
var weightHistorySchema = mongoose.Schema({
  username: String,
  weight: Number,
  when: Date,
  direction: String,
  meal: Boolean
});
var WeightHistory = mongoose.model('Weigth', weightHistorySchema);

// Configure App
// ================
var app = module.exports = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({
    secret: 'Keep Guessing!az1234',
    store: new RedisStore({host:'127.0.0.1', port:6379})
  }));
  app.use(flash());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.configure('test', function(){
  app.set('port', 3001);
});

app.configure('production', function(){
  // app.use(express.errorHandler()); // dont know what this does!
});


require('./apps/authentication/routes')(app);

function loginRequired(req, res, next) {
  if (req.session.user) {
    next();
  }
  else {
    if (req.xhr) {
      res.send(401, "Please login");
    } else {
      res.redirect('/login?redir=' + req.url);
    }
  }
}

// Routes 
require('./apps/mobile/routes')(app, WeightHistory, mongoose, loginRequired);
require('./apps/colourflash/colourFlash')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
});
