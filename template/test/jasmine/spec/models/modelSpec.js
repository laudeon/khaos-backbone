define(['./../../../../../app/scripts/models/model'], function(Model) {
	describe('Model :: model', function () {

		beforeEach(function () {
			this.model = new Model();
		});

		describe('.Create()', function () {

			it('Model should equal to the default model value', function () {

				runs(function () {
					expect(this.model).not.toBe(null);
					expect(this.model.get('completed')).toEqual(false);
					expect(this.model.get('title')).toEqual('A test');
				});

			});

		});


	});
});