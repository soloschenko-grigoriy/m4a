/**
 * @class Composite view for group fo artists on index page
 *
 * version 0.0.1
 *
 * @author    Soloschenko G. soloschenko@gmail.com
 * @copyright Soloschenko G. soloschenko@gmail.com
 * 
 */
define([
  'backbone',
  'views/item/artists/index',
  'hbs!tmpl/composite/artists/index',
  'collections/artists',
],
function(Backbone, ItemView, Tmpl, Collection) {
  'use strict';

  return Backbone.Marionette.CompositeView.extend({

    /**
     * Wrapper template
     * 
     * @type {String}
     */
    template: Tmpl,

    /**
     * A view for each item
     * 
     * @type {Backbone.Marionette.ItemView}
     */
    itemView: ItemView,

    /**
     * Class name for container
     * @type {String}
     */
    className: 'row',

    /**
     * Selector of place for insert items
     * 
     * @type {String}
     */
    itemViewContainer: '.place',

    /**
     * A collection of items for iterating
     * 
     * @type {Albums}
     */
    collection: new Collection(),

    /**
     * Initialization of class
     * 
     * @return {Backbone.Marionette.CompositeView} 
     */
    initialize: function()
    {
      this.collection.fetchForIndex();

      return this;
    },
    
    /**
     * On render callback
     * 
     * @return {Backbone.Marionette.CompositeView} 
     */
    onRender: function()
    {
      this.$el.find('.loader').remove();
      
      return this;
    }
  });

});
