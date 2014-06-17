/**
 * @class Album collection
 *
 * version 0.0.1
 *
 * @author    Soloschenko G. soloschenko@gmail.com
 * @copyright Soloschenko G. soloschenko@gmail.com
 * 
 */
define(['backbone', 'models/album'], function(Backbone, Model){

  'use strict';

  return Backbone.Collection.extend({

    /**
     * Simply override costructor for best debuging
     *
     * @chainable
     * 
     * @return {Backbone.Model} 
     */
    constructor: function Albums()
    {
      
      return Backbone.Collection.prototype.constructor.apply(this, arguments);
    },


    /**
     * Url for sync with server
     * 
     * @type {String}
     */
    url: '/api/v1/albums',

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