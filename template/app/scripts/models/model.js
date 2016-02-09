define([
	'backbone'
], function(Backbone) {

	return Backbone.Model.extend({

		defaults: {
			title: 'A test',
			completed: false
		}

	});

});