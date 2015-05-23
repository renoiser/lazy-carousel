
describe('LazyCarousel directive:',function(){

	//  <div lazy-carousel data-source="components/lazy-carousel/items.json"></div>

	beforeEach(function() {
    	browser.get('http://localhost:8000/app/test.html');
	 });

	var json_unparsed = 
	'{"items":[{"img":"statics/images/01.jpg","alt":"A panda says hello"},'+
    '{"img":"statics/images/02.jpg","alt":"A little bear uh uh"},'+
    '{"img":"statics/images/03.jpg","alt":"A evil tiger"},'+
    '{"img":"statics/images/04.jpg","alt":"A cute cat says miao"},'+
    '{"img":"statics/images/05.jpg","alt":"A giant whale"},'+
    '{"img":"statics/images/06.jpg","alt":"An Elephant for you"},'+
    '{"img":"http://tigerday.org/wp-content/uploads/2013/04/tiger.jpg","alt":"Large & remote image of a tiger (3MB)"},'+
    '{"img":"http://tigerday.org/wp-content/uploads/2013/04/tidfger.jpg","alt":"A Failure/Error request"}]}';
    
   var json = JSON.parse(json_unparsed);

   var items = json.items;

   var next = $('.lazy-next');
   var prev = $('.lazy-prev');


	it('items in ngRepeat should be the same in json',function(){
			
		element.all(by.repeater('item in items')).count().then(function(count) {
			expect(count).toBe(items.length);
		});

	})

	it('iterator test check name',function(){

		element.all(by.repeater('item in items')).each(function(elm,index){

			browser.wait(function() {

				return elm.$('h3').isDisplayed();

			}).then(function() {

				elm.$('h3').getText().then(function(title) {
					console.log(index + ' > ', title)
					expect(title).toBe(items[index].alt);

				})

			});

			next.click()
				

			
		})
	})

})


