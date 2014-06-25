/**
 * @class Index page layout
 *
 * version 0.0.1
 *
 * @author    Soloschenko G. soloschenko@gmail.com
 * @copyright Soloschenko G. soloschenko@gmail.com
 * 
 */
define(['views/layout/items', 'views/composite/moods/all'], function(ItemsLayout, CompositeView){

  'use strict';
  
  return ItemsLayout.extend({

    initialize: function()
    {
      this.compositeView = new CompositeView();
    }
    

  });

});