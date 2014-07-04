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
  'views/layout/albums',
  'views/layout/artists',
  'views/layout/recent',
  'views/layout/charts',
  'views/layout/genres',
  'views/layout/moods',
  'views/layout/artist',
  'views/layout/album',
  ], function(
    Backbone,
    Communicator,
    IndexLayout,
    AlbumsLayout,
    ArtistsLayout,
    RecentLayout,
    ChartsLayout,
    GenresLayout,
    MoodsLayout,
    ArtistLayout,
    AlbumLayout
  ){

  'use strict';
  
  return {

    /**
     * Index route
     * 
     * @return {Marionette.Controller} 
     */
    index: function()
    {
      Communicator.reqres.request('RM:getRegion', 'main').show(new IndexLayout());
      Communicator.mediator.trigger('ROUTE:CHANGE', 'main');

      $(window).scrollTop();

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

      $(window).scrollTop();

      return this;
    },

    /**
     * Artists route
     * 
     * @return {Marionette.Controller} 
     */
    artists: function()
    {
      Communicator.reqres.request('RM:getRegion', 'main').show(new ArtistsLayout());
      Communicator.mediator.trigger('ROUTE:CHANGE', 'artists');

      $(document).scrollTop();

      return this;
    },

    /**
     * Charts route
     * 
     * @return {Marionette.Controller} 
     */
    charts: function()
    {
      Communicator.reqres.request('RM:getRegion', 'main').show(new ChartsLayout());
      Communicator.mediator.trigger('ROUTE:CHANGE', 'charts');

      $(window).scrollTop();

      return this;
    },

    /**
     * Songs route
     * 
     * @return {Marionette.Controller} 
     */
    songs: function()
    {
      Communicator.mediator.trigger('ROUTE:CHANGE', 'songs');

      $(window).scrollTop();

      return this;
    },

    /**
     * Recent route
     * 
     * @return {Marionette.Controller} 
     */
    recent: function()
    {
      Communicator.reqres.request('RM:getRegion', 'main').show(new RecentLayout());
      Communicator.mediator.trigger('ROUTE:CHANGE', 'recent');

      $(window).scrollTop();
      return this;
    },

    /**
     * Genres route
     * 
     * @return {Marionette.Controller} 
     */
    genres: function()
    {
      Communicator.reqres.request('RM:getRegion', 'main').show(new GenresLayout());
      Communicator.mediator.trigger('ROUTE:CHANGE', 'genres');

      $(window).scrollTop();

      return this;
    },

    /**
     * Moods route
     * 
     * @return {Marionette.Controller} 
     */
    moods: function()
    {
      Communicator.reqres.request('RM:getRegion', 'main').show(new MoodsLayout());
      Communicator.mediator.trigger('ROUTE:CHANGE', 'moods');

      $(window).scrollTop();

      return this;
    },

    /**
     * Playlists route
     * 
     * @return {Marionette.Controller} 
     */
    playlists: function()
    {
      Communicator.mediator.trigger('ROUTE:CHANGE', 'playlists');

      $(window).scrollTop();
      return this;
    },

    /**
     * Artist route - show all albums
     * 
     * @return {Marionette.Controller} 
     */
    artist: function(id)
    {
      Communicator.reqres.request('RM:getRegion', 'main').show(new ArtistLayout().setId(id));
      Communicator.mediator.trigger('ROUTE:CHANGE', 'artists');

      $(window).scrollTop();

      return this;
    },

    /**
     * Artist route - show all albums
     * 
     * @return {Marionette.Controller} 
     */
    album: function(id)
    {
      Communicator.reqres.request('RM:getRegion', 'main').show(new AlbumLayout().setId(id));
      Communicator.mediator.trigger('ROUTE:CHANGE', 'albums');

      $(window).scrollTop();

      return this;
    },

  };

});