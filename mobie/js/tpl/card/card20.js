define("tpl/card/card20", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];aRet.push('<!--info--@title L-3 双列式（居中不可扩展）(card20)@category Link - 链接类@readme 双列式（居中不可扩展）---说明-->');if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="card card20 line-around">');if(data.group && data.group.constructor === Array){with({i:0,l:data.group.length,group_index:0,group:null}){for(i=l;i--;){group_index=(l-i-1);group=data.group[group_index];aRet.push('    <a class="item-box line-separate" ');aRet.push((function(){var tpl = require("tpl/common/openTarget");return tpl(group);})());aRet.push(' data-act-type="hover">        ');if(group.pic){aRet.push('        <i class="iconimg iconimg-xs"><img width="18" height="18" src="'+(group.pic)+'" alt=""></i>        ');}aRet.push('        <span class="mct-a txt-m">'+(group.title_sub)+'</span>    </a>');}}}aRet.push('</div>');return aRet.join("");
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

define("tpl/common/openTarget", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];if (!data|| typeof data!= "object" ) return "";aRet.push(' href="'+((data.urls && data.urls.h5) || data.scheme || data.openurl || 'javascript:;')+'" ');return aRet.join("");
}
});