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
		if (element.classList.alue != "") empty = ' ';
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

		// const sectionsAnchors = document.querySelectorAll('.section-anchor');
		// const sectionsAnchorsLength = sectionsAnchors.length;

		// Scripts for navigation


		// Navigation links
		var jsNavLinks = document.querySelectorAll('.nav__menu a[href*="#"]');
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
				toggleClass(jsNavMenu, 'nav__menu_active');
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
			windowScroll > 0 ? addClass(jsNav, 'nav_scrolled') : removeClass(jsNav, 'nav_scrolled');
		});

		// Vanilla Tabs

		function makeTabs(selector) {

			var tab_lists_anchors = document.querySelectorAll(selector + " .tabs__list li a");
			var divs = document.querySelector(selector + " .tabs__content").getElementsByClassName("tabs__tab");

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

		
	});
})();