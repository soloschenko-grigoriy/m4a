'use strict';

/**
 * Module dependencies.
 */
var home   = require('home'),
    albums = require('albums');

/**
 * Expose
 */
module.exports = function (app){
  app.get('/', home.index);

  var prefix = '/api/v1';

  app.get(prefix+'/albums', albums.list);
  app.get(prefix+'/albums/:id', albums.load);

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
