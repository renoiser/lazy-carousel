/*
LazyCarousel Directive
author: Renato Longobardi
*/


angular.module('rl.lazy-carousel')

	/* Global directive
	___________________________________________________________ */

	.directive('lazyCarousel',['$window','$timeout','itemService','$q',function($window, $timeout,itemService, $q){

		return {
			scope :{
				source : '@source'
			},
			controller : 'lazyCarouselController',

			link : function(scope,element,attrs){

				scope.wrapper = $(element).find('.lazy-caousel-wrapper');
				scope.overflow = $(element).find('.lazy-carousel-overflow');
				scope.container = $(element).find('.lazy-carousel');

				scope.nextArrow = $(element).find('.lazy-next');
				scope.prevArrow = $(element).find('.lazy-prev');


				// LC = LazyCarousel

				var LC = {

					init : function(){

						LC.setDimension();

						$timeout(function(){
							LC.renderImage(scope.items[scope.currentSlide -1].img)
						})

						$(scope.container).on('click',function(){
							LC.nextSlide();
						})

						$($window).on('resize',function(){
							LC.setDimension()
						})

						$(scope.nextArrow).on('click',function(){
							LC.nextSlide();
						})

						$(scope.prevArrow).on('click',function(){
							LC.prevSlide();
						})


					}, // init

					nextSlide : function(){

						if( scope.currentSlide != scope.limit) {

							scope.currentSlide ++;

							$(scope.container).stop(true,true).animate({
								left : '-='+scope.overflow.width()
							})

							if(!scope.stopLazy) {
								LC.renderImage(scope.items[scope.currentSlide-1].img);
							}


						// turn back the carousel
						} else {

							$(scope.container).stop(true,true).animate({ left : 0 })
							scope.currentSlide = 1;
							scope.stopLazy = true;

						}

					}, // nextSlide

					prevSlide : function(){

						if( scope.currentSlide != 1) {

							scope.currentSlide --;

							$(scope.container).stop(true,true).animate({
								left : '+='+scope.overflow.width()
							})

						// turn back the carousel
						} else {

							$(scope.container).addClass('animated shake');
							$timeout(function(){ $(scope.container).removeClass('animated shake') },1000)

							$(scope.container).stop(true,true).animate({ left : 0 })
							scope.currentSlide = 1;

						}

					}, // nextSlide

					setDimension : function(){

						scope.container.width(scope.overflow.width() * scope.items.length);

						scope.container.css({
							left : (scope.overflow.width() * (scope.currentSlide -1 ) )*-1
						})

							

					}, // setDimension

					renderImage : function(path) {

						var img = '<img class="animated fadeIn" src="'+path+'"/>';

						var target = $(element).find('.lazy-element[data-index='+(scope.currentSlide-1)+']');

						if ( !$(target).hasClass('loaded') ){

							LC.loadImage(img).then(function(success){

								$(element).find(target).find('.cover').css({'background-image':'url(' + path + ')','display':'block'});
							 	$(element).find(target).find('h3').css('display','block');
							 	$(element).find(target).find('.loader').fadeOut();

							 	$(element).find(target).addClass('loaded');
								

							}, function(reason){

								$(element).find(target).append('<div class="error">Oops! Problem to loading image</div>');
							 	$(element).find(target).find('h3').css('display','block');
								$(element).find(target).find('.loader').fadeOut();

						 		$(element).find(target).addClass('loaded error');

							})

							
						} // if
						
					}, // renderImage

					loadImage : function(img){

						  var deferred = $q.defer();

						  $(img).load( function() {
						  		deferred.resolve('image loaded...');
						  }).

						  error(function(){
						  		deferred.reject('error loading image...');
						  });

						  return deferred.promise;

					}

				};

				scope.$on('listEnd',function(){
					LC.init();

				})

			},

		template: '\n<div class=\"lazy-caousel-wrapper\">\n\n\n\t<div class=\"lazy-carousel-overflow\">\n\n\t\t<div class=\"lazy-carousel\">\n\t\t\t\n\t\t\t<div data-index=\"{{$index}}\" class=\"lazy-element\" ng-repeat=\"item in items\" lazy-element>\n\n\t\t\t\t<div class=\"cover animated fadeIn\"><\/div>\n\n\t\t\t\t<!'+'-- loader --'+'>\n\t\t\t\t<div class=\"loader\" title=\"1\">\n\t\t\t\t  <svg version=\"1.1\" id=\"loader-1\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\" x=\"0px\" y=\"0px\"\n\t\t\t\t     width=\"40px\" height=\"40px\" viewBox=\"0 0 50 50\" style=\"enable-background:new 0 0 50 50;\" xml:space=\"preserve\">\n\t\t\t\t  <path fill=\"#000\" d=\"M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z\">\n\t\t\t\t    <animateTransform attributeType=\"xml\"\n\t\t\t\t      attributeName=\"transform\"\n\t\t\t\t      type=\"rotate\"\n\t\t\t\t      from=\"0 25 25\"\n\t\t\t\t      to=\"360 25 25\"\n\t\t\t\t      dur=\"0.6s\"\n\t\t\t\t      repeatCount=\"indefinite\"\/>\n\t\t\t\t    <\/path>\n\t\t\t\t  <\/svg>\n\t\t\t\t<\/div>\n\n\t\t\t\t<h3 class=\"title animated bounceIn\">{{ item.alt }}<\/h3>\n\t\t\t<\/div>\n\n\n\n\t\t<\/div>\n\n\t\t<a class=\"lazy-next lazy-arrow\" href=\"javascript:void(0)\"><\/a>\n\t\t<a class=\"lazy-prev lazy-arrow\" href=\"javascript:void(0)\"><\/a>\n\t\t\t\n\t<\/div>\n\n\n\n<\/div>'
		}


	}])

	/* Directive for single <element>
	___________________________________________________________ */


	.directive('lazyElement',['$window',function($window){

		return {
			scope :true,
			require: '^lazyCarousel',

			link : function(scope,element,attrs){


				 if (scope.$last === true) {
					scope.$emit('listEnd');
				 }

				var EL = {

					init : function(){
						EL.setDimension();

						$($window).on('resize',function(){
							EL.setDimension();
							//EL.scaleImg();
						})

					},

					setDimension : function(){

						$(element).css({
							width : scope.overflow.width(),
							height : scope.overflow.height(),
							left : scope.overflow.width() * attrs.index

						})
					},

					scaleImg : function(){

						var img = $(element).find('img');

						var height = $(img).height();
				        var width = $(img).width();
				        console.log('widthandheight:',width,height);
				        if(width>height){
				            $(img).addClass('wide-img');
				        }else{
				            $(img).addClass('tall-img');
				        }
					}

				} // EL

				EL.init();



			}

		}


	}])