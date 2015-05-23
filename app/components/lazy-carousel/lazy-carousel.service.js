/*
LazyCarousel Service
author: Renato Longobardi
*/


angular.module('rl.lazy-carousel')
	
	.factory('itemService',['$http', function($http){


		var itemService = {

			get : function(json){

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