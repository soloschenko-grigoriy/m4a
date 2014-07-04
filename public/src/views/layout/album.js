/**
 * @class Artist page layout
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
  'models/album',
  'hbs!tmpl/layout/fullAlbum',
  'views/item/albums/full',
  'views/composite/songs/list-for-full-album',
  'views/composite/albums/featured-for-full'
  ], function(
    Backbone,
    Communicator,
    Album,
    Tmpl,
    AlbumView,
    SongsView,
    FeaturedAlbumsView
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
    id: 'content',
    
    /**
     * List of avaible regions
     * 
     * @type {Object}
     */
    regions: {
      album:    '.album',
      songs:    '.songs',
      featured: '.featured'
    },

    setId: function(albumId)
    {
      this.albumId = albumId;

      this.albumModel = Album.findOrCreate(this.albumId) || new Album({ id: this.albumId });

      this.albumModel.once('sync', _.bind(this.showAlbum, this)).fetch();

      return this;
    },

    showAlbum: function()
    {
      this.album.show(new AlbumView({ model: this.albumModel }));
      this.songs.show(new SongsView({ albumId: this.albumId }));
      this.featured.show(new FeaturedAlbumsView({ albumId: this.albumId }));

      return this;
    }
  });

});