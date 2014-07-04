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
  'hbs!tmpl/composite/songs/list-for-full-album',
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
     * 
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
     * @property {Number} - Current page
     */
    page: 1,
    
    /**
     * Initialization of class
     * 
     * @return {Backbone.Marionette.CompositeView} 
     */
    initialize: function(params)
    {
      this.collection
        .on('sync', _.bind(this.prepereIndex, this))
        .fetch({
          data: {
            album: params.albumId,
            limit: 100
          }
        });

      // $(window).on('scroll', _.bind(this.onScroll, this));

      return this;
    },

    /**
     * Set an index parameter to eaxh item model
     *
     * @chainable
     * 
     * @return {Backbone.Marionette.CompositeView} 
     */
    prepereIndex: function()
    {
      this.collection.each(function(model, key){
        model.set('index', key+1);
      });

      this.render();

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
