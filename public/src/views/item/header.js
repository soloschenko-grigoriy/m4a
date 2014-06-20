define([
	'backbone',
  'communicator',
	'hbs!tmpl/item/header'
],
function( Backbone, Communicator, HeaderTmpl) {
    
  'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

    /**
     * General initilization
     * 
     * @return {Backbone.Marionette.ItemView} 
     */
		initialize: function()
    {
      Communicator.mediator.on('ROUTE:CHANGE', this.changeMenuActiveItem, this);

      return this;
    },
		
    /**
     * When route been changed- change the active item
     * 
     * @param  {String} item - A name of route, been executed
     * 
     * @return {Backbone.Marionette.ItemView}      
     */
    changeMenuActiveItem: function(item)
    {
      var selector = '.nav-';
      switch(item){
        case 'albums'     : selector += 'albums'; break;
        case 'artists'    : selector += 'artists'; break;
        case 'charts'     : selector += 'charts'; break;
        case 'songs'      : selector += 'songs'; break;
        case 'recent'     : selector += 'recent'; break;
        case 'genres'     : selector += 'genres'; break;
        case 'moods'      : selector += 'moods'; break;
        case 'playlists'  : selector += 'playlists'; break;
        
        default           : selector += 'home';
      }

      this.$el.find('.nav li').removeClass('current');
      this.$el.find(selector).addClass('current');

      return this;
    },

    template: HeaderTmpl,

		/* on render callback */
		onRender: function(){}
	});

});
