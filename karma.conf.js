module.exports = function(config){
  config.set({


    basePath : './',

    preprocessors: {
      'app/components/lazy-carousel/view/**/*.html':['ng-html2js'],
    },

    ngHtml2JsPreprocessor: {
    // the name of the Angular module to create
      stripPrefix: 'app/',
      moduleName: "templates"
    },

    files : [
      'app/bower_components/jquery/dist/jquery.js',
      'app/bower_components/jasmine-jquery/lib/jasmine-jquery-1.3.1.js',
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/components/lazy-carousel/lazy-carousel.module.js',
      'app/components/lazy-carousel/*.js',
      'app/components/lazy-carousel/view/**/*.html'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['PhantomJS'],

    plugins : [
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-ng-html2js-preprocessor'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
