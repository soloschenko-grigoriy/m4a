/**
 * @class Artist page layout
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
  'hbs!tmpl/layout/profile',
  'jquery.ui.widget',
  'jquery.iframe.transport',
  'jquery.fileupload'
  ], function(
    Backbone,
    Communicator,
    Tmpl
  ){

  'use strict';
  
  return Backbone.Marionette.Layout.extend({
    
    /**
     * Wrapper template
     * 
     * @type {String}
     */
    template: Tmpl,

    /**
     * Tag name of wrapper container
     * 
     * @type {String}
     */
    tagName: 'section',

    /**
     * ID of wrapper container
     * 
     * @type {String}
     */
    id: 'content',
    
    /**
     * List of avaible regions
     * 
     * @type {Object}
     */
    regions: {
    },

    onRender: function()
    {
      this.$el.find('#ava').fileupload({
        url: '/upload',
        dataType: 'json',
        done: function (e, data) {
            $.each(data.result.files, function (index, file) {
                $('<p/>').text(file.name).appendTo('#files');
            });
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#progress .progress-bar').css(
                'width',
                progress + '%'
            );
        }
      });
    }
  });

});