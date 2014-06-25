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
  'models/artist',
  'hbs!tmpl/layout/fullArtist',
  'views/item/artists/full',
  'views/composite/songs/list-for-full-artist'
  ], function(
    Backbone,
    Communicator,
    Artist,
    Tmpl,
    ArtistView,
    SongsView
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
      artist:  '.row.artist-info',
      songs:   '.row.songs',
    },

    setId: function(artistId)
    {
      this.artistId = artistId;

      this.artistModel = new Artist({ id: this.artistId });

      this.artistModel.once('sync', _.bind(this.showArtist, this)).fetch();

      return this;
    },

    showArtist: function()
    {
      this.artist.show(new ArtistView({ model: this.artistModel }));
      this.songs.show(new SongsView({ id: this.artistId }));

      return this;
    }
  });

});