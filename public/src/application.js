define([
	'backbone', 
	'communicator', 
	'views/item/player', 
	'views/item/header', 
	'views/item/footer', 
	'views/item/main',
	],

function( Backbone, Communicator, PlayerView, HeaderView, FooterView, MainView){
	'use strict';
	
	var App = new Backbone.Marionette.Application();

	/* Add application regions here */
	App.addRegions({
		main   : 'main',
		header : 'header',
		footer : 'footer',
		player : '#top-bar'
	});

	/* Add initializers here */
	App.addInitializer( function () {
		App.player.show(new PlayerView());
		App.header.show(new HeaderView());
		App.footer.show(new FooterView());
		App.main.show(new MainView());

		Communicator.mediator.trigger('APP:START');

	});
	
	return App;
});
