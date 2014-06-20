define([
	'backbone',
	'communicator',
	'views/item/player',
  'views/item/header',
  'views/item/footer',
	],

function(Backbone, Communicator, PlayerView, HeaderView, FooterView){
	'use strict';
	
	var App = new Backbone.Marionette.Application();

	/* Add application regions here */
	App.addRegions({
		'player': '#top-bar',
		'header': 'header',
		'footer': 'footer',
	});

	/* Add initializers here */
	App.addInitializer( function () {

		App.player.show(new PlayerView());
		App.header.show(new HeaderView());
		App.footer.show(new FooterView());

		Communicator.reqres.request('RM:addRegion', 'main', 'main');
		
		Communicator.mediator.trigger('APP:START');

		// This is for pushstate
		$(document).on('click', 'a:not([data-bypass])', function(e){
			var href = $(this).prop('href'),
					root = location.protocol+'//'+location.host+'/';

			if(root===href.slice(0,root.length)){
				e.preventDefault();
				Backbone.history.navigate(href.slice(root.length), true);
			}
		});
	});
	
	return App;
});
