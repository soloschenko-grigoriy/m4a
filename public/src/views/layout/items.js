/**
 * @class Index page layout
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
  'hbs!tmpl/layout/items'
  ], function(
    Backbone,
    Communicator,
    Tmpl
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
      items:   '.items',
    },

    compositeView: null,

    /**
     * When render occured
     *
     * @chainable
     * 
     * @return {Index} 
     */
    onRender: function()
    {
      this.items.show(this.compositeView);

      return this;
    }
  });

});