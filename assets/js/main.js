/*
	Strata by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		settings = {

			// Parallax background effect?
				parallax: true,

			// Parallax factor (lower = more intense, higher = less intense).
				parallaxFactor: 20

		};

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1800px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ],
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch?
		if (browser.mobile) {

			// Turn on touch mode.
				$body.addClass('is-touch');

			// Height fix (mostly for iOS).
				window.setTimeout(function() {
					$window.scrollTop($window.scrollTop() + 1);
				}, 0);

		}

	// Footer.
		breakpoints.on('<=medium', function() {
			$footer.insertAfter($main);
		});

		breakpoints.on('>medium', function() {
			$footer.appendTo($header);
		});

	// Header.

		// Parallax background.

			// Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
				if (browser.name == 'ie'
				||	browser.mobile)
					settings.parallax = false;

			if (settings.parallax) {

				breakpoints.on('<=medium', function() {

					$window.off('scroll.strata_parallax');
					$header.css('background-position', '');

				});

				breakpoints.on('>medium', function() {

					$header.css('background-position', 'left 0px');

					$window.on('scroll.strata_parallax', function() {
						$header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
					});

				});

				$window.on('load', function() {
					$window.triggerHandler('scroll');
				});

			}

	// Main Sections: Two.

		// Lightbox gallery.
			$window.on('load', function() {

				$('#two').poptrox({
					caption: function($a) { return $a.next('h3').text(); },
					overlayColor: '#2c2c2c',
					overlayOpacity: 0.85,
					popupCloserText: '',
					popupLoaderText: '',
					selector: '.work-item a.image',
					usePopupCaption: true,
					usePopupDefaultStyling: false,
					usePopupEasyClose: false,
					usePopupNav: true,
					windowMargin: (breakpoints.active('<=small') ? 0 : 50)
				});

			});

    var $model = {
        $skillCounter: 0,
    }

    var app = {

        init: function(){
            this.cacheDOM();
            this.bindEvents();
            this.toggleScroll();
            this.showSkill(model.skillCounter);
        },

        cacheDOM: function(){
            this.$skill      = document.getElementsByClassName('skill');
            this.$skillArrow = $('.slider-arrow');
            this.$navOverlay = $('.nav-overlay');
            this.$toggleNav  = $('.toggle-nav');
        },

        bindEvents: function(){
            this.$skillArrow.on('click', this.skillSlider.bind(this));
            this.$toggleNav.on('click', this.toggleNav.bind(this));
            $(window).scroll(this.toggleScroll);
            $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(this.smoothScroll);
        },

        toggleScroll: function(){
            if ($(document).scrollTop() > 0) {
                $('nav').addClass('nav-scroll');
            } else {
                $('nav').removeClass('nav-scroll');
            }

            var scrollBarLocation = $(this).scrollTop();
            $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').each(function(){
                var sectionOffset = $(this.hash).offset().top;
                if (Math.floor(sectionOffset) <= scrollBarLocation) {
                    $(this).addClass('active');
                    $(this).siblings().removeClass('active');
                } else {
                    $(this).removeClass('active');
                }
            });
        },

        showSkill: function(j){
            var length = this.$skill.length;
            for (var i = 0; i < length; i++) {
                $(this.$skill[i]).hide();
            }
            $(this.$skill[j]).show();
        },

        skillSlider: function(e){
            var i = $(e.target).attr('value');
            model.skillCounter += Number(i);
            if (model.skillCounter < 0) {
                model.skillCounter = this.$skill.length - 1;
            }
            this.showSkill(model.skillCounter % this.$skill.length);
        },
})(jQuery);