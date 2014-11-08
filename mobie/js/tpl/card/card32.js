define("tpl/card/card32", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];aRet.push('<!--info--@title S-5 新粉丝提醒 (card32)@category Special - 特殊类型@readme 新粉丝提醒---说明-->');if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="card card32 line-around" data-node="card" data-act-type="hover" data-jump="'+(data.scheme || data.openurl || '')+'">    <a ');aRet.push((function(){var tpl = require("tpl/common/openTarget");return tpl(data);})());aRet.push(' class="layout-box" data-act-type="hover">        ');if(data.pic){aRet.push('        <i class="iconimg iconimg-s">            <img width="23" height="23" src="'+(data.pic)+'" data-node="cMesImg">        </i>        ');}aRet.push('        <div class="box-col txt-cut"><span class="mct-a " data-node="cMesTxt">'+(data.desc1)+'</span></div>        <span class="plus plus-m">            ');if(data.desc2){aRet.push('            <i class="bubble bubble-dot-red txt-xs" data-node="cMesNum">'+(data.desc2)+'</i>            ');}aRet.push('            ');aRet.push((function(){var tpl = require("tpl/common/arrowRight");return tpl(data);})());aRet.push('        </span>              </a></div>');return aRet.join("");
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
define("tpl/common/arrowRight", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];if (!data|| typeof data!= "object" ) return "";if(data.display_arrow && data.display_arrow === 1){aRet.push('<span data-node="arrow" class="plus plus-s"><i class="icon-font icon-font-arrow-right txt-s"></i></span>');}return aRet.join("");
}
});