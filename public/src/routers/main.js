/**
 * @class Mainrouter
 *
 * version 0.0.1
 *
 * @author    Soloschenko G. soloschenko@gmail.com
 * @copyright Soloschenko G. soloschenko@gmail.com
 * 
 */
define(['backbone'], function(Backbone){

  'use strict';
  
  return Backbone.Marionette.AppRouter.extend({

    appRoutes: {
      ''          : 'index',
      'albums'    : 'albums',
      'artists'   : 'artists',
      'charts'    : 'charts',
      'songs'     : 'songs',
      'recent'    : 'recent',
      'genres'    : 'genres',
      'moods'     : 'moods',
      'playlists' : 'playlists',

      'artists/:id' : 'artist',
    }

  });
});