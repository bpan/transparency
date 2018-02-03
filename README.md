# transparency
Song lyric presentation program

# Try it out
https://transparency-sing.herokuapp.com/

# Developer Info

Tools needed:

* https://postgresapp.com/
* brew install node
* npm install -g npm
* npm install -g gulp

After cloning the repository:

* npm install
* gulp serve

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