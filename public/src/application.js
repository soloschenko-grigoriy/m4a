define([
	'backbone',
	'communicator',
	'views/item/player',
  'views/item/header',
  'views/item/footer',
  'models/song',
  'collections/genres',
  'collections/albums',
  'collections/artists'
	],

function(Backbone, Communicator, PlayerView, HeaderView, FooterView, Song, Genres, Albums, Artists){
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

		var albums = new Albums(),
				genres = new Genres(),
				artists = new Artists();

		// artists.once('sync', function(){
		// 	genres.once('sync', function(){
		// 		albums.once('sync', function(){
		// 			_.delay(function(){
		// 				for(var k = 0; k<=1000; k++){
		// 					var ge = new Genres();
		// 					for(var i =0; i <= _.random(1, genres.length); i++){
		// 						ge.add(genres.at(i));
		// 					}

		// 					var album = _.sample(albums.models);
		// 					// console.log(album.get('id'), album.get('artist').get('_id'));
		// 					var x = new Song({
		// 						name  : 'Song_'+k,
		// 						img   : _.random(1, 4)+'.png',
		// 						album : album,
		// 						artist: album.get('artist'),
		// 						genres : ge,
		// 					});
		// 					console.log(x);
		// 					x.save();
		// 				}
		// 			}, 1000)
					
		// 		}).fetch();
		// 	}).fetch();
		// }).fetch();
	});
	
	return App;
});
