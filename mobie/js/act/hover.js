/* PATH: src/js/act/hover.js */
define("act/hover", function(require, exports, module) {
/**
 * 按下效果
 */

var $ = require('jquery');

var currentActive;

exports.events = {
	
	'touchstart mousedown' : function(evt, activeElement) {
		removeBG();
		currentActive = $(activeElement);
		
		setTimeout(function() {
			currentActive && currentActive.css('background', '#ddd');
		}, 55);
		
		$(document).on('touchend touchmove mouseup mousemove', removeBG);
	}
	
};


function removeBG() {
	currentActive && currentActive.css('background', '');
	currentActive = 0;
	$(document).off('touchend touchmove mouseup mousemove', removeBG);
}


});
