/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/home.html'
], function ($, _, Backbone, HomeTemplate) {
	'use strict';

	return Backbone.View.extend({

		el:  '#app',

		template: _.template(HomeTemplate),

		initialize: function ()
		{
			this.render();
		},

		render: function ()
		{
			this.$el.html(this.template({appName: '{{ appName }}' }));
		}
	});
});