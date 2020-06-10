(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch mode.
		if (browser.mobile)
			$body.addClass('is-touch');

	// Scrolly links.
		$('.scrolly').scrolly({
			speed: 2000
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			alignment: 'right',
			hideDelay: 350
		});

	// Nav.

		// Title Bar.
			$(
				'<div id="titleBar">' +
					'<a href="#navPanel" class="toggle"></a>' +
					'<span class="title">' + $('#logo').html() + '</span>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

	// Parallax.
	// Disabled on IE (choppy scrolling) and mobile platforms (poor performance).
		if (browser.name == 'ie'
		||	browser.mobile) {

			$.fn._parallax = function() {

				return $(this);

			};

		}
		else {

			$.fn._parallax = function() {

				$(this).each(function() {

					var $this = $(this),
						on, off;

					on = function() {

						$this
							.css('background-position', 'center 0px');

						$window
							.on('scroll._parallax', function() {

								var pos = parseInt($window.scrollTop()) - parseInt($this.position().top);

								$this.css('background-position', 'center ' + (pos * -0.15) + 'px');

							});

					};

					off = function() {

						$this
							.css('background-position', '');

						$window
							.off('scroll._parallax');

					};

					breakpoints.on('<=medium', off);
					breakpoints.on('>medium', on);

				});

				return $(this);

			};

			$window
				.on('load resize', function() {
					$window.trigger('scroll');
				});

		}

	// Spotlights.
		var $spotlights = $('.spotlight');

		$spotlights
			._parallax()
			.each(function() {

				var $this = $(this),
					on, off;

				on = function() {

					var top, bottom, mode;

					// Use main <img>'s src as this spotlight's background.
						$this.css('background-image', 'url("' + $this.find('.image.main > img').attr('src') + '")');

					// Side-specific scrollex tweaks.
						if ($this.hasClass('top')) {

							mode = 'top';
							top = '-20%';
							bottom = 0;

						}
						else if ($this.hasClass('bottom')) {

							mode = 'bottom-only';
							top = 0;
							bottom = '20%';

						}
						else {

							mode = 'middle';
							top = 0;
							bottom = 0;

						}

					// Add scrollex.
						$this.scrollex({
							mode:		mode,
							top:		top,
							bottom:		bottom,
							initialize:	function(t) { $this.addClass('inactive'); },
							terminate:	function(t) { $this.removeClass('inactive'); },
							enter:		function(t) { $this.removeClass('inactive'); },

							// Uncomment the line below to "rewind" when this spotlight scrolls out of view.

							//leave:	function(t) { $this.addClass('inactive'); },

						});

				};

				off = function() {

					// Clear spotlight's background.
						$this.css('background-image', '');

					// Remove scrollex.
						$this.unscrollex();

				};

				breakpoints.on('<=medium', off);
				breakpoints.on('>medium', on);

			});

	// Wrappers.
		var $wrappers = $('.wrapper');

		$wrappers
			.each(function() {

				var $this = $(this),
					on, off;

				on = function() {

					$this.scrollex({
						top:		250,
						bottom:		0,
						initialize:	function(t) { $this.addClass('inactive'); },
						terminate:	function(t) { $this.removeClass('inactive'); },
						enter:		function(t) { $this.removeClass('inactive'); },

						// Uncomment the line below to "rewind" when this wrapper scrolls out of view.

						//leave:	function(t) { $this.addClass('inactive'); },

					});

				};

				off = function() {
					$this.unscrollex();
				};

				breakpoints.on('<=medium', off);
				breakpoints.on('>medium', on);

			});

			
	// Banner.
		var $banner = $('#banner');

		$banner
			._parallax();

		// animation
			// values to keep track of the number of letters typed, which quote to use. etc. Don't change these values.
var i = 0,
a = 0,
isBackspacing = false,
isParagraph = false;

// Typerwrite text content. Use a pipe to indicate the start of the second line "|".  
var textArray = [
"I have learned C!", 
"I have learned Python!", 
"I have learned Java!",
"I have learned JavaScript!",
"I have learned HTML!",
// "What starts with an E, ends with an E and has one letter in it?|An Envelope",
// "What has four wheels, and flies?|A Garbage truck",
// "What do you call a pig that knows Karate?|Pork Chop",
// "Why did the scarecrow get promoted?|He was out standing in his field.",
// "I have a step ladder|I never knew my real ladder.",
// "What kind of shoes do ninjas wear?|Sneakers"
];

// Speed (in milliseconds) of typing.
var speedForward = 100, //Typing Speed
speedWait = 1000, // Wait between typing and backspacing
speedBetweenLines = 1000, //Wait between first and second lines
speedBackspace = 25; //Backspace Speed

//Run the loop
typeWriter("output", textArray);

function typeWriter(id, ar) {
var element = $("#" + id),
  aString = ar[a],
  eHeader = element.children("h1"), //Header element
  eParagraph = element.children("p"); //Subheader element

// Determine if animation should be typing or backspacing
if (!isBackspacing) {

// If full string hasn't yet been typed out, continue typing
if (i < aString.length) {
  
  // If character about to be typed is a pipe, switch to second line and continue.
  if (aString.charAt(i) == "|") {
	isParagraph = true;
	eHeader.removeClass("cursor");
	eParagraph.addClass("cursor");
	i++;
	setTimeout(function(){ typeWriter(id, ar); }, speedBetweenLines);
	
  // If character isn't a pipe, continue typing.
  } else {
	// Type header or subheader depending on whether pipe has been detected
	if (!isParagraph) {
	  eHeader.text(eHeader.text() + aString.charAt(i));
	} else {
	  eParagraph.text(eParagraph.text() + aString.charAt(i));
	}
	i++;
	setTimeout(function(){ typeWriter(id, ar); }, speedForward);
  }
  
// If full string has been typed, switch to backspace mode.
} else if (i == aString.length) {
  
  isBackspacing = true;
  setTimeout(function(){ typeWriter(id, ar); }, speedWait);
  
}

// If backspacing is enabled
} else {

// If either the header or the paragraph still has text, continue backspacing
if (eHeader.text().length > 0 || eParagraph.text().length > 0) {
  
  // If paragraph still has text, continue erasing, otherwise switch to the header.
  if (eParagraph.text().length > 0) {
	eParagraph.text(eParagraph.text().substring(0, eParagraph.text().length - 1));
  } else if (eHeader.text().length > 0) {
	eParagraph.removeClass("cursor");
	eHeader.addClass("cursor");
	eHeader.text(eHeader.text().substring(0, eHeader.text().length - 1));
  }
  setTimeout(function(){ typeWriter(id, ar); }, speedBackspace);

// If neither head or paragraph still has text, switch to next quote in array and start typing.
} else { 
  
  isBackspacing = false;
  i = 0;
  isParagraph = false;
  a = (a + 1) % ar.length; //Moves to next position in array, always looping back to 0
  setTimeout(function(){ typeWriter(id, ar); }, 50);
  
}
}
}	

})(jQuery);