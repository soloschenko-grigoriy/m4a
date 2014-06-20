require.config({

    baseUrl: "/src",

    shim: {
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    },

    paths: {
        jquery: '../vendor/jquery/jquery',
        backbone: '../vendor/backbone/backbone',
        underscore: '../vendor/underscore/underscore',

        /* alias all marionette libs */
        'backbone.marionette': '../vendor/backbone.marionette/lib/core/amd/backbone.marionette',
        'backbone.wreqr': '../vendor/backbone.wreqr/lib/amd/backbone.wreqr',
        'backbone.babysitter': '../vendor/backbone.babysitter/lib/amd/backbone.babysitter',
        'backbone.relational': '../vendor/backbone-relational/backbone-relational',

        /* alias the bootstrap js lib */
        bootstrap: '../vendor/bootstrap/dist/js/bootstrap.min',

        /* Alias text.js for template loading and shortcut the templates dir to tmpl */
        text: '../vendor/requirejs-text/text',
        tmpl: "../templates",
        
        /* handlebars from the require handlerbars plugin below */
        handlebars: '../vendor/require-handlebars-plugin/Handlebars',

        /* require handlebars plugin - Alex Sexton */
        i18nprecompile: '../vendor/require-handlebars-plugin/hbs/i18nprecompile',
        json2: '../vendor/require-handlebars-plugin/hbs/json2',
        hbs: '../vendor/require-handlebars-plugin/hbs'
    },

    hbs: {
        disableI18n: true,
        helperDirectory: 'views/helpers/'
    }
});
require([
  'backbone',
  'bootstrap',
  'backbone.marionette',
  'backbone.relational'
],
function () {
    'use strict';
    
    require(['application', 'regionManager', 'controllers/main', 'routers/main'], function(App, RM, MainController, MainRouter){
        
      $.ajaxSetup({
        headers: {'X-CSRF-Token': function(name){
            var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
            return matches ? decodeURIComponent(matches[1]) : undefined;
        }('csrf_token')
      }
      });

      App.start();

      new MainRouter({ controller: MainController });
      
      Backbone.history.start({ pushState: true });
    });
    
});
