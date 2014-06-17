/**
 * @class Artists collection
 *
 * version 0.0.1
 *
 * @author    Soloschenko G. soloschenko@gmail.com
 * @copyright Soloschenko G. soloschenko@gmail.com
 * 
 */
define(['backbone', 'models/artist'], function(Backbone, Model){
  
  'use strict';

  return Backbone.Collection.extend({

    /**
     * Simply override costructor for best debuging
     *
     * @chainable
     * 
     * @return {Backbone.Collection} 
     */
    constructor: function Artists()
    {
      
      return Backbone.Collection.prototype.constructor.apply(this, arguments);
    },

    /**
     * Url for sync with server
     * 
     * @type {String}
     */
    url: '/api/v1/artists',
    
    /**
     * Model object type
     * 
     * @type {Backbone.Model}
     */
    model: Model,

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

  });
});