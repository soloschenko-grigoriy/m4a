/**
 * @class Songs model
 *
 * version 0.0.1
 *
 * @author    Soloschenko G. soloschenko@gmail.com
 * @copyright Soloschenko G. soloschenko@gmail.com
 * 
 */
define([
  'backbone',
  'models/artist',
  'models/album',
  'models/genre',
  'collections/genres'
  ], function(Backbone, Artist, Album, Genre, Genres){

  'use strict';

  return Backbone.RelationalModel.extend({

    /**
     * Simply override costructor for best debuging
     *
     * @chainable
     * 
     * @return {Backbone.Model} 
     */
    constructor: function Song()
    {
      
      return Backbone.RelationalModel.prototype.constructor.apply(this, arguments);
    },

    /**
     * Relations for the model
     * 
     * @type {Array}
     */
    relations: [{
      type              : Backbone.HasOne,
      key               : 'album',
      relatedModel      : Album,
      // autoFetch         : true
    },
    {
      type              : Backbone.HasOne,
      key               : 'artist',
      relatedModel      : Artist,
      // autoFetch         : true
    },
    {
      type              : Backbone.HasMany,
      key               : 'genres',
      relatedModel      : Genre,
      // autoFetch         : true,
      collectionType    : Genres
    }],

    /**
     * Url for sync with server
     * 
     * @type {String}
     */
    urlRoot: '/api/v1/songs',
    
    /**
     * Initialization
     *
     * @chainable
     * 
     * @return {Backbone.Collection} 
     */
    initialize: function()
    {
      
      return this;
    },

    parse: function(response)
    {
      response.id = response._id;

      return response;
    }

  });
});