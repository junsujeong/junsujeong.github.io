(function(){	
//Get the button
	var mybutton = document.getElementById("toTop");
	mybutton.addEventListener ("click", topFunction, false);

	// When the user scrolls down 20px from the top of the document, show the button
	window.onscroll = function() {scrollFunction()};

	function scrollFunction() {
		if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		 mybutton.style.display = "block";
		} else {
		 mybutton.style.display = "none";
		}
	}
	// When the user clicks on the button, scroll to the top of the document
	function topFunction() {
		window.scroll({
			top: 0, 
			left: 0, 
			behavior: 'smooth' 
		});
	}
	
	if(parseInt(getBrowserSize().width) < 1026){
		mybutton.style.display = "none";
	}
})();