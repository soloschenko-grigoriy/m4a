/**
 * @class Artists collection
 *
 * version 0.0.1
 *
 * @author    Soloschenko G. soloschenko@gmail.com
 * @copyright Soloschenko G. soloschenko@gmail.com
 * 
 */
define(['backbone', 'models/genre'], function(Backbone, Model){
  
  'use strict';

  return Backbone.Collection.extend({

    /**
     * Simply override costructor for best debuging
     *
     * @chainable
     * 
     * @return {Backbone.Collection} 
     */
    constructor: function Genres()
    {
      
      return Backbone.Collection.prototype.constructor.apply(this, arguments);
    },

    /**
     * Url for sync with server
     * 
     * @type {String}
     */
    url: '/api/v1/genres',
    
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

    /**
     * Fecth data for index page
     * 
     * @return {Backbone.Collection} 
     */
    fetchForIndex: function()
    {
      return this.fetch({
        data: {
          limit: 12,
          sort: '-date'
        }
      });
    },

    /**
     * Load data from server
     * 
     * @param  {Object} params 
     * 
     * @return {Backbone.Collection}        
     */
    load: function(params)
    {
      params = params || {};

      this.fetch({
        data: {
          page  : params.page,
          limit : 48,
        },
        success   : params.success,
        error     : params.error,
        remove    : false
      });

      return this;
    }
  });
});