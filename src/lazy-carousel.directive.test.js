/*
Unit Test LazyCarousel Directive
*/

describe('LazyCarousel:',function(){

    var itemService, httpBackend, LazyCarouselController;

    var createController;

    var element,scope;

    var source = 'components/lazy-carousel/items.json';

    var returnData =  
        {
          "items" : [
            {
              "img": "statics/images/01.jpg",
              "alt" : "A panda says hello"
            },
            {
              "img": "statics/images/02.jpg",
              "alt" : "A little bear uh uh"
            },
            {
              "img": "statics/images/03.jpg",
              "alt" : "A evil tiger"
            }
          ]
        }

    var html = '<div lazy-carousel source="'+source+'"></div>';

    /*ItemService
    ______________________________________________________ */

    beforeEach(function(){
        
        module('templates');
        module('rl.lazy-carousel');

        inject(function($rootScope, $compile, $httpBackend, _itemService_, $controller ) {

          scope = $rootScope.$new();
          itemService = _itemService_;      
          httpBackend = $httpBackend;

          scope.source = source;
          
          /* CONTROLLER
          _______________________________________________________________________________________ */

          httpBackend.expect('GET','components/lazy-carousel/items.json').respond(returnData);
          
          LazyCarouselController = $controller('lazyCarouselController', {
                '$scope': scope, 'itemService' : itemService
          });
          
          httpBackend.flush();

         
          /* DIRECTIVE
          _______________________________________________________ */

          httpBackend.expect('GET','components/lazy-carousel/items.json').respond(returnData);
          element = $compile(html)(scope);
          httpBackend.flush();

          scope.$digest();

        })

    })

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });


     //$scope.currentSlide must be 1
    it('$scope.currentSlide must be 1',function(){
        expect(scope.currentSlide).toBe(1);
    })


    // $scope.items should be the same as items in json
    it('$scope.items should be the same as items in json ',function(){

        httpBackend.expect('GET','components/lazy-carousel/items.json').respond(returnData);
        var returnedPromise = itemService.get('components/lazy-carousel/items.json');

        var result = returnedPromise.then(function(response) {
            result = response.data.items.length;
        });

        httpBackend.flush();

        var items = scope.items.length;
        
        expect(scope.items.length).toBe(result)
        expect($(element).find('.lazy-element').length).toBe(result)

    })



    // json.alt should be the same as h3 in directive
    it('json.alt should be the same as h3 in directive',function(){

        httpBackend.expect('GET','components/lazy-carousel/items.json').respond(returnData);
        var returnedPromise = itemService.get('components/lazy-carousel/items.json');

        var result = returnedPromise.then(function(response) {
            result = response.data.items;
        });

        httpBackend.flush();

       $.each( $(element).find('.lazy-element'), function(index){
            var h3_text = $(this).find('h3').text();
            expect(h3_text).toBe(result[index].alt)
       })

    });



  

    // read correctly json source
    it('read correctly json source',function(){
       
       httpBackend.expect('GET','components/lazy-carousel/items.json').respond(returnData);
       var returnedPromise = itemService.get('components/lazy-carousel/items.json');

        var result = returnedPromise.then(function(response) {
          result = response.data;
        });

        httpBackend.flush();
        
        expect(result).toEqual(returnData);

    })



 });

    










