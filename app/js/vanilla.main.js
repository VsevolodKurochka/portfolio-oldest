'use strict';

// General functions

function log(logText) {
	console.log(logText);
}

var hasClass = function hasClass(element, cls) {
	return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
};

function addClass(element, cls) {
	if (!hasClass(element, cls)) {
		var empty = '';
		if (element.classList.value != "") empty = ' ';
		element.className += empty + cls;
	}
}

function removeClass(element, cls) {
	if (hasClass(element, cls)) element.classList.remove(cls);
}

function toggleClass(element, cls) {
	hasClass(element, cls) ? removeClass(element, cls) : addClass(element, cls);
}

var exists = function exists(element) {
	return typeof element != 'undefined' && element != null;
};

(function () {
	document.addEventListener("DOMContentLoaded", function () {

		// Initialize Emmergency

		emergence.init();

		// Anchors links
		function scrollTo(element, to, duration) {
			if (duration <= 0) return;
			var difference = to - element.scrollTop - 75;
			var perTick = difference / duration * 10;
			setTimeout(function () {
				element.scrollTop = element.scrollTop + perTick;
				if (element.scrollTop === to) return;
				scrollTo(element, to, duration - 10);
			}, 10);
		}

		// Anchors
		var anchors = document.getElementsByClassName('anchor');

		for (var _i = 0; _i < anchors.length; _i++) {
			anchors[_i].addEventListener('click', function (e) {
				e.preventDefault();
				var href = this.getAttribute("href").replace("#", "");
				var scrollAnchor = document.getElementById(href);
				scrollTo(document.body, scrollAnchor.offsetTop, 600);
			});
		}

		// Navigation

		var jsNav = document.getElementById('js-navigation');
		var jsNavMenu = document.getElementById('js-navigation-menu');

		// const sectionsAnchors = document.querySelectorAll('.vsection-anchor');
		// const sectionsAnchorsLength = sectionsAnchors.length;

		// Scripts for navigation


		// Navigation links
		var jsNavLinks = document.querySelectorAll('.vnav__menu a[href*="#"]');
		var jsNavLinksLength = jsNavLinks.length;

		for (var _i2 = 0; _i2 < jsNavLinksLength; _i2++) {
			jsNavLinks[_i2].addEventListener('click', function (e) {
				e.preventDefault();

				var vnavhref = this.getAttribute("href").replace("#", "");
				var vnavscrollAnchor = document.getElementById(vnavhref);

				removeClass(jsNavBtn, 'active');
				removeClass(jsNavMenu, 'vnav__menu_active');

				scrollTo(document.body, vnavscrollAnchor.offsetTop, 600);
			});
		}

		// HAMBURGER
		var jsNavBtn = document.getElementById('js-vnav__btn');

		if (exists(jsNavBtn)) {
			jsNavBtn.addEventListener('click', function () {
				toggleClass(this, 'active');
				toggleClass(jsNavMenu, 'vnav__menu_active');
			});
		}

		// Click on toggle element in navigation
		var jsNavText = document.getElementById('js-vnav-addition');
		if (exists(jsNavText)) {
			jsNavText.addEventListener('click', function () {
				toggleClass(this, classes.active);
			});
		}

		// Window scrolling JS
		window.addEventListener("scroll", function () {
			var windowScroll = this.scrollY;
			windowScroll > 0 ? addClass(jsNav, 'vnav_scrolled') : removeClass(jsNav, 'vnav_scrolled');
		});

		// Vanilla Tabs

		function makeTabs(selector) {

			var tab_lists_anchors = document.querySelectorAll(selector + " .vtabs__list li a");
			var divs = document.querySelector(selector + " .vtabs__content").getElementsByClassName("vtabs__tab");

			for (var i = 0; i < tab_lists_anchors.length; i++) {
				if (tab_lists_anchors[i].classList.contains('vactive')) {
					//divs[i].style.display = "block";
					addClass(divs[i], 'vactive');
				}
			}

			for (i = 0; i < tab_lists_anchors.length; i++) {

				tab_lists_anchors[i].addEventListener('click', function (e) {

					e.preventDefault();

					for (i = 0; i < divs.length; i++) {
						//divs[i].style.display = "none";
						removeClass(divs[i], 'vactive');
					}

					for (i = 0; i < tab_lists_anchors.length; i++) {
						removeClass(tab_lists_anchors[i], 'vactive');
						//tab_lists_anchors[i].classList.remove("vactive");
					}

					var clicked_tab = e.target || e.srcElement;

					clicked_tab.classList.add('vactive');
					var div_to_show = clicked_tab.getAttribute('href');

					//document.querySelector(div_to_show).style.display = "block";
					addClass(document.querySelector(div_to_show), 'vactive');
				});
			}
		}

		makeTabs("#portfolio-tabs");

		// Skills
		// Define wrapper
		var skillsWrapper = document.getElementById('vskills-items');

		// Define skills fragment
		var skillsFragment = document.createDocumentFragment();

		// Define skills array
		var skillsList = ['HTML5', 'CSS3', 'LESS', 'Bootstrap - v.3, v.4', 'JavaScript - ES6', 'jQuery', 'Gulp - v.3, v.4', 'PHP', 'PUG', 'Wordpress', 'Stylus', 'SASS'];
		var skillsListLength = skillsList.length;

		// Functions
		function shuffle(a) {
			for (var _i3 = a.length - 1; _i3 > 0; _i3--) {
				var j = Math.floor(Math.random() * (_i3 + 1));
				var _ref = [a[j], a[_i3]];
				a[_i3] = _ref[0];
				a[j] = _ref[1];
			}
			return a;
		}

		function offset(el) {
			var top = el.offsetTop;
			var left = el.offsetLeft;

			return {
				top: top,
				left: left
			};
		}

		function createRandomArray(min, max) {
			var myList = [];

			for (var _i4 = min; _i4 < max; _i4++) {
				myList.push(_i4);
			}

			myList.sort(function (a, b) {
				return Math.round(Math.random() * 2) - 1;
			});

			return myList;
		}

		function createElements(options, callback) {
			for (var i = 0; i < skillsList.length; i++) {

				// Create `li` element
				var li = document.createElement(options.tag);

				// Add class for added `li` element
				addClass(li, options.class);

				// Add content from array list
				li.textContent = skillsList[i];

				// Add skill to fragment
				skillsFragment.appendChild(li);
			}

			// Add fragment to our div
			skillsWrapper.appendChild(skillsFragment);

			if (callback && typeof callback == "function") {
				callback();
			}
		}

		// function shuffleList(array, element, text, collectOfDataElements){

		// 	// Argument 1 - array will be shuffled
		// 	// Argument 2 - element for setting text
		// 	// Argument 3 - text for element
		// 	// Argument 4 - collection of data(position top and left) of element

		// 	shuffle(array);

		// 	let randomArray = createRandomArray(0, 15);

		// 	//console.log(randomArray);

		// 	for(var i = 0; i < array.length; i++){
		// 		element[i].textContent = text[i];


		// 		let randomArrayCurrentNumber = randomArray[i];


		// 		element[i].style.left = collectOfDataElements[randomArrayCurrentNumber].left + "px";
		// 		element[i].style.top = collectOfDataElements[randomArrayCurrentNumber].top + "px";

		// 	}
		// }

		createElements({
			'tag': 'li',
			'class': 'vskills__item'
		});

		// Get created items
		var skillsItems = document.getElementsByClassName('vskills__item');
		//console.log(skillsItems);

		// Get created items length
		var skillInfo = [];

		// Get offset of each element
		for (var i = 0; i < skillsItems.length; i++) {

			// Get offset from parent, when they have position relative
			skillInfo.push(offset(skillsItems[i]));
		}

		for (var i = 0; i < skillsItems.length; i++) {

			// Set element to position absolute
			skillsItems[i].style.position = 'absolute';
		}

		function shuffleList() {
			shuffle(skillsList);

			var randomArray = createRandomArray(0, 12);

			for (var i = 0; i < skillsItems.length; i++) {
				skillsItems[i].textContent = skillsList[i];

				var randNumber = randomArray[i];

				skillsItems[i].style.left = skillInfo[randNumber].left + "px";
				skillsItems[i].style.top = skillInfo[randNumber].top + "px";
			}
		}

		shuffleList();

		setInterval(function () {
			shuffleList();
		}, 3000);

		// Scrolling and Transform Background Elements
		// const lettersBg = document.getElementsByClassName('vletters-bg');
		// const lettersBgLength = lettersBg.length;
		// window.onscroll = function(){
		// 	let scrollY = this.scrollY;
		// 	log(scrollY);
		// 	for(let i = 0; i < lettersBgLength; i++){
		// 		lettersBg[i].style.transform = `translateY(${ scrollY / 2 }px)`;
		// 	}
		// }

		// const bubbles = document.getElementsByClassName('vskills__monitor-bubble');
		// const bubblesLength = bubbles.length;
		// for(let i = 0; i < bubblesLength; i++){
		// 	// setInterval(function(){
		// 	// 	console.log(bubbles[i].style.left);
		// 	// },1000);
		// }
		// window.onscroll = onScroll;

		// function onScroll() {
		//     var removeActiveClass = function (elements) {
		//         for (var i = 0; i < elements.length; ++i) {
		//             elements[i].classList.remove('active');
		//         }
		//     }
		//     var anchors = document.querySelectorAll('.vnav__menu a');
		//     var previousRefElement = null;
		//     for (var i = 0; i < anchors.length; ++i) {
		//         // Get the current element by the id from the anchor's href.
		//         var currentRefElement = document.getElementById(anchors[i].getAttribute('href').substring(1));
		//         var currentRefElementTop = currentRefElement.getBoundingClientRect().top;
		//         // Searching for the element whose top haven't left the top of the browser.
		//         if (currentRefElementTop <= 0) {
		//             //The browser's top line haven't reached the current element, so the previous element is the one we currently look at.
		//             previousRefElement = anchors[i];
		//             // Edge case for last element.
		//             if (i == anchors.length - 1) {
		//                 removeActiveClass(anchors);
		//                 anchors[i].classList.add("active");
		//             }
		//         } else {
		//             removeActiveClass(anchors);
		//             previousRefElement.classList.add("active");
		//             break;
		//         }

		//     }
		// }
		// var section = document.querySelectorAll(".vsection-anchor");
		// var documentHeight = document.body.clientHeight;
		//  var sections = {};
		//  var i = 0;

		//  log(sections);

		//  Array.prototype.forEach.call(section, function(e) {
		//    sections[e.id] = {
		//    	height: e.clientHeight,
		//    	top: e.offsetTop,
		//    	bottom: e.clientHeight + e.offsetTop
		//    }
		//  });

		//  window.onscroll = function() {
		//    var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
		//    for (i in sections) {
		//    	for(let j = 0; j < jsNavLinksLength; j++){
		//     		if( hasClass(jsNavLinks[i], 'highlight') ) removeClass(jsNavLinks[i], 'highlight');
		//     	}
		//      if (scrollPosition >= sections[i].top && scrollPosition <= sections[i].bottom ) {
		//      	// if( exists(document.querySelector('.vnav__menu .active')) ){
		//      	// 	document.querySelector('.vnav__menu .active').setAttribute('class', '');
		//      	// }

		// 					document.querySelector('.vnav__menu a[href*="' + i + '"]').setAttribute('class', 'highlight');
		//      }
		//    }
		//  };
	});
})();

// (function() {
//   'use strict';

//   var section = document.querySelectorAll(".vsection-anchor");
//   var sections = {};
//   var i = 0;

//   Array.prototype.forEach.call(section, function(e) {
//     sections[e.id] = e.offsetTop;
//   });

//   window.onscroll = function() {
//     var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

//     for (i in sections) {
//       if (sections[i] <= scrollPosition) {
//         document.querySelector('.active').setAttribute('class', ' ');
//         document.querySelector('a[href*=' + i + ']').setAttribute('class', 'active');
//       }
//     }
//   };
// })();