
function carousel() {

	// sebesség
	var speed = 3000;

	// időzítő
	var timer = setInterval("rotate()", speed);

	// képek száma
	var images_number = $(".images img").length;

	// carousel teljes szélessége
	var carousel_width = $(".carousel").width() * images_number;

	// a képeket tartalmazó DIV szélessége megegyezik a carousel teljes szélességével
	$("div.images").css({"width": carousel_width});

	// pöttyöket tartalmazó UL hozzáadása
	$(".carousel-nav").append("<ul>");

	/* Mivel egy pötty szélessége 10px és a margin is 10px,
	   ezért 20-al szorozzuk a képek számát. 25-tel mert a 20 keves!
	   Az utolsónál nincs margin, ezért 10-et ki kell belőle vonni. Vagy nem.
	*/
	$(".carousel-nav ul").css({"width": images_number*25});

	// annyi LI-t adunk hozzá, ahány képünk van
	for(var i=0; i < images_number; i++){
		$(".carousel-nav ul").append("<li>");
	}

	// az első képre rátesszük az active class-t
	$(".images img:first").addClass("active");

	// az első pöttyre rátesszük az active class-t
	$(".carousel-nav li:first").addClass("active");

	// következő gombra történő kattintás
	$(".next").click(function(){

		// aktív képet léptetjük eggyel
		$active_image = $(".images img.active").next();

		// aktív pöttyöt léptetjük eggyel
		$active_nav = $('.carousel-nav li.active').next();

		// ha nincs több kép akkor visszaugrunk az elsőre
		if ($active_image.length==0){
			$active_image = $(".images img:first");
			$active_nav = $(".carousel-nav li:first");
		}

		// léptetést végrehajtó függvény hívása
		step();
	});


	// előző gombra történő kattintás
	$(".previous").click(function(){

		// aktív képet léptetjük eggyel vissza
		$active_image = $(".images img.active").prev();

		// aktív pöttyöt léptetjük eggyel vissza
		$active_nav = $(".carousel-nav li.active").prev();

		// ha nincs több kép akkor visszaugrunk az utolsóra
		if ($active_image.length==0){
			$active_image = $(".images img:last");
			$active_nav = $(".carousel-nav li:last");
		}

		// léptetést végrehajtó függvény hívása
		step();
	});

	// ha az egeret a kép vagy a gombok fölé mozgatjuk, megállítjuk az automatikus léptetést
	$(".carousel, .previous, .next").hover(
		// a clearInterval() metódus törli a setInterval() által beállított időzítőt
		function() { clearInterval(timer); },

		// a setInterval() metódussal meghívjuk a rotate() függvényt a speed változóban meghatározott időközönként
		function() { timer = setInterval("rotate()", speed); }
	);
}

// léptetést végrehajtó függvény
function step() {

	// össze képről leszedjük az active class-t
	$(".images img").removeClass("active");

	// összes pöttyről leszedjük az active class-t
	$(".carousel-nav li").removeClass("active");

	// aktív képre rátesszük az active class-t
	$active_image.addClass("active");

	// aktív pöttyre rátesszük az active class-t
	$active_nav.addClass("active");

	/* Meghatározzuk az eltolás mértékét amit úgy kapunk meg,
	   hogy az akutális kép indexét beszorozzuk a kép méretével.
	   Jelen esetben 800px egy kép szélessége, ezért az eltolás
	   mértéke így fog alakulni: 0, 800, 1600, 2400, 3200...
	*/
	var imagesposition = $active_image.index() * $(".images img").width();

	// images DIV-et eltoljuk az imageposition változóban meghatározott értékkel
	$(".images:not(:animated)").animate({"left": -imagesposition}, 500);
}

// automatikus léptetést végző függvény
function rotate() {
	$(".next").click();
}

