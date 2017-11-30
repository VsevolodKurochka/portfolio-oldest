// General functions
	
	function log(logText){
		console.log(logText);
	}

	var hasClass = (element, cls) => (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;

	function addClass(element,cls){
		if( !hasClass(element, cls) ){
			let empty = '';
			if(element.classList.value != "") empty = ' ';
			element.className += empty + cls;
		}
	}

	function removeClass(element, cls){
		if( hasClass(element, cls) ) element.classList.remove(cls);
	}

	function toggleClass(element, cls){
		hasClass(element, cls) ? removeClass(element, cls) : addClass(element, cls);
	}

	var exists = element => typeof(element) != 'undefined' && element != null;

(function(){
	document.addEventListener("DOMContentLoaded", function(){
		// Initialize Emmergency

			emergence.init();

		const classes = {
			active: 'active',
			menuActive: 'vnav__menu_active'
		}

		// Anchors links
			function scrollTo(element, to, duration) {
				if (duration <= 0) return;
				var difference = to - element.scrollTop - 75;
				var perTick = difference / duration * 10;
				setTimeout(function() {
					element.scrollTop = element.scrollTop + perTick;
					if (element.scrollTop === to) return;
					scrollTo(element, to, duration - 10);
				}, 10);
			}
			
			// Anchors
				const anchors = document.getElementsByClassName('anchor');

				for(let i = 0; i < anchors.length; i++){
					anchors[i].addEventListener('click', function(e) {
						e.preventDefault();
						let href = this.getAttribute("href").replace("#", "");
						let scrollAnchor = document.getElementById(href);
						scrollTo(document.body, scrollAnchor.offsetTop, 600);
					});
				}
			
		// Navigation
			
			const jsNav = document.getElementById('js-navigation');
			const jsNavMenu = document.getElementById('js-navigation-menu');

			// const sectionsAnchors = document.querySelectorAll('.vsection-anchor');
			// const sectionsAnchorsLength = sectionsAnchors.length;

			// Scripts for navigation



			// Navigation links
				const jsNavLinks = document.querySelectorAll('.vnav__menu a[href*="#"]');
				const jsNavLinksLength = jsNavLinks.length;

				for(let i = 0; i < jsNavLinksLength; i++){
					jsNavLinks[i].addEventListener('click', function(e) {
						e.preventDefault();

						let vnavhref = this.getAttribute("href").replace("#", "");
						let vnavscrollAnchor = document.getElementById(vnavhref);

						removeClass(jsNavBtn, classes.active);
						removeClass(jsNavMenu, classes.menuActive);

						scrollTo(document.body, vnavscrollAnchor.offsetTop, 600);

					});
				}

			// HAMBURGER
				const jsNavBtn = document.getElementById('js-vnav__btn');

				if(exists(jsNavBtn)){
					jsNavBtn.addEventListener('click', function(){
						toggleClass(this, classes.active);
						toggleClass(jsNavMenu, classes.menuActive);
					});
				}


			// Click on toggle element in navigation
				const jsNavText = document.getElementById('js-vnav-addition');
				if(exists(jsNavText)){
					jsNavText.addEventListener('click', function() {
						toggleClass(this, classes.active);
					});	
				}

			// Window scrolling JS
				window.addEventListener("scroll", function(){
					let windowScroll = this.scrollY;
					windowScroll > 0 ? addClass(jsNav, 'vnav_scrolled') : removeClass(jsNav, 'vnav_scrolled');

				});

			// Vanilla Tabs

			function makeTabs(selector) {
			 		
			    let tab_lists_anchors = document.querySelectorAll(selector + " .vtabs__list li a");
			    let divs = document.querySelector(selector + " .vtabs__content").getElementsByClassName("vtabs__tab");

			    for (var i = 0; i < tab_lists_anchors.length; i++) {
			        if (tab_lists_anchors[i].classList.contains('vactive')) {
			            //divs[i].style.display = "block";
			            addClass(divs[i], 'vactive');
			        }
			 
			    }
			 
			    for (i = 0; i < tab_lists_anchors.length; i++) {
			 
			        tab_lists_anchors[i].addEventListener('click', function(e) {

			        		e.preventDefault();
			 
			            for (i = 0; i < divs.length; i++) {
			                //divs[i].style.display = "none";
			                removeClass(divs[i], 'vactive');
			            }
			 
			            for (i = 0; i < tab_lists_anchors.length; i++) {
			            		removeClass(tab_lists_anchors[i], 'vactive');
			                //tab_lists_anchors[i].classList.remove("vactive");
			            }
			 
			            let clicked_tab = e.target || e.srcElement;
			 
			            clicked_tab.classList.add('vactive');
			            let div_to_show = clicked_tab.getAttribute('href');
			 
			            //document.querySelector(div_to_show).style.display = "block";
			            addClass(document.querySelector(div_to_show), 'vactive');
			 
			        });
			    }
			 
			}

			makeTabs("#portfolio-tabs");

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
}());

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