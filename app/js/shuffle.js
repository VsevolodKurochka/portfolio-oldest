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