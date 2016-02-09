require.config({
  baseUrl: ".",
  urlArgs: 'cb=' + Math.random(),
  paths: {
	jquery: '../../bower_components/jquery/dist/jquery',
	underscore: '../../bower_components/underscore/underscore',
	backbone: '../../bower_components/backbone/backbone',
	text: '../../bower_components/text/text',
    jasmine: '../../test/lib/jasmine',
    'jasmine-html': '../../test/lib/jasmine-html',
    spec: '../../test/jasmine/spec/'
  },
  shim: {
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'backbone.localStorage': {
      deps: ['backbone'],
      exports: 'Backbone'
    },
    jasmine: {
      exports: 'jasmine'
    },
    'jasmine-html': {
      deps: ['jasmine'],
      exports: 'jasmine'
    }
  }
});


window.store = "TestStore"; // override local storage store name - for testing

require(['underscore', 'jquery', 'jasmine-html'], function(_, $, jasmine){

  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 1000;

  var htmlReporter = new jasmine.HtmlReporter();

  jasmineEnv.addReporter(htmlReporter);

  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };

  var specs = [];

  specs.push('spec/models/modelSpec');


  $(function(){
    require(specs, function(){
      jasmineEnv.execute();
    });
  });

});
