define("tpl/card/card38", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="card line-around card38">    <div class="star-box">        ');if([1,2,3,4,5] && [1,2,3,4,5].constructor === Array){with({i:0,l:[1,2,3,4,5].length,r_index:0,r:null}){for(i=l;i--;){r_index=(l-i-1);r=[1,2,3,4,5][r_index];aRet.push('        <span class="icon-font icon-font-star');if(data.rating >= r){aRet.push(' star-choosed');}aRet.push('"></span>        ');}}}aRet.push('    </div>    <div class="star-info mct-d txt-s">'+(['','很差', '一般', '还行', '不错', '怒赞'][data.rating])+'</div>    <div class="more-detail line-top"><a href="'+(data.buttonscheme)+'" class="mct-d txt-m">'+(data.buttontitle)+'</a></div></div>');return aRet.join("");
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
