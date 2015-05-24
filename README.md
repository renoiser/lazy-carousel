# Lazy Carousel  
An Angular.js lazy-loading-carousel directive by RL
## Demo - http://renatolongobardi.github.io/lazy-carousel/

## Installation

Directive for instantiate a responsive lazy loading carousel from a JSON. 
Available as bower component for your project:

```
$ bower install rl-lazy-carousel
```
Also you can clone this repository:

```
git clone https://github.com/renatolongobardi/lazy-carousel.git
cd lazy-carousel
```
Add `lazy-carousel.js` and `lazy-carousel.css` to your project from bower package

## Usage

Add `rl.lazy-carousel` as a depency of your App: 
```
angular.module('yourApp',['rl.lazy-carousel'])
```
Then lazy-carousel directive is ready. Remember to add a source attribute that link to a JSON file. Example:
```
<div lazy-carousel data-source="path_to_your_json"></div>
```

## Json file by source attr
Lazy Carousel use a JSON file to generate automatically a carousel of images:

```
{
  "items" : [
    {
      "img": "http://res.cloudinary.com/buddahbelly/image/upload/v1423072364/brilliantbritz/angular-js.png",
      "alt" : "Angular JS framework"
    },
    {
      "img": "http://yeoman.io/assets/img/illustration-home-inverted.1f86.png",
      "alt" : "Yeoman!"
    },
    {
      "img": "http://bower.io/img/bower-logo.png",
      "alt" : "I'm a bird, my name is Bower"
    },
    {
      "img": "https://lh5.googleusercontent.com/-mrFw71M_puI/VE5722ZV70I/AAAAAAAABsE/p4DW4sTySLs/s640-no/nodejs-512%5B1%5D.png",
      "alt" : "Node.js"
    },
    {
      "img": "https://assets-cdn.github.com/images/modules/open_graph/github-octocat.png",
      "alt" : "Hey, Github is here!"
    },
    {
      "img": "http://devstickers.com/assets/img/pro/jv81.png",
      "alt" : "slurp! gulp!"
    }
    
  ]
}
```



### Install Dependencies 

```
npm install
```

We have preconfigured the project with a simple development web server.  The simplest way to start
this server is:

```
npm start or node start.js
```

Now browse to the app at `http://localhost:8000/app/index.html`.



## Testing

There are two kinds of tests in the angular-seed application: Unit tests and End to End tests.

### Running Unit Tests

The angular-seed app comes preconfigured with unit tests. These are written in
[Jasmine][jasmine], which we run with the [Karma Test Runner][karma]. We provide a Karma
configuration file to run them.

* the configuration is found at `karma.conf.js`
* the unit tests are found next to the code they are testing and are named as `..._test.js`.

The easiest way to run the unit tests is to use the supplied npm script:

```
npm test
```

This script will start the Karma test runner to execute the unit tests. Moreover, Karma will sit and
watch the source and test files for changes and then re-run the tests whenever any of them change.
This is the recommended strategy; if your unit tests are being run every time you save a file then
you receive instant feedback on any changes that break the expected code functionality.

You can also ask Karma to do a single run of the tests and then exit.  This is useful if you want to
check that a particular version of the code is operating as expected.  The project contains a
predefined script to do this:

```
npm run test-single-run
```


### End to end testing

The angular-seed app comes with end-to-end tests, again written in [Jasmine][jasmine]. These tests
are run with the [Protractor][protractor] End-to-End test runner.  It uses native events and has
special features for Angular applications.

* the configuration is found at `e2e-tests/protractor-conf.js`
* the end-to-end tests are found in `e2e-tests/scenarios.js`

Protractor simulates interaction with our web app and verifies that the application responds
correctly. Therefore, our web server needs to be serving up the application, so that Protractor
can interact with it.

```
npm start
```

In addition, since Protractor is built upon WebDriver we need to install this.  The angular-seed
project comes with a predefined script to do this:

```
npm run update-webdriver
```

This will download and install the latest version of the stand-alone WebDriver tool.

Once you have ensured that the development web server hosting our application is up and running
and WebDriver is updated, you can run the end-to-end tests using the supplied npm script:

```
npm run protractor
```

This script will execute the end-to-end tests against the application being hosted on the
development server.


## Updating Angular

Previously we recommended that you merge in changes to angular-seed into your own fork of the project.
Now that the angular framework library code and tools are acquired through package managers (npm and
bower) you can use these tools instead to update the dependencies.

You can update the tool dependencies by running:

```
npm update
```

This will find the latest versions that match the version ranges specified in the `package.json` file.

You can update the Angular dependencies by running:

```
bower update
```

This will find the latest versions that match the version ranges specified in the `bower.json` file.

## Links

For more information on AngularJS please check out http://angularjs.org/

[git]: http://git-scm.com/
[bower]: http://bower.io
[npm]: https://www.npmjs.org/
[node]: http://nodejs.org
[protractor]: https://github.com/angular/protractor
[jasmine]: http://jasmine.github.io
[karma]: http://karma-runner.github.io
[travis]: https://travis-ci.org/
[http-server]: https://github.com/nodeapps/http-server
