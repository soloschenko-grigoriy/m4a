define([
	'backbone',
	'hbs!tmpl/item/footer'
],
function( Backbone, FooterTmpl  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function() {
			console.log('initialize a Footer ItemView');
		},

    template: FooterTmpl,
        
    ui: {},

		/* Ui events hash */
		events: {
      'click .toTop': 'toTopClocked'
    },

		/* on render callback */
		onRender: function() {},
    toTopClocked: function(){
      $('html, body').animate({ scrollTop: 0 }, "slow");
    }
	});

});
