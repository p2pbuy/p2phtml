/* PATH: src/js/sdk/jsonpData.js */
define("sdk/jsonpData", function(require, exports, module) {
/**
 * jsonp的方式获取数据
 */

var uniqueId = require('./uniqueId');

//var loadingNum = 0;

exports = module.exports = function(url, callback) {
	var callbackName = uniqueId();
	var ready = false;
//	++loadingNum;
	window[callbackName] = function(data) {
		if (!ready) {
			callback(data);
//			--loadingNum;
			ready = true;
		}
	};
	
	if (!/^(\/|http:\/\/)/.test(url)) {
		url = location.pathname.replace(/[^\/]*$/, '') + url;
		
	}
	
	url += (url.indexOf('?') == -1 ? '?' : '&') + 'callback=' + callbackName;
	
	require([url], null, function() {
		if (!ready) {
			callback(false);
//			--loadingNum;
			ready = true;
		}
	});
};

///**
// * 是否在加载中
// */
//exports.isLoading = function() {
//	return !!loadingNum;
//};

});

/* PATH: src/js/sdk/uniqueId.js */
define("sdk/uniqueId", function(require, exports, module) {

var uidNumber = 1;
var uidDateString = '_' + (+new Date) + '_';

module.exports = function(prefix) {
	return (prefix || '') + uidDateString + (uidNumber++);
};

});
