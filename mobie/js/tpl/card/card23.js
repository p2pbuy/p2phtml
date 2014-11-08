define("tpl/card/card23", function(require, exports, module) {
var tplFunc = require("sdk/tplutil");
module.exports = function (data) {
var aRet = [];aRet.push('<!--info--@title L-5 三列式 (card23)@category Link - 链接类@readme 三列式---说明-->');if (!data|| typeof data!= "object" ) return "";aRet.push('<div class="card card23 line-around">    <a class="layout-box" ');aRet.push((function(){var tpl = require("tpl/common/openTarget");return tpl(data);})());aRet.push(' data-act-type="hover">    ');if(data.apps && data.apps.constructor === Array){with({i:0,l:data.apps.length,app_index:0,app:null}){for(i=l;i--;){app_index=(l-i-1);app=data.apps[app_index];aRet.push('        <div class="box-col line-separate">        ');if(app.count){aRet.push('            <div class="mct-a txt-m">'+(app.count)+'</div>');}aRet.push('            <div class="mct-c txt-xs">'+(app.title)+'</div>        </div>');}}}aRet.push((function(){var tpl = require("tpl/common/arrowRight");return tpl(data);})());aRet.push('    </a></div>');return aRet.join("");
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