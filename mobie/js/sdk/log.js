/* PATH: src/js/sdk/log.js */
define("sdk/log", function(require, exports, module) {


var console = window.console;

exports = module.exports = function() {
	if (exports.debug) {
		console && console.log.apply(console, arguments);
	}
};

});
