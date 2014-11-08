/* PATH: src/js/sdk/cacheData.js */
define("sdk/cacheData", function(require, exports, module) {
var cData = {};

exports.setData = function(id, data) {
	cData[id] = data;
};

exports.getData = function(id) {
	return cData[id];
};

exports.getAllData = function() {
	return cData;
};

exports.removeData = function(id) {
	cData[id] && delete cData[id];
};

});
