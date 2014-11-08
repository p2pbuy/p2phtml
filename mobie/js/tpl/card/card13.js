define("tpl/card/card13", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];aRet.push('<!--info--@title W-1 嵌入网页内容 (card13)@category Webview - 网页类@readme 嵌入网页内容---说明-->');if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="card card13 line-around">    <article class="web-article">        <header class="title-box">            <h3 class="title mct-a">'+(data.title)+'</h3>            <div class="subtitle mct-d txt-xs"><em class="time">2014-02-17 14:20</em><em class="from">新浪微博</em></div>        </header>        <iframe src="'+(data.content_url)+'" class="main-content" frameborder="0" scrolling="no"></iframe>    </article></div>');return aRet.join("");
}
});
/* PATH: src/js/sdk/tplutil.js */
define("sdk/tplutil", function(require, exports, module) {

/**
 * @fileoverview 去除字符串收尾空格
 * @author Tapir | baokun@staff.sina.com.cn
 * @date 2013-07-12
 * @param {string} *str 目标字符串。
 * @return {string} 去除收尾空格后的字符串
 */

exports.trim = (function() {
	'use strict';
	var startWhitespacesPattern = new RegExp('^[' + WHITESPACES + ']+');
	var endWhitespacesPattern = new RegExp('[' + WHITESPACES + ']+$');
	var WHITESPACES = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u200B\u2028\u2029\u202F\u205F\u3000\uFEFF';
	
	function trim(str) {
		return str.replace(startWhitespacesPattern, '').replace(endWhitespacesPattern, '');
	}
	
	function nativeMethod(str) {
		return  String.prototype.trim.call(str);
	}
	
	return String.prototype.trim ? nativeMethod : trim;
})();

});
