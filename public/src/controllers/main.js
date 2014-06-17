/**
 * @class Main controller
 *
 * version 0.0.1
 *
 * @author    Soloschenko G. soloschenko@gmail.com
 * @copyright Soloschenko G. soloschenko@gmail.com
 * 
 */
define([
  'backbone',
  'communicator',
  'collections/albums',
  'models/album',
  'views/layout/index'
  ], function(Backbone, Communicator, Albums, Album, IndexLayout){

  'use strict';
  
  return {
    index: function()
    {
      Communicator.reqres.request('RM:getRegion', 'main').show(new IndexLayout());

    },

    some: function()
    {

    }
  };

});