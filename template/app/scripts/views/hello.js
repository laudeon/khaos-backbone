/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/hello.html'
], function ($, _, Backbone, HelloTemplate) {
	'use strict';

	return Backbone.View.extend({

		el:  '#app',

		template: _.template(HelloTemplate),

		initialize: function (options)
		{
			this.render(options.name);
		},

		render: function (name)
		{
			this.$el.html(this.template({name: name }));
		}
	});
});