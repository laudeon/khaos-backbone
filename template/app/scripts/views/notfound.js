/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/notfound.html'
], function ($, _, Backbone, NotFoundTemplate) {
	'use strict';

	return Backbone.View.extend({

		el:  '#app',

		template: _.template(NotFoundTemplate),

		initialize: function ()
		{
			this.render();
		},

		render: function ()
		{
			this.$el.html(this.template());
		}
	});
});