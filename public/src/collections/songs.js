/**
 * @class Album collection
 *
 * version 0.0.1
 *
 * @author    Soloschenko G. soloschenko@gmail.com
 * @copyright Soloschenko G. soloschenko@gmail.com
 * 
 */
define(['backbone', 'models/song'], function(Backbone, Model){

  'use strict';

  return Backbone.Collection.extend({

    /**
     * Simply override costructor for best debuging
     *
     * @chainable
     * 
     * @return {Backbone.Collection} 
     */
    constructor: function Songs()
    {
      
      return Backbone.Collection.prototype.constructor.apply(this, arguments);
    },

    /**
     * Url for sync with server
     * 
     * @type {String}
     */
    url: '/api/v1/songs',
    
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