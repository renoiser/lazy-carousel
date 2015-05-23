/*
Lazy Carousel Directive for Angular.js
author: renato longobardi
*/

angular.module('rl.lazy-carousel', [])


.controller('lazyCarouselController', ['$scope', 'itemService', function($scope, itemService) {

	$scope.currentSlide = 1;
	$scope.stopLazy = false;

	itemService.get($scope.source).then(
		//success
		function(response) {

			$scope.items = response.data.items;
			$scope.limit = response.data.items.length;

			$scope.$broadcast('sourceLoaded');
			//error
		},
		function() {

			alert('problem to loading contents! try later! :(')
		}
	)
}])

.directive('lazyCarousel', ['$window', '$timeout', 'itemService', '$q', function($window, $timeout, itemService, $q) {

	return {
		scope: {
			source: '@source'
		},
		controller: 'lazyCarouselController',

		link: function(scope, element, attrs) {

			scope.wrapper = $(element).find('.lazy-caousel-wrapper');
			scope.overflow = $(element).find('.lazy-carousel-overflow');
			scope.container = $(element).find('.lazy-carousel');

			scope.nextArrow = $(element).find('.lazy-next');
			scope.prevArrow = $(element).find('.lazy-prev');


			// LC = LazyCarousel

			var LC = {

				init: function() {

					LC.setDimension();

					$timeout(function() {
						LC.renderImage(scope.items[scope.currentSlide - 1].img)
					})

					$(scope.container).on('click', function() {
						LC.nextSlide();
					})

					$($window).on('resize', function() {
						LC.setDimension()
					})

					$(scope.nextArrow).on('click', function() {
						LC.nextSlide();
					})

					$(scope.prevArrow).on('click', function() {
						LC.prevSlide();
					})


				}, // init

				nextSlide: function() {

					if (scope.currentSlide != scope.limit) {

						scope.currentSlide++;

						$(scope.container).stop(true, true).animate({
							left: '-=' + scope.overflow.width()
						})

						if (!scope.stopLazy) {
							LC.renderImage(scope.items[scope.currentSlide - 1].img);
						}


						// turn back the carousel
					} else {

						$(scope.container).stop(true, true).animate({
							left: 0
						})
						scope.currentSlide = 1;
						scope.stopLazy = true;

					}

				}, // nextSlide

				prevSlide: function() {

					if (scope.currentSlide != 1) {

						scope.currentSlide--;

						$(scope.container).stop(true, true).animate({
							left: '+=' + scope.overflow.width()
						})

						// turn back the carousel
					} else {

						$(scope.container).addClass('animated shake');
						$timeout(function() {
							$(scope.container).removeClass('animated shake')
						}, 1000)

						$(scope.container).stop(true, true).animate({
							left: 0
						})
						scope.currentSlide = 1;

					}

				}, // nextSlide

				setDimension: function() {

					scope.container.width(scope.overflow.width() * scope.items.length);

					scope.container.css({
						left: (scope.overflow.width() * (scope.currentSlide - 1)) * -1
					})



				}, // setDimension

				renderImage: function(path) {

					var img = '<img class="animated fadeIn" src="' + path + '"/>';

					var target = $(element).find('.lazy-element[data-index=' + (scope.currentSlide - 1) + ']');

					if (!$(target).hasClass('loaded')) {

						LC.loadImage(img).then(function(success) {

							$(element).find(target).find('.cover').css({
								'background-image': 'url(' + path + ')',
								'display': 'block'
							});
							$(element).find(target).find('h3').css('display', 'block');
							$(element).find(target).find('.loader').fadeOut();

							$(element).find(target).addClass('loaded');


						}, function(reason) {

							$(element).find(target).append('<div class="error">Oops! Problem to loading image</div>');
							$(element).find(target).find('h3').css('display', 'block');
							$(element).find(target).find('.loader').fadeOut();

							$(element).find(target).addClass('loaded error');

						})


					} // if

				}, // renderImage

				loadImage: function(img) {

					var deferred = $q.defer();

					$(img).load(function() {
						deferred.resolve('image loaded...');
					}).

					error(function() {
						deferred.reject('error loading image...');
					});

					return deferred.promise;

				}

			};

			scope.$on('listEnd', function() {
				LC.init();

			})

		},

		templateUrl: 'components/lazy-carousel/view/lazy-carousel.html'
	}


}])

/* Directive for single <element>
___________________________________________________________ */


.directive('lazyElement', ['$window', function($window) {

	return {
		scope: true,
		require: '^lazyCarousel',

		link: function(scope, element, attrs) {


			if (scope.$last === true) {
				scope.$emit('listEnd');
			}

			var EL = {

					init: function() {
						EL.setDimension();

						$($window).on('resize', function() {
							EL.setDimension();
							//EL.scaleImg();
						})

					},

					setDimension: function() {

						$(element).css({
							width: scope.overflow.width(),
							height: scope.overflow.height(),
							left: scope.overflow.width() * attrs.index

						})
					},

					scaleImg: function() {

						var img = $(element).find('img');

						var height = $(img).height();
						var width = $(img).width();
						console.log('widthandheight:', width, height);
						if (width > height) {
							$(img).addClass('wide-img');
						} else {
							$(img).addClass('tall-img');
						}
					}

				} // EL

			EL.init();



		}

	}


}])

.factory('itemService', ['$http', function($http) {


	var itemService = {

		get: function(json) {

			return $http.get(json).
			success(function(data, status, headers, config) {
				return data;
			}).
			error(function(data, status, headers, config) {
				return data;
			});

		}


	}

	return itemService;


}])