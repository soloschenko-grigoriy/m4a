'use strict';

/**
 * Module dependencies.
 */
var home    = require('home'),
    albums  = require('albums'),
    artists = require('artists'),
    songs   = require('songs'),
    genres  = require('genres'),
    moods   = require('moods');

/**
 * Expose
 */
module.exports = function (app){
  
  // Simple routes
  app.get('/', home.index);
  app.get('/login', home.login);
  app.post('/login', home.loginProcess);
  app.get('/registration', home.registration);
  app.post('/registration', home.registrationProcess);
  
  app.post('/upload', home.upload);
  
  app.get('/albums',  home.index);
  app.get('/artists', home.index);
  app.get('/songs',   home.index);
  app.get('/charts', home.index);
  app.get('/recent', home.index);
  app.get('/genres', home.index);
  app.get('/moods', home.index);
  app.get('/playlists', home.index);
  app.get('/profile', home.index);

  app.get('/artists/:id', home.index);
  app.get('/albums/:id', home.index);

  var prefix = '/api/v1';

  // Albums controllers 
  app.get(prefix+'/albums',     albums.list);
  app.get(prefix+'/albums/:id', albums.load);
  app.post(prefix+'/albums',    albums.create);

  // Artist conrollers
  app.get(prefix+'/artists',      artists.list);
  app.get(prefix+'/artists/:id',  artists.load);
  app.post(prefix+'/artists',     artists.create);

  // Songs conrollers
  app.get(prefix+'/songs',      songs.list);
  app.get(prefix+'/songs/:id',  songs.load);
  app.post(prefix+'/songs',     songs.create);

  // Genres controllers
  app.get(prefix+'/genres',     genres.list);
  app.get(prefix+'/genres/:id', genres.load);
  app.post(prefix+'/genres',    genres.create);

  // Moods controllers
  app.get(prefix+'/moods',     moods.list);
  app.get(prefix+'/moods/:id', moods.load);
  app.post(prefix+'/moods',    moods.create);

  /**
   * Error handling
   */
  app.use(function (err, req, res, next){
    res.status(500).send('500', err.stack);
  });

  // assume 404 since no middleware responded
  app.use(function (req, res, next) {
    res.status(404).send('404', 'Not found');
  });
};
