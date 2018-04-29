# transparency
Song lyric presentation program

# Try it out
https://transparency-sing.herokuapp.com/

# Developer Info

Tools needed:

* https://postgresapp.com/
  * Create a database called 'postgres'
  * Add the schema below
* brew install node
* npm install -g npm
* npm install -g gulp-cli

After cloning the repository:

* npm install
* gulp serve

Project Management

* [Trello board](https://trello.com/b/5aa6l7J4/transparency)
* [UI prototype](https://marvelapp.com/ai9ebi4)

# Schema

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
