Welcome to David Is A Fatty (DIAF)
-------

A mobile web app for recording your weight - just like the million other apps out there that does this.


TODO
-----
- [X] JQuery Mobile full screen iOS app
- [X] Node server
- [X] Respond to result of Ajax call to server
- [ ] Connect up storage (MongoDB for now)
- [ ] Secure data post so that anyone can't just fill up my db (likely password stored in environment variable)
- [ ] Push to Heroku (with Mongo working)
- [ ] Query for history of weights
- [ ] Display history in nice list view
- [ ] Graphing of weigth history
- [ ] Colour code with and without meal points.

Running it
------------
Ok David, when you forget here is what you want to do:
1) Run mongod to start MongoDB
2) Run bin/devserver to start an autostarting node.

Questions for Andrew
------------------------
1) I didn't have mongo running and the console returned an error but the server never responded to the ajax call.
  - How should you handel such error cases? Why did it not return? Node didn't seem to die?
2) When do you open your mongo connection in your node app?


    dbConnect = (callback) ->
    mongoose.connect(mongoUri)
    db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once 'open', callback