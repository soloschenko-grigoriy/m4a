/**
 * @class Genre model
 *
 * version 0.0.1
 *
 * @author    Soloschenko G. soloschenko@gmail.com
 * @copyright Soloschenko G. soloschenko@gmail.com
 * 
 */
define(['backbone'], function(Backbone){

  'use strict';

  return Backbone.RelationalModel.extend({

    /**
     * Simply override costructor for best debuging
     *
     * @chainable
     * 
     * @return {Backbone.Model} 
     */
    constructor: function Genre()
    {
      
      return Backbone.RelationalModel.prototype.constructor.apply(this, arguments);
    },

    /**
     * Url for sync with server
     * 
     * @type {String}
     */
    urlRoot: '/api/v1/genres',
    
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