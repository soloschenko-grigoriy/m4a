define([
	'backbone',
	'hbs!tmpl/item/main'
],
function( Backbone, MainTmpl  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function() {
			console.log("initialize a Main ItemView");
		},
		
    	template: MainTmpl,
        

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
