/**
 * [description]
 * 
 * @param  {[type]}   [description]
 * @return {[type]}   [description]
 */
define(['backbone'],
function( Backbone ) {
    'use strict';

	/* Return a Region class definition */
	return Backbone.Marionette.Region.extend({

		initialize: function() {
			console.log("initialize a Player Region");
		}
	});

});
