/**
 * @class Composite view for group fo albums on index page
 *
 * version 0.0.1
 *
 * @author    Soloschenko G. soloschenko@gmail.com
 * @copyright Soloschenko G. soloschenko@gmail.com
 * 
 */
define([
  'backbone',
  'views/item/songs/for-full-artist',
  'hbs!tmpl/composite/songs/list-for-full-artist',
  'collections/songs',
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
    className: '',

    /**
     * Selector of place for insert items
     * 
     * @type {String}
     */
    itemViewContainer: '.songs',

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
      this.collection.fetch({
        data: {
            artist: this.artistId,
            limit: 20
        }
      });

      return this;
    }
  });

});
