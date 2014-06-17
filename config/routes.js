'use strict';

/**
 * Module dependencies.
 */
var home    = require('home'),
    albums  = require('albums'),
    artists = require('artists'),
    songs   = require('songs');

/**
 * Expose
 */
module.exports = function (app){
  
  app.get('/', home.index);
  app.get('/some', home.index);

  var prefix = '/api/v1';

  // Albums controllers
  app.get(prefix+'/albums', albums.list);
  app.get(prefix+'/albums/:id', albums.load);

  // Artist conrollers
  app.get(prefix+'/artists', artists.list);
  app.get(prefix+'/artists/:id', artists.load);

  // Songs conrollers
  app.get(prefix+'/songs', songs.list);
  app.get(prefix+'/songs/:id', songs.load);

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
