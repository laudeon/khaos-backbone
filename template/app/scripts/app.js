/*global require*/
'use strict';

// Require.js allows us to configure shortcut alias
require.config({
	// The shim config allows us to configure dependencies for
	// scripts that do not call define() to register a module
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		backboneLocalstorage: {
			deps: ['backbone'],
			exports: 'Store'
		}
	},
	paths: {
		jquery: '../bower_components/jquery/dist/jquery',
		underscore: '../bower_components/underscore/underscore',
		backbone: '../bower_components/backbone/backbone',
		backboneLocalstorage: '../bower_components/backbone.localstorage/backbone.localStorage',
		text: '../bower_components/text/text',
		bootstrap: '../bower_components/bootstrap/dist/js/bootstrap'
	}
});

require([
	'backbone',
	'underscore',
	'jquery',
	'bootstrap',
	'routers/app'
], function (Backbone, _, $, bootstrap, AppRouter) {
	// Initialize routing and start Backbone.history()
	var router = new AppRouter();
	if (!Backbone.history.start()) router.navigate('404', {trigger:true});
});
