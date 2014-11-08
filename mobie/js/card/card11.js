/* PATH: src/js/card/card11.js */
define("card/card11", function(require, exports, module) {
;(function() {
	var currentActive = void 0;
    function dirFirstElement(s_el, dir, con, e_el , fun) {
        var matched = void 0, truncate = e_el !== void 0;
        while (s_el && s_el.nodeType !== 9) {
            if (s_el.nodeType === 1) {
                if ( $(s_el).is(con) || (truncate && $(s_el).is(e_el)) ){
                	matched = s_el;
                	fun();
                    break;
                }
            }
            s_el = s_el[dir];
        }
        return matched;
    };
	function remove(){
		currentActive && $(currentActive).css('background','');
		currentActive = void 0;
	};

	$(document).on('touchstart', function(e) {
		currentActive = dirFirstElement(e.target, 'parentNode', "[data-active='1']", "div[data-node='card']", remove);
		currentActive && $(currentActive).css('background','#ddd');
	});
	$(document).on('touchend touchmove', remove);
}());

module.exports = function (box, data, commonData) {
};


});
