Welcome to David Is A Fatty (DIAF)
-------

A mobile web app for recording your weight - just like the million other apps out there that does this.


TODO
-----
- [X] JQuery Mobile full screen iOS app
- [X] Node server
- [X] Respond to result of Ajax call to server
- [X] Connect up storage (MongoDB for now)
- [X] Secure data post so that anyone can't just fill up my db (likely password stored in environment variable)
- [X] Push to Heroku (with Mongo working)
- [ ] Remove stubbed out Direction returned by record weight
- [X] Query for history of weights
- [X] Display history in nice list view
- [ ] Fix page transitions so that you go 'back' to home
- [ ] Fix history refresh - you see the old history until you get the new one
- [X] Deal with not being logged in and moving within the page.
- [ ] Add Logout
- [ ] Add a 'Add to Homescreen' page to the very start of the app
- [ ] Graphing of weigth history
- [ ] Colour code with and without meal points.

Running it
------------
Ok David, when you forget here is what you want to do:

1. Run ``mongod`` to start MongoDB
3. Run ``redis-server /usr/local/etc/redis.conf`` to start Redis (having installed via ``brew install redis``)
2. Run ``bin/devserver`` to start an autostarting node.
3. For tests you can run ``bin/test`` (you can also run ``npm test``)

If you want to see the latest deployed version then visit http://davidisafatty.herokuapp.com/mobile on your iPhone.
