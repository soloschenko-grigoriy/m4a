/**
 * @class View for one artist on index page
 *
 * version 0.0.1
 *
 * @author    Soloschenko G. soloschenko@gmail.com
 * @copyright Soloschenko G. soloschenko@gmail.com
 * 
 */
define([
  'backbone',
  'hbs!tmpl/item/artists/full'
],
function(Backbone, Tmpl){
  
  'use strict';

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    template: Tmpl,

    /* Ui events hash */
    events: {},

    className: '',

    initialize: function()
    {
    },

    onRender: function()
    {
      
    }
  });

});
