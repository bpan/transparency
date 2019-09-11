[![Build Status](https://travis-ci.org/bpan/transparency.svg?branch=master)](https://travis-ci.org/bpan/transparency)

# Transparency
Song lyric presentation program

# Current Deployment
https://transparency-sing.herokuapp.com/

# Project Management

* [Trello board](https://trello.com/b/5aa6l7J4/transparency)
* [UI prototype](https://marvelapp.com/ai9ebi4)

# Developer Info

### Tools needed:

* https://postgresapp.com/
  * Create a database called 'postgres'
  * Add the schema below
* brew install node
* npm install -g npm
* npm install -g gulp-cli

### Development server

To build and launch a development server (with automatic server reload):

* npm install
* gulp serve

To update package-lock.json:

* rm -rf node_modules package-lock.json
* npm install

### Schema

tenant
* tenant_id
* name

song
* song_id
* tenant_id
* title
* lyrics
* songwriters
* artists

### Production deployment

Merges to master on GitHub are automatically tested and deployed to Heroku. Download the Heroku CLI here:
https://devcenter.heroku.com/articles/heroku-cli

To test the current Heroku deployment, you can build and launch a production server locally:

* npm install
* heroku local

To build and run your local code in production mode:

* gulp clean
* gulp build
* PORT=5000 DATABASE_URL="postgres://localhost/postgres" node dist/server/server.bundle.js  
(Export environment variables to the production start script command)