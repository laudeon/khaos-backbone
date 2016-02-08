/*global define*/
define([
	'backbone',
	'views/hello',
	'views/home',
	'views/notfound'
], function (Backbone, HelloView, HomeView, NotFoundView) {
	'use strict';

	return Backbone.Router.extend({
		routes: {
			'': 'home',
			'hello/:name' : 'hello',
			'404': 'notFound'
		},

		home: function() {
			new HomeView();
		},

		hello: function(name) {
			new HelloView({name: name});
		},

		notFound: function() {
			new NotFoundView();
		}

	});

});