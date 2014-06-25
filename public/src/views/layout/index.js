/**
 * @class Index page layout
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
  'hbs!tmpl/layout/index',
  'views/composite/albums/index',
  'views/composite/artists/index',
  'views/composite/genres/index',
  'views/composite/moods/index',
  'views/composite/songs/index',
  'views/composite/songs/index-popular',
  ], function(
    Backbone,
    Communicator,
    Tmpl,
    AlbumsCompositeView,
    ArtistsCompositeView,
    GenresCompositeView,
    MoodsCompositeView,
    SongsCompositeView,
    PopularCompositeView
  ){

  'use strict';
  
  return Backbone.Marionette.Layout.extend({
    
    /**
     * Wrapper template
     * 
     * @type {String}
     */
    template: Tmpl,

    /**
     * Tag name of wrapper container
     * 
     * @type {String}
     */
    tagName: 'section',

    /**
     * ID of wrapper container
     * 
     * @type {String}
     */
    id: 'latest-content',
    
    /**
     * List of avaible regions
     * 
     * @type {Object}
     */
    regions: {
      albums:   '.albums',
      artists:  '.artists',
      popular:  '.popular',
      genres:   '.genres',
      moods:    '.moods',
      songs:    '.songs'
    },

    /**
     * When render occured
     *
     * @chainable
     * 
     * @return {Index} 
     */
    onRender: function()
    {
      this.albums.show(new AlbumsCompositeView());
      this.artists.show(new ArtistsCompositeView());
      this.songs.show(new SongsCompositeView());
      this.popular.show(new PopularCompositeView());
      this.genres.show(new GenresCompositeView());
      this.moods.show(new MoodsCompositeView());

      return this;
    }
  });

});