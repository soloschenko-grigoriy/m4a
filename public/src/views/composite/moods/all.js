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
  'views/item/moods/index',
  'hbs!tmpl/composite/moods/all',
  'collections/moods',
],
function(Backbone, ItemView, Tmpl, Collection) {

  'use strict';

  return Backbone.Marionette.CompositeView.extend({

    /**
     * Simply override costructor for best debuging
     *
     * @chainable
     * 
     * @return {Backbone.Model} 
     */
    constructor: function MoodsAllCompositeView()
    {
      
      return Backbone.Marionette.CompositeView.prototype.constructor.apply(this, arguments);
    },

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
    itemViewContainer: '.row.moods',

    /**
     * A collection of items for iterating
     * 
     * @type {Albums}
     */
    collection: new Collection(),

    /**
     * @property {Number} - Current page
     */
    page: 1,
    
    /**
     * Initialization of class
     * 
     * @return {Backbone.Marionette.CompositeView} 
     */
    initialize: function()
    {
      this.collection.load();

      $(window).on('scroll', _.bind(this.onScroll, this));

      return this;
    },
    
    /**
     * On render callback
     * 
     * @return {Backbone.Marionette.CompositeView} 
     */
    onRender: function()
    {
      this.$el.find('.loader').hide();

      return this;
    },

    /**
     * When window been scrolled
     *
     * @chainable
     * 
     * @param  {Event} event - A fired event
     * 
     * @return {ArtistsCompositeView}       
     */
    onScroll: function(event)
    {
      if($(window).scrollTop() === $(document).height() - $(window).height()){
        $(window).off('scroll');
        
        this.$el.append(this.$el.find('.loader'));
        this.$el.find('.loader').show();

        this.collection.load({
          page    : this.page,
          success : _.bind(this.onLoad, this),
          error   : _.bind(this.onError, this)
        });

        this.page++;
      }

      return this;
    },

    /**
     * When collection been loaded
     *
     * @chainable
     * 
     * @param  {Backbone.Collection}  collection 
     * @param  {Object}               response   
     * @param  {Object}               options    
     * 
     * @return {ArtistsCompositeView}            
     */
    onLoad: function(collection, response, options)
    {
      if(response.length > 0){
        $(window).on('scroll', _.bind(this.onScroll, this));
      }
      
      this.$el.find('.loader').hide();

      return this;
    },

    /**
     * When loading finished with error
     * 
     * @chainable
     * 
     * @param  {Backbone.Collection}  collection 
     * @param  {Object}               response   
     * @param  {Object}               options    
     * 
     * @return {ArtistsCompositeView}  
     */
    onError: function(collection, response, options)
    {
      this.$el.find('.loader').hide();

      return this;
    }

  });

});
