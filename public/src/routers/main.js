/**
 * @class Mainrouter
 *
 * version 0.0.1
 *
 * @author    Soloschenko G. soloschenko@gmail.com
 * @copyright Soloschenko G. soloschenko@gmail.com
 * 
 */
define(['backbone'], function(Backbone){

  'use strict';
  
  return Backbone.Marionette.AppRouter.extend({

    appRoutes: {
      ''     : 'index',
      'some' : 'some'
    }

  });
});