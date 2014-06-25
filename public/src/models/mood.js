/**
 * @class Album model
 *
 * version 0.0.1
 *
 * @author    Soloschenko G. soloschenko@gmail.com
 * @copyright Soloschenko G. soloschenko@gmail.com
 * 
 */
define(['backbone'], function(Backbone){

  'use strict';

  return Backbone.Model.extend({

    /**
     * Simply override costructor for best debuging
     *
     * @chainable
     * 
     * @return {Backbone.Model} 
     */
    constructor: function Mood()
    {
        
      return Backbone.Model.prototype.constructor.apply(this, arguments);
    },

    /**
     * Url for sync with server
     * 
     * @type {String}
     */
    urlRoot: '/api/v1/moods',

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