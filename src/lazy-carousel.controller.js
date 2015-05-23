/*
LazyCarousel Controller
author: Renato Longobardi
*/


angular.module('rl.lazy-carousel')

	
	.controller('lazyCarouselController',['$scope','itemService', function($scope, itemService ){

				$scope.currentSlide = 1;
				$scope.stopLazy = false;

				itemService.get($scope.source).then(
					//success
					function(response){

						$scope.items = response.data.items;
						$scope.limit = response.data.items.length;

						$scope.$broadcast('sourceLoaded');
					 //error
					},function(){

						alert('problem to loading contents! try later! :(')
					}
				)
	}])