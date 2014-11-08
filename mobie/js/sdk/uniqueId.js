/* PATH: src/js/sdk/uniqueId.js */
define("sdk/uniqueId", function(require, exports, module) {

var uidNumber = 1;
var uidDateString = '_' + (+new Date) + '_';

module.exports = function(prefix) {
	return (prefix || '') + uidDateString + (uidNumber++);
};

});
