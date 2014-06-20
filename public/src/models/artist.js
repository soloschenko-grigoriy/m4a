/**
 * @class Artist model
 *
 * version 0.0.1
 *
 * @author    Soloschenko G. soloschenko@gmail.com
 * @copyright Soloschenko G. soloschenko@gmail.com
 * 
 */
define(['backbone', 'models/genre', 'collections/genres'], function(Backbone, Genre, Genres){

  'use strict';

  return Backbone.RelationalModel.extend({

    /**
     * Simply override costructor for best debuging
     *
     * @chainable
     * 
     * @return {Backbone.Model} 
     */
    constructor: function Artist()
    {
      
      return Backbone.RelationalModel.prototype.constructor.apply(this, arguments);
    },

    /**
     * Url for sync with server
     * 
     * @type {String}
     */
    urlRoot: '/api/v1/artists',
    
    /**
     * Relations for the model
     * 
     * @type {Array}
     */
    relations: [{
      type              : Backbone.HasMany,
      key               : 'genres',
      relatedModel      : Genre,
      collectionType    : Genres,
      // autoFetch         : true,
    }],

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