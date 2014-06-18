/**
 * @class Album model
 *
 * version 0.0.1
 *
 * @author    Soloschenko G. soloschenko@gmail.com
 * @copyright Soloschenko G. soloschenko@gmail.com
 * 
 */
define(['backbone', 'models/artist'], function(Backbone, Artist){

  'use strict';

  return Backbone.RelationalModel.extend({

    /**
     * Simply override costructor for best debuging
     *
     * @chainable
     * 
     * @return {Backbone.Model} 
     */
    constructor: function Album()
    {
        
      return Backbone.RelationalModel.prototype.constructor.apply(this, arguments);
    },

    /**
     * Url for sync with server
     * 
     * @type {String}
     */
    urlRoot: '/api/v1/albums',
    
    /**
     * Relations for the model
     * 
     * @type {Array}
     */
    relations: [{
      type              : Backbone.HasOne,
      key               : '_artist',
      relatedModel      : Artist,
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