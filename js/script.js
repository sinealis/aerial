$(function(){

	/*scroll*/
	var menu = $('nav');
	var	menuLinks = menu.find('a');

	menuLinks.on('click', function(event){
		event.preventDefault();
		var id = this.hash;
		$('html, body').animate({scrollTop: $(id).offset().top}, 500, function(){
			window.location.hash = id;
		});
	});
});