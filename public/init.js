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
        backbone: '../vendor/backbone-amd/backbone',
        underscore: '../vendor/underscore-amd/underscore',

        /* alias all marionette libs */
        'backbone.marionette': '../vendor/backbone.marionette/lib/core/amd/backbone.marionette',
        'backbone.wreqr': '../vendor/backbone.wreqr/lib/amd/backbone.wreqr',
        'backbone.babysitter': '../vendor/backbone.babysitter/lib/amd/backbone.babysitter',

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
        disableI18n: true
    }
});
require([
  'application',
  'backbone',
  'bootstrap',
  'backbone.marionette',
  'regionManager',
  'text!../assets/css/bootstrap.min.css',
  'text!../assets/css/main.css',
  'text!../assets/css/responsive.css'
],
function (App) {
    'use strict';

    App.start();
});
