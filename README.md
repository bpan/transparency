# Transparency
Song lyric presentation program

# Try it out
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

To build and launch a development server (with automatic reload):

* npm install
* gulp serve

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

### Heroku

Download the CLI here: https://devcenter.heroku.com/articles/heroku-cli

To build and launch a production server locally:

* npm install
* heroku local