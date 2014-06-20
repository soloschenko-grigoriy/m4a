/**
 * @class Main controller
 *
 * version 0.0.1
 *
 * @author    Soloschenko G. soloschenko@gmail.com
 * @copyright Soloschenko G. soloschenko@gmail.com
 * 
 */
define([
  'backbone',
  'communicator',
  'views/layout/index',
  'views/layout/albums'
  ], function(Backbone, Communicator, IndexLayout, AlbumsLayout){

  'use strict';
  
  return {

    all: function(){
      console.log('super!');
    },
    /**
     * Index route
     * 
     * @return {Marionette.Controller} 
     */
    index: function()
    {
      Communicator.reqres.request('RM:getRegion', 'main').show(new IndexLayout());
      Communicator.mediator.trigger('ROUTE:CHANGE', 'main');

      return this;
    },

    /**
     * Albums route - show all albums
     * 
     * @return {Marionette.Controller} 
     */
    albums: function()
    {
      Communicator.reqres.request('RM:getRegion', 'main').show(new AlbumsLayout());
      Communicator.mediator.trigger('ROUTE:CHANGE', 'albums');

      return this;
    },

    artists: function()
    {
      Communicator.mediator.trigger('ROUTE:CHANGE', 'artists');

      return this;
    },

    charts: function()
    {
      Communicator.mediator.trigger('ROUTE:CHANGE', 'charts');

      return this;
    },

    songs: function()
    {
      Communicator.mediator.trigger('ROUTE:CHANGE', 'songs');

      return this;
    },
    recent: function()
    {
      Communicator.mediator.trigger('ROUTE:CHANGE', 'recent');

      return this;
    },
    genres: function()
    {
      Communicator.mediator.trigger('ROUTE:CHANGE', 'genres');

      return this;
    },
    moods: function()
    {
      Communicator.mediator.trigger('ROUTE:CHANGE', 'moods');

      return this;
    },
    playlists: function()
    {
      Communicator.mediator.trigger('ROUTE:CHANGE', 'playlists');

      return this;
    }

  };

});